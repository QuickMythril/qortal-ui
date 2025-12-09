## Qortal UI – emoji reactions (current)

### UI surface and selection
- The legacy UI still wires an emoji picker (EmojiPicker, twemoji skin) for reactions via the `emojiPicker` instance created in `plugins/plugins/core/components/ChatPage.js:190-213`. It is passed down to `chat-scroller`/`message-template` and also used to parse emoji when rendering v0/v1 text (`this.emojiPicker.parse(...)`).
- In `chat-scroller` (`plugins/plugins/core/components/ChatScroller.js`), the picker listens for `emoji` events (`firstUpdated` around lines 280-300). When a user selects an emoji, it calls `sendMessage({ type: 'reaction', editedMessageObj: toggledMessage, reaction: selection.emoji })`. The target message is held in a module-level `toggledMessage` variable that is set via `setToggledMessage(message)` and passed to child components; any reaction UI is expected to set this before opening the picker.
- Existing reactions are shown beneath each message in `MessageTemplate` (`ChatScroller.js`, ~1900s). The `reactions` array is read from the message payload; each reaction renders as a pill with the emoji and `qty`. Tooltips (`vaadin-tooltip`) list up to three reacting users by name/address and summarize overflow counts.
- Clicking an existing reaction pill calls `sendMessage({ type: 'reaction', editedMessageObj: this.messageObj, reaction: reaction.type })`, toggling the current user in/out of that emoji’s user list.

### Data model on messages
- Reactions live inside the message JSON itself, not as a separate store. The `reactions` field is an array of objects: `{ type: <emoji>, qty: <number>, users: [{ address, name? }] }`.
- `MessageTemplate` populates `reactions` from `parsedMessageObj.reactions` when decoding the message body (see parsing block around lines 1050-1300). Parsed data is cached on the message object for reuse.
- Theme tokens for reaction UI are defined in `plugins/plugins/core/components/plugins-css.js` and propagated via CSS variables (`--reaction-bubble-outline`, `--reactions-tooltip-bg` in `core/src/styles/switch-theme.css` and `core/font/switch-theme.css`).

### Sending a reaction
- Reaction sends piggyback on the edit flow rather than a dedicated reaction transaction:
  - `ChatScroller` routes reaction requests to `ChatPage.sendMessage` with `type: 'reaction'` plus the target message (`editedMessageObj`) and chosen emoji.
  - In `ChatPage` (around lines 3800-3890), the reaction handler:
    1) Computes `typeMessage = 'edit'` and chooses `chatReference` from the target message’s `signature` (or its existing `chatReference` if present).
    2) Parses the target message’s `decodedMessage` JSON to get the current `reactions` array (fallbacks to raw text on parse failure).
    3) Finds/creates the reaction entry for `reaction`. Toggles the current user: adds `{address, name}` (name from `getName`) if absent; removes if present. Updates `qty` to the user array length and drops the reaction entry if it becomes empty.
    4) Rebuilds the message object `{...message, reactions}` and stringifies it.
    5) Calls `sendMessage({ messageText, typeMessage: 'edit', chatReference, isReceipient: <direct?>, _chatId, _publicKey, ... })`. This results in a chat transaction with `hasChatReference=1` (tx type 18 for direct or 181 for group) carrying the updated message JSON. No special reaction type number is used.
- Clicking an existing pill reuses the same path, so add/remove logic is centralized in the reaction branch of `sendMessage`.

### Receiving, parsing, and display
- Incoming chat messages are decoded in workers (`plugins/plugins/core/components/webworkerDecodeMessages.js`) and `crypto/api/deps/Base64Message.js`. If an incoming payload has `type === 'reaction'` (from Hub-style reaction-only messages), the decoder sets `isReaction: true`, maps `content` to `message`, and sets `repliedTo` to the reference. These standalone reaction messages are not rendered as chat rows.
- `ChatPage.addToUpdateMessageHashmap` (`ChatPage.js:2331+`) explicitly filters out any decoded messages containing `isReaction`, so pure reaction items are ignored in the update queue. Only edits that mutate the message body (including `reactions`) are applied.
- Because reactions are embedded in the message JSON, any edit transaction that includes a `reactions` array will be displayed. `MessageTemplate` renders the pills whenever `reactions.length > 0`.

### Gaps and behaviors to note
- The reaction picker add flow relies on `toggledMessage` being set via `setToggledMessage(...)`; no in-file invocation exists, so downstream UI must set it before opening the picker. Reaction pills themselves work because they pass `editedMessageObj` directly.
- There is no server-side aggregation: each reaction send rewrites the full message payload via an edit transaction. Concurrency conflicts or out-of-order edits are not resolved; later edits overwrite the `reactions` array they carry.
- Standalone “reaction” message types (as emitted by Hub) are currently ignored for display, except that they’re filtered out of updates.
