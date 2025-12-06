## Qortal UI – chat handling (working)

### Chat send (qortalRequest in UI)
- `SEND_CHAT_MESSAGE` handled in `plugins/plugins/core/qdn/browser/browser.src.js`:
  - Prompts user (`showModalAndWait`), then builds a tiptap message JSON `{messageText, images:[''], repliedTo:'', version:3}` (no `fullMessageObject` support; images default to empty).
  - Direct chat (tx type 18): requires `destinationAddress`, fetches `/addresses/publickey/<recipient>`; if missing, aborts (cannot encrypt). Tx params: `timestamp`, `recipient`, `recipientPublicKey`, `hasChatReference` (always 0 here), `chatReference` (passed but flag 0), `message` (stringified tiptap object), `lastReference` (random), `proofOfWorkNonce 0`, `isEncrypted 1`, `isText 1`.
  - Group chat (tx type 181): params include `groupID`, `hasReceipient 0`, `hasChatReference 0`, `chatReference`, `message`, `lastReference`, `proofOfWorkNonce 0`, `isEncrypted 0`, `isText 1`.
  - PoW: difficulty 8 computed via `WebWorkerChat` using `/memory-pow/memory-pow.wasm.full`; result passed to `sign_chat` (apiVersion 2) and returned.
  - Errors surfaced from signing; no balance/min-QORT check in this flow.

### Chat transaction processing
- Uses parent Epml endpoints:
  - `chat` (tx build) with `type 18/181` and params above.
  - `_computePow` in `browser.src.js` runs WASM worker for nonce.
  - `sign_chat` to POST to `/transactions/process?apiVersion=2` (handled by core).

### Fetching messages (UI screens)
- `ChatPage.js` (core plugin):
  - Direct: `/chat/messages?involving=<me>&involving=<other>&limit=<N>&reverse=true|false&haschatreference=false&encoding=BASE64`; pagination via `before/after`, `chat/messages/count` for new count.
  - Group: `/chat/messages?txGroupId=<id>&limit=<N>&reverse=true|false&haschatreference=false&encoding=BASE64`.
  - Threads/replies: fetch by `chatreference` or `reference` (see `plugins/plugins/utils/functions.js`).
  - Uses WebSockets? (not present in UI; polling via HTTP).
- Utilities (`plugins/plugins/utils/functions.js`) fetch reply chains via `/chat/messages?chatreference=...` and `/chat/messages?reference=...` with `encoding=BASE64`.

### Message format & display
- Messages expected Base64-encoded in API responses; decoded to objects (`decodeMessageFunc` in utils). Reply threading uses `repliedTo`/`chatreference` fields.
- Direct messages include `senderPublicKey` resolution for decryption (see below).

### Encryption / decryption
- Direct: Uses `decodeMessageFunc` and decrypts message data with local keypair + sender public key (functions.js references `_publicKey`). Decryption logic largely client-side; assumes messages are encrypted (isEncrypted=1).
- Group: Sent with `isEncrypted 0`; group privacy relies on separate QDN key mechanisms? (UI lacks the group secret-key handling found in Hub; it treats group chat as plaintext from chain).
- No group symmetric-key workflow in UI chat (unlike Hub); messages appear to be fetched and displayed without group key decrypt steps.

### Attachments / embeds
- Send path only includes `messageText` and an empty `images` array; no explicit attachment upload in `SEND_CHAT_MESSAGE`.
- Display side uses message JSON (tiptap) to render text and images; embeds rely on message content, not separate tx fields.

### PoW / anti-spam
- PoW difficulty fixed at 8 for both direct and group chat (via `memory-pow.wasm.full`).
- No enforced minimum balance check in the UI send flow.
- Recipient public key required for direct send; if absent, sending is blocked.

### Observations / gaps
- No `fullMessageObject` passthrough in UI send; always wraps plain text into a tiptap object with empty images.
- Group chat is sent unencrypted (`isEncrypted:0`) and UI lacks group secret-key decryption steps present in Hub.
- No qortalRequest handler for `SEARCH_CHAT_MESSAGES`; search not exposed to qApps.
- Many chat message fetches rely on polling HTTP, not websockets (contrast with Hub).
