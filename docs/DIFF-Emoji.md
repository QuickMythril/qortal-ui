## Hub vs UI – emoji reactions

### Architecture
- **Message shape**: Hub stores reactions alongside messages in an auxiliary map keyed by `chatReference` (`chatReferences[ref].reactions[emoji] = ReactionItem[]`), never mutating the original message text. UI embeds reactions inside the message JSON itself (`reactions: [{type, qty, users[]}]`) and rewrites the whole message via an edit transaction.
- **Transport**: Hub emits dedicated `type: 'reaction'` messages that reference the target signature; removals use `contentState: false`. UI reuses `typeMessage: 'edit'` transactions; add/remove is represented by a new version of the message body with a modified `reactions` array (no special type or flag).
- **Encryption tag**: Hub applies `typeNumber 102 (RESOURCE_TYPE_NUMBER_GROUP_CHAT_REACTIONS)` for private-group reaction messages so they are recognized as updates. UI sends reactions as ordinary edits (no type number), regardless of group privacy.

### Sending flow
- **Hub**: `ChatGroup.handleReaction` / `ChatDirect.handleReaction` enqueue a reaction message (`content = emoji`, `contentState` toggle, `specialId` for optimistic matching) via `addToQueue('chat-reaction' | 'chat-direct', chatReference)`. Public groups send plaintext JSON; private groups encrypt with the reaction type number. Balance gate + queue pause/resume wrap the send.
- **UI**: `ChatScroller` picks up emoji selections and calls `ChatPage.sendMessage` with `type: 'reaction'`, but the handler converts this into an edit: parses the target message, mutates the `reactions` array (toggle current user), and sends `typeMessage = 'edit'` with `hasChatReference=1`. No `contentState`, no separate queue key, and it rewrites the whole message payload.

### Fetching and parsing
- **Hub**: REST and websockets stream reaction records alongside messages. Reaction items are aggregated with deduplication (per-sender latest timestamp wins) and removal handling; invalid payloads are skipped. Reaction-only messages never render as rows.
- **UI**: Reaction-only payloads (Hub style) are decoded but filtered out (`isReaction` messages dropped in `addToUpdateMessageHashmap`). Displayed reactions arrive only when an edit carries a `reactions` array; there is no merge logic for concurrent edits, so later edits overwrite prior reaction state.

### Display/interaction
- **Hub**: `MessageItem` shows reaction chips with counts and a popover listing reactors; the picker is `emoji-picker-react` (native emoji style) anchored to a smiley button and auto-positions. Add/remove is determined by whether the current sender already reacted; popover button also toggles. `isUpdating` dimming shows when a queued reaction/edit exists.
- **UI**: `MessageTemplate` renders pills with emoji + qty and Vaadin tooltips listing up to three users plus overflow summary. Clicking a pill toggles the user via the edit flow. Picker uses `EmojiPicker` (twemoji) and relies on a shared `toggledMessage` reference to know the target; the picker is also used to parse legacy v0/v1 text. No popover dialog; counts derive from the stored `qty` field.

### Resilience and ordering
- **Hub**: Guards against out-of-order reaction updates by comparing timestamps per sender and discarding older ones; deletes empty emoji buckets. Keeps message text immutable.
- **UI**: No timestamp or sender-based dedup; the last applied edit wins. Because reactions live inside the message body, any concurrent message edit can clobber reaction state.

### Gaps / incompatibilities
- UI ignores standalone reaction messages produced by Hub; it only respects reactions that are embedded in message edits. Hub can consume its own reaction records without touching message text. Migrating UI back to Hub parity would require ingesting `type: 'reaction'` items into a separate reaction map and displaying them without rewriting messages.
