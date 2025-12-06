## Qortal UI – name handling (working)

### qortalRequest actions
- Only `GET_USER_ACCOUNT` is supported for apps. It is listed in `plugins/plugins/core/components/qdn-action-constants.js` and handled in `plugins/plugins/core/qdn/browser/browser.src.js` to return `{ address, publicKey }` after user consent/auto-auth.
- `GET_PRIMARY_NAME` / `GET_ACCOUNT_NAMES` are not implemented or exposed in the UI’s qortalRequest layer.

### API usage
- `/names/address/<address>` is the sole name lookup used throughout the UI:
  - Own names: fetched repeatedly in `plugins/plugins/core/qdn/publish/publish.src.js` (`fetchNames`) with `?limit=0&reverse=true`; first element is treated as “my registered name” (see TODO noting it only populates a single option).
  - General helper: `plugins/plugins/utils/classes.js#getNameInfo` and `plugins/plugins/utils/functions.js#getUserNameFromAddress` fetch this endpoint and return the first name (or `''`/address fallback).
  - Components (non-exhaustive) that resolve names via this endpoint: `ChatPage` (direct/group chat member labels and placeholders), `ChatGifs`, `ChatRightPanelResources`, `ChatGroupManager`, `TipUser`, `NameMenu`, `TradeInfoView`, `QDN browser` (recipient display), `group-management`, `puzzles`, `qortal-lottery`, `sponsorship-list`, `qortal-info-view`, `user-info-view`, `wallet-app`, and various modals (address book, beginner tour, notifications).
- `/names/<name>` is used to resolve a typed name to an address in lookup flows (e.g., `core/src/components/user-info-view/user-info-view.js`); not used for primary-name selection.

### How the current user’s name is fetched/stored
- The UI keeps an `accountInfo` object in Redux (`app.accountInfo.names` array). Many components read `names[0].name` as the user’s display name/avatar key (e.g., `ChatRightPanelResources`, `ChatGroupManager`, `q-chat`, `wallet-profile`, `overview-page`, `settings account-view`).
- Name retrieval for that array happens via `/names/address/<selectedAddress>` calls; `core/src/redux/user/actions/update-name.js` also polls the same endpoint every 10s after a register-name transaction to move `nameStatus` from “waiting for confirm” to “loaded”.
- There is no concept of “primary name” in the UI; the first entry returned by `/names/address` (often the newest when `reverse=true` is used) is assumed to be the active name everywhere.

### How other users’ names are fetched/displayed
- Chat: `plugins/plugins/core/components/ChatPage.js#getName` and similar helpers hit `/names/address/<recipient>`; if empty they fall back to blank or address, so chat headers/placeholders can show raw addresses when no name exists.
- Lookups/avatars: `core/src/components/user-info-view/user-info-view.js` uses `/names/address/<address>?limit=0&reverse=true` to show a name and build avatar URLs; fallback text is “No registered name.”
- Utility helpers (`getUserNameFromAddress`, `getNameInfo`) are reused across puzzles, lottery, sponsorships, tipping, trade info, and QDN browser recipient labels to decorate addresses with the first returned name.

### Display/timing notes
- Some UI pieces poll `/names/address/<myAddress>` on an interval (`publish` uses `config.user.nodeSettings.pingInterval`; register-name polling uses 10s) to keep the single “registered name” current.
- Avatars and personal profile views construct thumbnail URLs with `names[0].name`; when no name is present they either omit the avatar or fall back to the address.
- Because only the first name is surfaced, additional names on the account are effectively hidden in most UI flows.

### Observations / gaps
- No `GET_PRIMARY_NAME`/`GET_ACCOUNT_NAMES` support for qortalRequest consumers; apps cannot query names via the request layer.
- Multiple names are not surfaced: selectors/pickers generally hardcode a single option (`publish` TODO acknowledges this). Primary-name semantics do not exist; “first element from /names/address” is treated as the user identity.
