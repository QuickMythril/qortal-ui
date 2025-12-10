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
- [ ] Update `message-template` rendering to consume the reactions map (not embedded arrays) for counts and user lists.
- [ ] Keep reaction pills/tooltip UX; optionally add a reactor list popover to match Hub.
- [ ] Mark rows as “updating” when a queued reaction/edit exists for that `chatReference`.
- [ ] On picker/pill click, decide add vs remove by checking current user in the reactions map and send with the correct `contentState`.

### Compatibility & cleanup
- [ ] Maintain legacy display of embedded `reactions` for historical messages until all clients migrate.
- [ ] Add the shared constant for reaction type number if missing; ensure encryption helpers accept it.

### Validation
- [ ] Test Hub → UI: reactions display (add/remove), counts, tooltips, popover.
- [ ] Test UI → Hub: reactions arrive and render correctly (add/remove) in Hub.
- [ ] Test private groups: encrypted reactions tagged with type number 102.
- [ ] Test concurrent/out-of-order reactions: older sender entries ignored; removals clear buckets.
- [ ] Test queue/optimistic UI: pending reaction shows “updating,” clears on acknowledgment.
