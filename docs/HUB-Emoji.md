## Qortal Hub – emoji reactions (develop)

### UI and selection
- Emoji picker lives in `src/components/ReactionPicker.tsx`. A `ButtonBase` with the 😀 glyph toggles a portal-mounted `emoji-picker-react` widget (native emoji style, dark theme, 350×400). The picker is positioned relative to the trigger, flips above if it would overflow the viewport, and closes on outside clicks (`src/styles/ReactionPicker.css` sets high z-index and relative/absolute positioning).
- `MessageItem` (`src/components/Chat/MessageItem.tsx`) renders the picker for non-reply messages when `handleReaction` is provided. Choosing an emoji calls `onReaction(emoji)`; the component checks whether the current address already reacted with that emoji and flips between add/remove by passing `reactionState` true/false to `handleReaction`.
- Existing reactions appear as chips under each message: each emoji is shown with a count when >1. Clicking a chip opens a `Popover` listing `senderName`/`sender` values for that emoji and offers an add/remove button based on whether the viewer has reacted.
- While a reaction/edit is queued for a message, `ChatList` marks the row as `isUpdating`, dimming the card via `opacity` in `MessageItem`.

### Sending payloads
- **Group chat path** (`handleReaction` in `src/components/Chat/ChatGroup.tsx`):
  - Guards: skips if already sending or balance < `MIN_REQUIRED_QORTS` (4). Pauses global queues and sets `isSending` during the send attempt.
  - Builds `otherData` `{specialId, type: 'reaction', content: <emoji>, contentState: <bool>}` and an empty `message` string. `specialId` is a short UID used to pair queued items with confirmed messages.
  - For private groups, wraps the base64-encoded object with `encryptChatMessage`, passing `typeNumber: RESOURCE_TYPE_NUMBER_GROUP_CHAT_REACTIONS (102)` so the reaction is tagged as an "update" in the encrypted payload. Public groups send the JSON string directly.
  - Calls `sendChatGroup` with `chatReference: <target message signature>`; queues the request via `addToQueue(..., 'chat-reaction', selectedGroup)` for retry tracking/optimistic state.
- **Direct chat path** (`handleReaction` in `src/components/Chat/ChatDirect.tsx`):
  - Same guard pattern (`isSending`, `MIN_REQUIRED_QORTS`, queue pause/resume) and identical `otherData` shape `{specialId, type: 'reaction', content, contentState}`.
  - Invokes `sendChatDirect` with `chatReference: <target message signature>`, `messageText: ''`, and `otherData`, letting the background layer handle encryption with the recipient’s public key. Queued via `addToQueue(..., 'chat-direct', selectedDirect.address)`.
- In both flows, `contentState` defaults to true for adds; sending `false` represents removal. UI toggles this based on whether the viewer already reacted with that emoji.

### Fetching and live updates
- **Group chats**:
  - Initial load uses REST `/chat/messages?txGroupId=<group>&encoding=BASE64&limit=0&reverse=false`. Messages are filtered against the blocklist, decrypted with `decryptSingle` using the stored group secret key, and merged with UI-originated messages decoded via `decodeBase64ForUIChatMessages`.
  - Live updates arrive via websocket `/websockets/chat/messages?txGroupId=<group>&encoding=BASE64&limit=100`. `middletierFunc` funnels socket payloads into the same `decryptMessages` path. Ping/pong keeps the socket alive.
  - `processWithNewMessages` in `MessageQueueContext` matches incoming items by `specialId` to queued sends and drops completed queue entries.
- **Direct chats**:
  - Initial REST: `/chat/messages?involving=<peer>&involving=<me>&encoding=BASE64&limit=0&reverse=false`. Websocket: `/websockets/chat/messages?involving=<peer>&involving=<me>&encoding=BASE64&limit=100`.
  - Decryption uses `decryptDirect`; results are merged with pending queue items via `processWithNewMessages`.
  - Subsequent socket messages reuse the same parsing flow, with `isInitiated` toggling whether they append to existing state or replace it.

### Parsing and aggregation
- Reaction messages are identified by `chatReference` plus `type === 'reaction'` (or `decryptedData.type === 'reaction'` for encrypted group payloads). They never render as standalone chat rows.
- For each reaction item (`ChatGroup` and `ChatDirect` both), the parser extracts:
  - `content`: emoji string (required), `sender` (required), `timestamp` (required), optional `senderName`, and `contentState` (default truthy).
  - Invalid payloads (missing content/sender/timestamp) are skipped with a console warning.
- `chatReferences` state stores per-message metadata keyed by `chatReference`. Reactions are aggregated into `reactions: { [emoji]: ReactionItem[] }` (see `ReactionsMap` in `src/components/Chat/ChatList.tsx`).
- Dedup/out-of-order handling: before adding a reaction, existing entries with the same sender are removed while tracking their latest timestamp. If the incoming timestamp is older than a previously seen one for that sender, it is ignored. When `contentState === false`, the sender’s entry is removed; if the emoji bucket becomes empty, it is deleted.

### Rendering
- `ChatList` pulls `reactions` from `chatReferences[message.signature]` and passes them to `MessageItem`. If a queued item exists for the same `chatReference` (including reactions), the row is marked `isUpdating` for visual feedback.
- `MessageItem` displays reaction chips only when a `reactions` map exists and counts >0. The popover uses translation keys `core:message.generic.people_reaction`, `core:action.add_reaction`, and `core:action.remove_reaction` for its labels. Sender names come from the reaction items (`senderName` fallback to `sender`).
- Reaction selection/removal is available both via the picker and via the popover action button; both route through the same `handleReaction` callback, so the add/remove decision is centralized.
