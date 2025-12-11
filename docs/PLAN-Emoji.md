## Plan – Emoji Reactions Parity (UI ↔ Hub)

### Wire format & send path
- [x] Add a dedicated reaction send path (no message rewrite): emit `{type:'reaction', content:emoji, contentState:bool, specialId, message:''}` with `chatReference` of the target message.
- [x] For private groups, encrypt reaction payloads using type number `102` (RESOURCE_TYPE_NUMBER_GROUP_CHAT_REACTIONS); keep plaintext JSON for public/direct.
- [x] Route reactions through the message queue with a distinct key (e.g., `chat-reaction`) and set `contentState` false when toggling off.

### State model & ingestion
- [x] Introduce a per-message reactions map (e.g., `chatReferences[ref].reactions[emoji] = ReactionItem[]`), separate from message text.
- [x] Parse inbound `type === 'reaction'` payloads into the map; skip invalid records (missing content/sender/timestamp).
- [x] Apply Hub-style dedup/out-of-order handling: per sender per emoji, drop older timestamps; remove on `contentState === false`, delete empty buckets.
- [x] Remove the current filter that drops `isReaction` messages and replace it with reaction aggregation; continue to render embedded `reactions` arrays only as a legacy fallback.
- [x] Reconcile queued reactions via `specialId` in `processWithNewMessages`, clearing pending queue entries on receipt.

### UI rendering & interaction
- [x] Update `message-template` rendering to consume the reactions map (not embedded arrays) for counts and user lists.
- [x] Keep reaction pills/tooltip UX (popover optional; deferred for now).
- [x] Mark rows as “updating” when a queued reaction/edit exists for that `chatReference`.
- [x] On picker/pill click, decide add vs remove by checking current user in the reactions map and send with the correct `contentState`.

### Compatibility & cleanup
- [x] Maintain legacy display of embedded `reactions` for historical messages until all clients migrate.
- [x] Add the shared constant for reaction type number if missing; ensure encryption helpers accept it.

### Fix parity gaps found
- [x] Mark direct/private decrypted reaction payloads as `isReaction` when using `decryptChatMessageBase64` so they feed the reaction map instead of rendering as stray text.
- [x] Handle plaintext Hub-style reactions in group chats: treat `{type:'reaction', content, contentState, repliedTo}` payloads without `messageText` as reactions (don’t fall back to the “cannot decrypt” stub).
- [x] Normalize reaction toggle logic in `sendMessage`: honor the incoming `contentState` and, when absent, derive it from `reactionsMap` (fallback to embedded `reactions`) so removals work.
- [x] Add a visible reaction button per message (e.g., in `chat-menu`) that calls `setToggledMessage` and opens the emoji picker, enabling first reactions (no existing chips required).
- [x] Align encryption rules: send reactions plaintext for public groups, encrypted with type number 102 for private groups, and ensure Hub can read UI reactions (and vice versa).
- [x] Ensure reaction messages carry timestamp/sender/chatReference through ingestion so `reactionsMap` counts/tooltips stay accurate and clear queued `specialId` entries when acknowledged.

### Validation
- [ ] Test Hub → UI: reactions display (add/remove), counts, tooltips, popover.
- [ ] Test UI → Hub: reactions arrive and render correctly (add/remove) in Hub.
- [ ] Test private groups: encrypted reactions tagged with type number 102.
- [ ] Test concurrent/out-of-order reactions: older sender entries ignored; removals clear buckets.
- [ ] Test queue/optimistic UI: pending reaction shows “updating,” clears on acknowledgment.

### Field issues to fix from live testing
- [x] Replies show “Edited now” placeholder before data loads; change placeholder to “Edited” until the time resolves.
- [x] Reaction tooltip shows “name, [object Object] emoji” on one line; should list only reactor names in order, one per line.
- [x] Clicking an existing reaction chip does nothing; should add (if other user) or remove (if current user) using the same emoji.
- [ ] Block reaction transactions from rendering as message rows: in `ChatPage.processMessages`, detect reactions by parsing `decodedMessage` (`type === 'reaction'`) in addition to `isReaction`/string checks, and exclude them from `renderableMessages`.
- [ ] Route all reactions through ingestion: in `ChatPage.addToUpdateMessageHashmap`, apply the same parsed `type === 'reaction'` detection before deciding to call `ingestReactionMessage`.
- [ ] Add renderer guard: in `message-template` rendering, short-circuit if the decoded payload is a reaction to prevent any stray reaction rows from rendering.
- [ ] Newly sent reactions don’t render until the chat is reloaded.
- [ ] Reaction chips don’t auto-refresh when a new reaction message arrives (needs live update without chat switch/reload).
- [ ] Intermittent missing messages/replies on load causing stale reactions to appear (newer removal edits not applied); sometimes messages appear out of order (e.g., 23h-old after recent ones).
- [ ] Private/closed groups with existing messages fail to load (regression during reaction changes; blocks private groups with history).
