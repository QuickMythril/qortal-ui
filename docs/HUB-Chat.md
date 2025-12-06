## Qortal Hub – chat handling (develop)

### Chat send actions
- `SEND_CHAT_MESSAGE` qortalRequest → `src/qortal/get.ts:sendChatMessage`.
  - Supports direct (tx type 18) and group (tx type 181) chat.
  - Requires either `recipient` (direct) or `groupId` (group); optional `chatReference` for threading.
  - Message payload: uses `data.fullMessageObject`/`fullContent` if provided; otherwise builds a default tiptap JSON `{messageText, images:[], repliedTo:'', version:3}`. Accepts stringified JSON as well.
  - Permission prompt per app (`qAPPSendChatMessage-<app>`), with “always allow” option.
  - Balance check: must have at least `MIN_REQUIRED_QORTS` (4) via `getBalanceInfo`; otherwise throws.
  - Recipient path: fetch `/addresses/publickey/<recipient>`; must exist for encryption. Builds tx body with `isEncrypted=1`, `isText=1`, optional chatReference flag. Performs PoW difficulty 8 via `performPowTask(chatBytes, 8)`, then signs with `signChatFunc` → `transactions/process?apiVersion=2`.
  - Group path: builds tx body with `groupID`, `hasReceipient=0`, `isEncrypted=0`, `isText=1`, optional chatReference. PoW difficulty 8, then `signChatFunc`.
- `sendChatDirect` (internal, background) for direct messages from UI: similar tx type 18; builds `{message, version:2, ...otherData}` JSON string, encrypts (needs recipient public key), PoW difficulty 8, signed and processed.
- PoW implementation: `background.computePow` uses WASM `compute2` to find nonce from chatBytes hash; difficulty fixed at 8 for chat.

### Fetching messages
- Direct chat:
  - REST: `/chat/messages?involving=<addrA>&involving=<addrB>&encoding=BASE64&limit=0&reverse=false` (initial load).
  - Websocket: `/websockets/chat/messages?involving=<addrA>&involving=<addrB>&encoding=BASE64&limit=100`.
  - Background helpers (`background.ts` around 2721/2766) fetch last messages for notifications.
- Group chat:
  - REST: `/chat/messages?txGroupId=<groupId>&encoding=BASE64&limit=0&reverse=false`.
  - Websocket: `/websockets/chat/messages?txGroupId=<groupId>&encoding=BASE64&limit=100`.
  - Messages are filtered against blocklists, then decrypted (see below).
- Search endpoint `SEARCH_CHAT_MESSAGES` is listed in qortalRequest allowlist but not implemented in `qortal-requests.ts` (no handler).

### Decryption / encryption
- Direct messages: `decryptDirectFunc` uses recipient’s public key and own private key to decrypt chat data (base64) via `decryptChatMessage`; messages parsed as JSON (expects `message` field).
- Group messages: encrypted with group symmetric key published by admins; `decryptMessages` in `ChatGroup` calls `window.sendMessage('decryptSingle', {data: encryptedMessages, secretKeyObject})`. Secret keys fetched from group admin publishes; stored in `groupSecretkeys`. Messages marked with `data === 'NDAwMQ=='` (base64 of “4001”) are treated as group key creation notices.
- UI chat uses `decodeBase64ForUIChatMessages` for non-extension messages (extension messages decoded separately).
- Encryption for sending group chat is not applied (`isEncrypted: 0` in tx body); group privacy relies on symmetric key usage for private groups (handled elsewhere via QDN encrypt/decrypt when retrieving keys).

### Message format
- Direct send: `{ message: <string|rich JSON>, version: 2, ...otherData }` stringified, encrypted in tx `message`.
- Group send: `message` field is JSON string (either provided `fullMessageObject`/`fullContent` or default tiptap-rich object). Stored base64-encoded in tx.
- In UI rendering, messages are decoded and mapped to `{ text/html, sender, senderName, chatReference, timestamp, decryptedData }` depending on source.

### Attachments / embeds
- Chat messages use a rich JSON object (`fullMessageObject`) with fields like `messageText` (tiptap), `images`, `repliedTo`, `version`. Attachments are handled as part of the message payload (not as separate tx data). Images/embeds are decoded on display in `MessageDisplay.tsx`; no separate upload in the chat send flow.
- External Q-App messages (`isExtMsg`) are excluded from UI decoding path.

### Anti-spam / balance gating
- PoW difficulty fixed at 8 for both direct and group chat (enforced client-side with WASM).
- Balance gate: must have `MIN_REQUIRED_QORTS` (4) to send via `sendChatMessage`; otherwise error. (Commented-out balance gate in group path remains.)
- Recipient public key is required for direct messages; missing key blocks encryption/send.

### Processing
- Signed chat bytes are posted to `/transactions/process?apiVersion=2` (Base58 encoded body). `processTransactionVersion2Chat` handles the POST and returns JSON or text.

### Observations
- No explicit rate-limit/fee beyond PoW difficulty 8 and balance >=4 QORT.
- `SEARCH_CHAT_MESSAGES` has no implementation; search is not exposed via qortalRequest in Hub code.
- Attachments are part of the message JSON; there is no separate attachment transaction path in chat send.
