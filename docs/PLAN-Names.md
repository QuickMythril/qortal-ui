## Plan: bring Hub name features into Qortal UI (checklist)

- [x] Expose name endpoints to apps (qortalRequest)
  - [x] "Add primary/account name actions": Add `GET_PRIMARY_NAME` and `GET_ACCOUNT_NAMES` to `plugins/plugins/core/components/qdn-action-constants.js` and `qdn-action-types.js`.
  - [x] "Handle name actions in browser bridge": Implement handlers in `plugins/plugins/core/qdn/browser/browser.src.js`:
    - [x] "Add GET_PRIMARY_NAME handler": `GET_PRIMARY_NAME`: call `/names/primary/<address>` (payload or selected address) via `parentEpml.request('apiCall', …)` and return `{ name }` or `''`.
    - [x] "Add GET_ACCOUNT_NAMES handler": `GET_ACCOUNT_NAMES`: call `/names/address/<address>?limit=0&reverse=true` and return array of names.
  - [x] "Expose name actions in SHOW_ACTIONS": Update any app-facing lists (e.g., `SHOW_ACTIONS`) to include the new actions.

- [x] Core helpers for primary + all names
  - [x] "Implement getPrimaryName/getAllUserNames": Add utilities: `getPrimaryName(address)` -> `/names/primary/<address>`; `getAllUserNames(address)` -> `/names/address/<address>?limit=0&reverse=true`.
  - [x] "Prefer primary in name helpers": Update `getUserNameFromAddress` / `getNameInfo` to prefer `/names/primary` for others and fall back to `/names/address`.
  - [x] "Validate names per core rules": Add client-side checks for length (3–40 bytes UTF-8), data length (≤4000 bytes), normalization/sanitization (Unicode normalize/sanitize), and reject address-like names before building/sending tx.

- [x] Redux/accountInfo shape
  - [x] "Store primaryName/allNames in accountInfo": Extend `app.accountInfo` to include `primaryName` and `allNames`; default from `/names/primary` and `/names/address`.
  - [x] "Update name polling to set primary/all": Update `core/src/redux/user/actions/update-name.js` polling to set `primaryName`, `allNames`, and `nameStatus`.
  - [x] "Keep names array backward compatible": Keep backward compatibility: populate legacy `names` array from `allNames` with `primaryName` first.
  - [x] "Add activeName selection": Persist an `activeName` in state (alongside accountInfo; default primary or first name) to represent the user-selected name when multiple exist.

- [x] Surfaces that assume a single name (use primaryName with fallback)
  - [x] "Update chat UI name usage": Chat UI components (`ChatPage.js`, `ChatRightPanelResources`, `ChatGroupManager`, `ChatGifs`, `q-chat`, placeholders) use `activeName || primaryName || names[0]?.name || address`.
  - [x] "Update profile/avatar name usage": Profile/avatars (`wallet-profile.js`, `overview-page.src.js`, `settings account-view.js`, `user-info-view.js`, `qortal-info-view.js`, notification bell) use `activeName || primaryName || names[0]?.name || address`; when avatar image fails or name is missing, show first letter fallback (preserve original casing/character) and keep incognito as last resort; when name+address are shown together and no name exists, display “No registered name”.
  - [x] "Update trade/tip/info name usage": Trade/tip/info (`TipUser.js`, `TradeInfoView.js`, `TraderInfoView.js`, `sponsorship-list`, `puzzles`, `qortal-lottery`, `group-management`) use `activeName || primaryName || names[0]?.name || address`.
  - [x] "Use active name for avatar URLs": Avatar URL builders use `activeName || primaryName` when present.

- [ ] Publishing flows (support multiple names + ownership validation)
  - [x] "Populate publish dropdown with allNames": In `qdn/publish/publish.src.js`, populate dropdown with `allNames` (default `activeName || primaryName`).
  - [ ] "Remove single-name TODO in publish": Remove hardcoded single-option TODO; show all owned names.
  - [ ] "Validate selected publish name ownership": Validate selected name is in `allNames`; fall back to `activeName || primaryName` if none selected.
  - [ ] "Use primary/all names in other publish flows": Other publish flows using `myRegisteredName` load from `activeName || primaryName` and surface `allNames` where relevant.

- [ ] Other-user lookups aligned to primary name
  - [ ] "Update lookup helpers to use /names/primary": Update chat/UI lookup helpers (`ChatPage#getName`, `functions.js#getUserNameFromAddress`, `classes.js#getNameInfo`, user-info/address book) to use `/names/primary/<address>` first, then `/names/address`, then address.
  - [ ] "Preserve name fallbacks": Preserve fallbacks (“No registered name” or address).

- [ ] Polling/refresh cadence
  - [ ] "Poll /names/primary after registration": Switch register-name polling to `/names/primary`; also refresh `allNames`.
  - [ ] "Refresh primary/all names on intervals": Ensure intervals (publish modal `pingInterval`, update-name 10s) update both `primaryName` and `allNames` in Redux.
  - [ ] "Handle lite-node primary fallback": Gracefully handle `/names/primary` unauthorized on lite nodes and fall back to `/names/address`.

- [ ] Compatibility and guards
  - [ ] "Fallback to names/address if primary unavailable": Fallback to `/names/address` if `/names/primary` is unavailable.
  - [ ] "Keep legacy names array populated": Keep `accountInfo.names` populated for legacy consumers while adding `primaryName`/`allNames`.
  - [ ] "Do not attempt core primary switch": Keep `activeName` UI-only; do not try to change core primary when multiple names exist due to core restrictions.
  - [ ] "Handle TEMPORARY_DISABLED/name errors": Surface core errors such as `TEMPORARY_DISABLED`, name length/data length, normalization, address-like name rejections clearly in UI.
  - [ ] "Explain primary/active differences": Add UX copy (e.g., in Name Registration plugin) explaining core primary rules and how UI activeName differs.

- [ ] Validation and smoke tests
  - [ ] "Test publish modal with multiple names": Publish modal shows all owned names, defaults to active/primary, rejects non-owned name.
  - [ ] "Check chat/avatar name display": Chat headers/placeholders and avatars show active/primary names consistently.
  - [ ] "Verify name registration polling results": Name registration polling populates `primaryName` + `allNames`.
  - [ ] "Test qortalRequest name actions": qortalRequest responds to `GET_PRIMARY_NAME`/`GET_ACCOUNT_NAMES` with expected data.

- [ ] Active name selection + overrides
  - [ ] "Add active name selector UI": Provide a UI control to pick an active name from `allNames` and persist it.
  - [ ] "Use active name in my-name contexts": Update internal consumers of the user name (chat metadata, publish defaults, avatars, app filters) to use `activeName || primaryName`.
  - [ ] "Override qortalRequest name responses": For `GET_PRIMARY_NAME`, return `activeName` if set; for `GET_ACCOUNT_NAMES`, order names with `activeName` first.
