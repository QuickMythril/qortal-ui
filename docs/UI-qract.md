## Qortal UI – qortalRequest actions

### Handler structure
- Core’s `q-apps.js` inside the rendered QDN page still serves read-only actions (search/list/fetch resource, names, balances, chats search, blocks/tx/price), forwarding only unhandled actions to the UI iframe.
- The UI listener in `plugins/plugins/core/qdn/browser/browser.src.js` handles interactive actions; allowlist lives in `qdn-action-constants.js`, but only actions with explicit `case actions.*` branches are actually supported.
- `listOfAllQortalRequests` advertises more items (e.g., name trading, group admin), but those cases are absent, so apps cannot use them today.

### Actions the UI implements
- **Identity & names**: `GET_USER_ACCOUNT` (consent modal; auto-auth optional). `GET_PRIMARY_NAME` returns a string; `GET_ACCOUNT_NAMES` returns an array of strings (active name first for the logged-in account). Both differ from Core’s NameSummary shape.
- **QDN publish & crypto**: `PUBLISH_QDN_RESOURCE`, `PUBLISH_MULTIPLE_QDN_RESOURCES` (single-file resources with optional encrypt/metadata, PoW via `publishData`); `ENCRYPT_DATA`, `DECRYPT_DATA`, `ENCRYPT_QORTAL_GROUP_DATA`, `DECRYPT_QORTAL_GROUP_DATA`, `ENCRYPT_DATA_WITH_SHARING_KEY`, `DECRYPT_DATA_WITH_SHARING_KEY`, `DECRYPT_AESGCM`.
- **Wallet & payments**: `GET_USER_WALLET`, `GET_USER_WALLET_TRANSACTIONS`, `GET_WALLET_BALANCE`, `GET_USER_WALLET_INFO`; `SEND_COIN`; trade bot ops `CREATE_TRADE_BUY_ORDER/SELL_ORDER`, `CANCEL_TRADE_SELL_ORDER`; foreign-server helpers `GET_CROSSCHAIN_SERVER_INFO`, `GET_TX_ACTIVITY_SUMMARY`, `GET_FOREIGN_FEE/UPDATE_FOREIGN_FEE`, `GET_SERVER_CONNECTION_HISTORY`, `SET_CURRENT_FOREIGN_SERVER`, `ADD_FOREIGN_SERVER`, `REMOVE_FOREIGN_SERVER`; `GET_DAY_SUMMARY`; `IS_USING_PUBLIC_NODE`; `ADMIN_ACTION`; `SIGN_TRANSACTION`; `OPEN_NEW_TAB`; `CREATE_AND_COPY_EMBED_LINK`.
- **Chat**: `SEND_CHAT_MESSAGE` (direct or group). Direct requires recipient public key; payload limited to 4KB; PoW difficulty 8 if balance ≥4 QORT else 18; group messages sent with `isEncrypted:0`. Supports `fullMessageObject/fullContent` and optional `chatReference`.
- **Groups & polls**: `JOIN_GROUP`; `CREATE_POLL`, `VOTE_ON_POLL`.
- **Lists & files**: `GET_LIST_ITEMS`, `ADD_LIST_ITEMS`, `DELETE_LIST_ITEM`; `SAVE_FILE` (FileSaver download).
- **UI-only helpers**: `GET_FRIENDS_LIST`, `GET_PROFILE_DATA`, `SET_PROFILE_DATA`, `OPEN_PROFILE`, `NOTIFICATIONS_PERMISSION`, `SEND_LOCAL_NOTIFICATION`, `QDN_RESOURCE_DISPLAYED`, `SET_TAB_NOTIFICATIONS`, `LINK_TO_QDN_RESOURCE`.

### Notable gaps vs Core/Hub expectations
- No handlers for name registration/update/trading (`REGISTER_NAME/UPDATE_NAME/BUY_NAME/SELL_NAME/CANCEL_SELL_NAME`), group admin actions (`INVITE_TO_GROUP`, `CANCEL_GROUP_INVITE`, `KICK_FROM_GROUP`, `BAN_FROM_GROUP`, `CANCEL_GROUP_BAN`, `ADD_GROUP_ADMIN`, `REMOVE_GROUP_ADMIN`, `CREATE_GROUP`, `UPDATE_GROUP`, `LEAVE_GROUP`), or Hub’s extra payments (`MULTI_ASSET_PAYMENT_WITH_PRIVATE_DATA`, `TRANSFER_ASSET`, `SIGN_FOREIGN_FEES`).
- `GET_PRIMARY_NAME`/`GET_ACCOUNT_NAMES` return strings and re-order the active name for the logged-in user, diverging from Core’s NameSummary payload and ordering.
- `SEND_CHAT_MESSAGE` lacks Hub’s balance ≥4 gating (relies solely on PoW difficulty adjustment).
