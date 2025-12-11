## Qortal Hub – qortalRequest actions

### Handler structure
- QDN pages still run Core’s `q-apps.js`; read-only actions (names, searches, resource fetch/status, balances, blocks, tx search, price, chats search, etc.) call the node directly and are not re-handled by Hub.
- Interactive actions are intercepted in `useQortalMessageListener` and sent to background handlers in `src/qortal/qortal-requests.ts` / `src/qortal/get.ts`; per-app “always allow” flags are stored for some actions.
- `SAVE_FILE` is handled in the listener via `saveFile` helper; navigation events (`LINK_TO_QDN_RESOURCE`, `QDN_RESOURCE_DISPLAYED`) update in-app history only.

### Actions Hub handles
- **Identity / names**: `GET_USER_ACCOUNT` (returns address/publicKey on consent); `REGISTER_NAME`, `UPDATE_NAME`, `BUY_NAME`, `SELL_NAME`, `CANCEL_SELL_NAME` (name trade flows); `GET_PRIMARY_NAME` returns a string from `/names/primary/{address}`.
- **QDN publish & crypto**: `PUBLISH_QDN_RESOURCE`, `PUBLISH_MULTIPLE_QDN_RESOURCES` (single-file resources with optional encrypt/metadata, PoW via `publishData`); `ENCRYPT_DATA`, `ENCRYPT_QORTAL_GROUP_DATA`, `ENCRYPT_DATA_WITH_SHARING_KEY`, `DECRYPT_DATA`, `DECRYPT_QORTAL_GROUP_DATA`, `DECRYPT_DATA_WITH_SHARING_KEY`, `DECRYPT_AESGCM`; `DELETE_HOSTED_DATA`/`GET_HOSTED_DATA`; `SHOW_PDF_READER` (opens in-app PDF viewer).
- **Wallet & payments**: `GET_WALLET_BALANCE`, `GET_USER_WALLET`, `GET_USER_WALLET_INFO`, `GET_USER_WALLET_TRANSACTIONS`; `SEND_COIN` (QORT/foreign coins), `MULTI_ASSET_PAYMENT_WITH_PRIVATE_DATA`, `TRANSFER_ASSET`; trade bots `CREATE_TRADE_BUY_ORDER/SELL_ORDER`, `CANCEL_TRADE_SELL_ORDER`, `SIGN_FOREIGN_FEES`; server management `GET_FOREIGN_FEE/UPDATE_FOREIGN_FEE/GET_SERVER_CONNECTION_HISTORY/SET_CURRENT_FOREIGN_SERVER/ADD_FOREIGN_SERVER/REMOVE_FOREIGN_SERVER`; `IS_USING_PUBLIC_NODE`.
- **Chat**: `SEND_CHAT_MESSAGE` (direct or group). Requires balance ≥4 QORT, PoW difficulty fixed at 8; direct messages require recipient public key, group messages sent with `isEncrypted:0`. Supports `fullMessageObject/fullContent` and optional `chatReference`.
- **Groups**: `JOIN_GROUP`, `LEAVE_GROUP`, `INVITE_TO_GROUP`, `CANCEL_GROUP_INVITE`, `KICK_FROM_GROUP`, `BAN_FROM_GROUP`, `CANCEL_GROUP_BAN`, `ADD_GROUP_ADMIN`, `REMOVE_GROUP_ADMIN`, `CREATE_GROUP`, `UPDATE_GROUP`.
- **Polls & admin**: `CREATE_POLL`, `VOTE_ON_POLL`; `ADMIN_ACTION` (local node admin endpoints); `SIGN_TRANSACTION`; `OPEN_NEW_TAB`; `CREATE_AND_COPY_EMBED_LINK`; `SHOW_ACTIONS` returns allowlist.
- **Lists & files**: `GET_LIST_ITEMS`, `ADD_LIST_ITEMS`, `DELETE_LIST_ITEM`, `SAVE_FILE` (downloads blobs or remote attachments after consent).
- **Misc**: `GET_ARRR_SYNC_STATUS`, `GET_NODE_INFO`, `GET_NODE_STATUS`, `GET_TX_ACTIVITY_SUMMARY`, `GET_CROSSCHAIN_SERVER_INFO`, `GET_DAY_SUMMARY`.

### Notable gaps vs Core’s documented list
- No background handler for read-only actions such as `GET_ACCOUNT_DATA`, `GET_ACCOUNT_NAMES`, `SEARCH_NAMES`, `LIST_QDN_RESOURCES`, `SEARCH_QDN_RESOURCES`, `GET_QDN_RESOURCE_URL/STATUS/PROPERTIES/METADATA`, `FETCH_QDN_RESOURCE`, `SEARCH_CHAT_MESSAGES`, `LIST_GROUPS`, `GET_AT/GET_AT_DATA/LIST_ATS`, `FETCH_BLOCK/RANGE`, `SEARCH_TRANSACTIONS`, `GET_PRICE`; these rely on `q-apps.js` calling the Core API directly.
- `GET_PRIMARY_NAME` returns a plain string (not a NameSummary) and is an addition not present in Core’s official list.
