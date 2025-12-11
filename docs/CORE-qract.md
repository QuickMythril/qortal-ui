## Qortal Core – qortalRequest actions

### How Core serves qortalRequest
- Core injects `q-apps.js` into QDN pages; read-only actions are handled in-frame by direct HTTP to the Core API, while anything needing user consent (wallet, publish, send, join, decrypt, lists) is forwarded to the host UI/HUB via `postMessage`.
- Default timeout is 30s with longer windows for wallet/publish/chat/AT/poll/trade requests (see `getDefaultTimeout`); gateway mode blocks interactive actions (`q-apps-gateway.js`).
- Responses are the raw API payloads; name lookups return NameSummary objects, resource searches mirror `/arbitrary/*` endpoints, and no client-side massaging is applied inside Core.

### Actions and expected payloads
- **Identity & names**:  
  `GET_USER_ACCOUNT` → address/publicKey of logged-in user (consent required).  
  `GET_ACCOUNT_DATA` → `/addresses/{address}`.  
  `GET_ACCOUNT_NAMES` → `/names/address/{address}` (NameSummary list).  
  `SEARCH_NAMES` → `/names/search` with `query`, optional `prefix/limit/offset/reverse`.  
  `GET_NAME_DATA` → `/names/{name}`.
- **QDN discovery**:  
  `LIST_QDN_RESOURCES` → `/arbitrary/resources` filters: `service/name/identifier/default/includeStatus/includeMetadata/nameListFilter/followedOnly/excludeBlocked/limit/offset/reverse`.  
  `SEARCH_QDN_RESOURCES` → `/arbitrary/resources/search` filters: `service/query/identifier/name/names/keywords/title/description/prefix/exactMatchNames/default/mode/minLevel/includeStatus/includeMetadata/nameListFilter/followedOnly/excludeBlocked/before/after/limit/offset/reverse`.  
  `GET_QDN_RESOURCE_STATUS` → `/arbitrary/resource/status/{service}/{name}/{identifier?}` with optional `build`.  
  `GET_QDN_RESOURCE_PROPERTIES` → `/arbitrary/resource/properties/{service}/{name}/{identifier|default}`.  
  `GET_QDN_RESOURCE_METADATA` → `/arbitrary/metadata/{service}/{name}/{identifier|default}`.  
  `GET_QDN_RESOURCE_URL` builds a render/fetch URL after status check; `LINK_TO_QDN_RESOURCE` navigates the app.  
  `FETCH_QDN_RESOURCE` → `/arbitrary/{service}/{name}/{identifier?}?filepath&rebuild&encoding`.
- **QDN publish**:  
  `PUBLISH_QDN_RESOURCE` – single base64 file; required `name/service/data64`, optional `identifier/filename/title/description/category/tag1-5/encrypt/recipientPublicKey`.  
  `PUBLISH_MULTIPLE_QDN_RESOURCES` – array of the above, each published as its own transaction.
- **Crypto/encryption/files**:  
  `DECRYPT_DATA` – base64 payload plus `publicKey` when decrypting legacy direct-encrypted blobs; returns base64 plaintext.  
  `SAVE_FILE` – `{blob, filename, mimeType?}` prompt to save locally.
- **Wallet & payments**:  
  `GET_WALLET_BALANCE` – wallet balance for `coin`.  
  `GET_BALANCE` – address balance (optionally `assetId`).  
  `SEND_COIN` – `{coin, destinationAddress, amount, fee?}` (fee only for some foreign coins).
- **Chat**:  
  `SEARCH_CHAT_MESSAGES` – `/chat/messages` with `before/after/txGroupId/involving/reference/chatReference/hasChatReference/encoding/limit/offset/reverse`.  
  `SEND_CHAT_MESSAGE` – direct (`destinationAddress`) or group (`groupId`) chat; 1–4000 bytes, memory PoW over tx bytes (8MB buffer), difficulty 8 if balance ≥4 QORT else 18; direct requires recipient public key, group messages flagged unencrypted.
- **Groups**:  
  `LIST_GROUPS` – `/groups` with `limit/offset/reverse`.  
  `JOIN_GROUP` – `{groupId}` builds JOIN_GROUP transaction after consent.
- **AT / blocks / transactions**:  
  `DEPLOY_AT` – `{creationBytes(base58), name, description, type, tags, amount, assetId, fee?}`.  
  `GET_AT` → `/at/{atAddress}`; `GET_AT_DATA` → `/at/{atAddress}/data`; `LIST_ATS` → `/at/byfunction/{codeHash58}?isExecutable/limit/offset/reverse`.  
  `FETCH_BLOCK` – by `signature` or `height`, optional `includeOnlineSignatures`; `FETCH_BLOCK_RANGE` – `{height, count?, reverse?, includeOnlineSignatures?}`.  
  `SEARCH_TRANSACTIONS` – filters: `startBlock/blockLimit/txGroupId/txType/address/confirmationStatus/limit/offset/reverse`.  
  `GET_PRICE` – `/crosschain/price/{blockchain}?maxtrades&inverse`.
- **Lists**:  
  `GET_LIST_ITEMS`, `ADD_LIST_ITEMS` (array), `DELETE_LIST_ITEM` (single) operate on named lists like `followedNames/blockedNames`; consent required.
