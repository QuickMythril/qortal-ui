## Chat: Hub vs UI (working vs develop)

### Sending chat (qortalRequest)
- Hub: `SEND_CHAT_MESSAGE` handles both direct (tx type 18) and group (type 181), supports `fullMessageObject`/`fullContent`, allows chatReference flag, enforces min balance (>= MIN_REQUIRED_QORTS, currently 4), PoW difficulty 8, and requires recipient public key for direct (encrypted). Group messages are sent with `isEncrypted:0` but expect group key workflow on decrypt.
- UI: `SEND_CHAT_MESSAGE` builds a fixed tiptap JSON (plain text, empty images), no `fullMessageObject` passthrough, no balance check. Direct send requires recipient public key (encrypted). Group send is `isEncrypted:0`. Both use PoW difficulty 8 via `memory-pow.wasm.full`.

### Message format
- Hub: Direct payload `{message:<string|JSON>, version:2, ...otherData}` stringified; group payload uses provided `fullMessageObject` or default tiptap `{messageText, images:[], repliedTo:'', version:3}`. Supports `chatReference`.
- UI: Always wraps text into tiptap `{messageText, images:[''], repliedTo:'', version:3}`; no arbitrary `fullMessageObject`. `chatReference` present in params but `hasChatReference` hardcoded 0.

### Encryption / decryption
- Hub: Direct messages encrypted (requires recipient public key); decrypted via `decryptDirectFunc`. Group messages decrypted with group symmetric keys (from admin publishes, managed in `groupSecretkeys`) using `decryptSingle` and secretKeyObject. Group privacy depends on key distribution outside tx encryption.
- UI: Direct messages encrypted; group messages treated as plaintext (no group secret-key decrypt path). No group key management analogous to Hub.

### Fetching messages
- Hub: Uses HTTP and WebSockets (`/websockets/chat/messages`) for direct and group, with base64 decoding, blocklist filtering, and decryption pipelines.
- UI: Uses HTTP polling (`/chat/messages` and `chat/messages/count`) for direct/group; no WebSocket listeners in chat UI.
- Search: `SEARCH_CHAT_MESSAGES` listed in Hub allowlist but unimplemented; likewise in UI (no handler).

### PoW / anti-spam
- Both: PoW difficulty 8 for chat, computed via WASM. Hub enforces min balance >=4 QORT before sending; UI does not check balance.
- Both require recipient public key for direct (block if absent).

### Attachments/embeds
- Hub: Attachments/embeds ride inside the message JSON (`fullMessageObject`/tiptap), decoded in `MessageDisplay`. No separate upload in chat send flow.
- UI: Same conceptually, but send path only includes text and an empty images array; embeds depend on message content, not explicit support.

### Processing
- Hub: Signed chat bytes posted to `/transactions/process?apiVersion=2` via `processTransactionVersion2Chat`.
- UI: Uses `sign_chat` Epml bridge; core posts to `/transactions/process?apiVersion=2` (outside this repo).

### Notable gaps in UI vs Hub
- No group secret-key decryption or key management in UI; group messages effectively plaintext.
- No balance gate in UI send flow.
- No `fullMessageObject` passthrough; limited message content structure.
- No websockets for live chat updates; relies on polling.
- `hasChatReference` hardcoded to 0 in UI send, limiting threading.
