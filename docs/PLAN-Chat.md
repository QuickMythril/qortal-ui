## Plan: align Qortal UI chat with Hub (checklist)

- [ ] Implement full chat send parity
  - [ ] "Support fullMessageObject payloads": Allow qortalRequest `SEND_CHAT_MESSAGE` to accept `fullMessageObject`/`fullContent` and pass through without forcing a simple tiptap wrapper.
  - [ ] "Set chatReference flags correctly": Populate `hasChatReference` based on presence of `chatReference` for both direct and group sends.
  - [ ] "Apply balance gate": Enforce MIN_REQUIRED_QORTS check (>=4) before sending, matching Hub.
  - [ ] "Use balance-based PoW difficulty": Match Core’s PoW: difficulty 8 if balance >= 4 QORT, otherwise 18; still use 8MB buffer.
  - [ ] "Enforce chat payload limits": Ensure serialized chat payload is <= 4000 bytes and timestamp not >5 minutes in future; surface Core errors.

- [ ] Encryption and group key handling
  - [ ] "Add group secret-key workflow": Port Hub’s group symmetric key fetch/decrypt (`groupSecretkeys`, admin publishes, `decryptSingle` paths) into UI so private group messages can be decrypted.
  - [ ] "Honor isEncrypted semantics": Ensure group chat decrypt uses secret keys; keep send path `isEncrypted:0` consistent with Hub and rely on key-based privacy.
  - [ ] "Align direct decrypt": Ensure direct message decryption matches Hub’s `decryptDirectFunc` (proper use of sender public key and message JSON parsing).
  - [ ] "Handle Core errors/rate limits": Surface Core rejections for blocklists, too many recent messages, or group membership failures during send.

- [ ] Message fetch parity
  - [ ] "Add websocket chat listeners": Introduce WebSocket support for `/websockets/chat/messages` (direct/group) with base64 decode and decrypt pipeline, reducing reliance on polling.
  - [ ] "Handle chat/messages parameters": Match Hub query patterns (`encoding=BASE64`, `haschatreference`, pagination) and reuse decode/decrypt utilities.
  - [ ] "Expose SEARCH_CHAT_MESSAGES handler": Add handler if needed to match Hub’s allowlist (even if proxied to the existing search endpoint).
  - [ ] "Respect Core group membership constraints": Ensure group fetch/send honor membership and handle errors from Core accordingly.

- [ ] Message format and embeds
  - [ ] "Preserve rich message objects": Ensure sent messages keep the provided structure (replies, images, embeds) and that display logic can render the same fields as Hub’s `MessageDisplay`.
  - [ ] "Handle UI/extension message mix": Decode extension vs UI messages consistently (mirror Hub’s `decodeBase64ForUIChatMessages` vs ext handling).

- [ ] PoW and processing
  - [ ] "Match PoW path": Keep difficulty 8, but align worker output/processing with Hub (nonce, chatBytesArray) and post via `transactions/process?apiVersion=2`.
  - [ ] "Recipient public key checks": Maintain recipient pubkey requirement for direct; provide clear error messaging consistent with Hub.

- [ ] UI integration / state
  - [ ] "Blocklist filtering": Port Hub’s blocklist filtering before decrypt/display.
  - [ ] "Threading support": Ensure `chatReference` is used in fetch/render similar to Hub (thread detection, reply lookups).

- [ ] Testing / validation
  - [ ] "Cross-app readability": Verify messages/attachments sent from UI render in Hub and vice versa (direct and group).
  - [ ] "Private group decryption": Validate secret-key flow for private groups works end-to-end in UI.
  - [ ] "Websocket fallback": Confirm websockets work; fallback to polling if unavailable without breaking behavior.

- [ ] Local chat history retention
  - [ ] "Add chat history setting": Provide a setting to keep chat messages locally (duration options, clear button); default aligned with 24h mempool unless opted in.
  - [ ] "Store/decrypt to IndexedDB": Save incoming/outgoing messages (direct/group) locally in IndexedDB with metadata; store raw payload as received and decrypt on display (no at-rest encryption beyond what the message already has). Open questions: schema/versioning.
  - [ ] "Merge cached + live messages": On chat load, fetch recent (24h) from network and merge older cached messages by timestamp; keep storing new ones as they arrive. Open question: handle redaction/edits across cached+live.
  - [ ] "Retention & cleanup": Enforce user-selected retention with periodic purge; display approximate storage usage in Settings. Open question: how to measure/report usage efficiently.
