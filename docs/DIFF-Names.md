## Names: Hub vs UI (working vs develop)

### qortalRequest surface
- Hub: exposes `GET_PRIMARY_NAME` to apps (`src/qortal/qortal-requests.ts`, listed in `UIQortalRequests` in `src/hooks/useQortalMessageListener.tsx`), plus `GET_USER_ACCOUNT`. `GET_ACCOUNT_NAMES` is enumerated but not implemented.
- UI: only exposes `GET_USER_ACCOUNT` (`plugins/plugins/core/qdn/browser/browser.src.js`, `plugins/plugins/core/components/qdn-action-constants.js`). No `GET_PRIMARY_NAME`/`GET_ACCOUNT_NAMES` equivalents for apps.

### Own name retrieval
- Hub: fetches `/names/primary/<myAddress>` (`src/background/background.ts#getNameInfo`, reused in `src/encryption/encryption.ts` and `src/qortal/get.ts`). Primary name is loaded into `userInfo.name` and passed around as `myName`.
- UI: fetches `/names/address/<myAddress>?limit=0&reverse=true` and treats the first entry as “my registered name” (`plugins/plugins/core/qdn/publish/publish.src.js#fetchNames`, Redux `app.accountInfo.names` populated via the same endpoint; `core/src/redux/user/actions/update-name.js` polls it after registration).
- Impact: Hub has an explicit primary-name concept; UI assumes first returned name is the active identity (reverse ordering means most recent name wins).

### Storage and propagation
- Hub: `userInfoAtom` carries `{name, publicKey, addressInfo…}`; many components consume `myName` directly (avatars, chat metadata, app filters).
- UI: Redux `app.accountInfo.names[0].name` is the de facto display name/identity (used in `ChatRightPanelResources`, `ChatGroupManager`, `q-chat`, `wallet-profile`, `overview-page`, `settings account-view`, etc.).

### Multiple names support
- Hub: can list all owned names via `/names/address/<myAddress>` (`src/encryption/encryption.ts#getAllUserNames`) and validates ownership in multi-resource publish (`src/qortal/get.ts`). Some pickers (`AppPublish`, `AppsPrivate`) sort names with `useSortedMyNames`, but most UI surfaces still assume primary.
- UI: generally surfaces only one name; publish flow has a TODO noting the dropdown is hardcoded to a single option (`plugins/plugins/core/qdn/publish/publish.src.js`). No ownership validation against all names; no concept of primary vs secondary.

### Other users’ names
- Hub: resolves others via `/names/primary/<address>` (`getNameInfoForOthers` in `src/background/background.ts`, `components/Group/getNameInfo`). Used in chat, groups, notifications, minting, payment notifications.
- UI: resolves others via `/names/address/<address>` first element (`ChatPage#getName`, `ChatGifs`, `qortal-info-view`, `user-info-view`, tipping, trade info, puzzles, lottery, group management, etc.). Falls back to empty string/address when none.
- Impact: Hub returns the registered primary name; UI may return any name owned by that address (most recent due to `reverse=true`), which can differ from the owner’s chosen primary.

### Name-dependent publishing/encryption
- Hub: publish/encryption helpers require a registered primary name; ARBITRARY/payment flows call `getNameInfo()` and validate per-resource names against `getAllUserNames()` (`src/qortal/get.ts`, `src/encryption/encryption.ts`).
- UI: publish component pulls first name only and passes it through; no validation against full name list (`plugins/plugins/core/qdn/publish/publish.src.js`). No primary-name enforcement.

### Timing / polling
- Hub: `TaskManager` polls `/names/primary/<address>` every 5s up to 5 minutes after register-name TX. Primary name fetched on auth/refresh.
- UI: `doUpdateAccountName` polls `/names/address/<address>` every 10s when awaiting confirmation. `publish` fetches names on interval `config.user.nodeSettings.pingInterval` while modal is active.

### Fallback behavior
- Hub: when no name, flows often fall back to empty string and may block publishes (requires name) or show address in notifications.
- UI: when no name from `/names/address`, many displays fall back to address (e.g., `getUserNameFromAddress` returns address; `user-info-view` shows “No registered name”).

### Key gaps/differences
- Hub provides an app-visible primary-name endpoint and uses primary-name semantics internally; UI lacks both and relies on first-owned-name heuristics.
- UI hides additional owned names in most flows; Hub can list/validate all names for publishing but still assumes primary for identity.
- Cross-address lookups diverge: Hub returns the declared primary name; UI returns whichever name appears first for that address, which can cause inconsistent labels and avatars across apps.
