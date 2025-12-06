## Qortal Hub – name handling (develop)

### qortalRequest actions
- `GET_USER_ACCOUNT` → handled in `src/qortal/qortal-requests.ts` and `src/qortal/get.ts`; after permission it returns `{ address, publicKey }` for the active wallet. Apps can then look up names from the address.
- `GET_PRIMARY_NAME` → handled in `src/qortal/qortal-requests.ts`; calls `getNameInfoForOthers(address)` which fetches `/names/primary/<address>` and returns the name string or empty string. Allowed for UI apps (listed in `UIQortalRequests`).
- `GET_ACCOUNT_NAMES` → listed in `listOfAllQortalRequests` but not included in `UIQortalRequests` and no handler is implemented, so Hub does not currently answer this action.

### API usage
- `/names/primary/<address>` used for both own and other addresses:
  - Own primary name: `background.getNameInfo` (`src/background/background.ts`) backs `userInfo` and other helpers.
  - Others’ names: `background.getNameInfoForOthers` and `components/Group/getNameInfo` (queues requests per address) resolve names for chat, groups, notifications, etc.
  - Polling: `TaskManager` polls this endpoint after a register-name transaction to mark completion; `Minting` fetches it for reward-share lists.
- `/names/address/<address>` used to list all names owned by the active wallet:
  - `encryption.getAllUserNames` (shared with `src/qortal/get.ts`) returns `string[]`.
  - App flows: `Apps/AppPublish` and `Apps/AppsPrivate` fetch this list when the publish/access modals open; `useSortedMyNames` prioritizes the current primary name first in the picker.
- `/names/<name>` used in `background.getNameOrAddress` to turn a entered name into an address for payments/messaging.

### How the current user’s name is fetched and stored
- `window.sendMessage('userInfo')` in `src/App.tsx` loads `{ name, publicKey, ...addressInfo }` from `background.getUserInfo`, which calls `/names/primary/<myAddress>`. This runs on auth/connect flows and on manual refresh.
- `window.sendMessage('name')` is also supported (background `nameCase`) and returns the same primary name string.
- The fetched primary name is stored in Jotai `userInfoAtom` as `userInfo.name` and passed through the app as `myName`.
- Many features assume this single primary name is the canonical identity: avatars (`MainAvatar`, `GroupAvatar`), sidebars, saved settings (`useQortalGetSaveSettings`), app library filters (`AppsDesktop` shows “your” apps when `app.name === myName`), chat sender metadata, etc.

### How other users’ names are fetched and displayed
- Chat and groups: `components/Group/getNameInfo` (uses `/names/primary/<address>`) with request queues to map member addresses to names for group lists, admins, blocked users, invites, and direct chat recipients (`ChatDirect` resolves recipient on first send).
- Notifications: `useHandlePaymentNotification` caches sender names via `getNameInfoForOthers`; `notifyAdminRegenerateSecretKey` embeds the requester’s name (or address fallback) in a direct chat message.
- Minting: `Minting` resolves names for minting accounts and reward-share participants before rendering.
- General lookup: `UserLookup` and `getNameOrAddress` allow entering either a name or address; names are validated via `/names/<name>` and `/names/primary/<address>`.

### Publishing / encryption flows that depend on a name
- QDN publish helpers in `src/qortal/get.ts` default to `registeredName = data.name || getNameInfo()` (primary). If no name is available they throw. Multi-resource publish validates each `resource.name` against `getAllUserNames()` from `/names/address/<myAddress>`.
- Payment with attached private data and other multi-send flows lazily fetch `getNameInfo()` when building ARBITRARY transactions if no name is already set.
- `src/encryption/encryption.ts` uses `getNameInfo()` as `registeredName` when publishing encrypted group chat keys and `getAllUserNames()` for name ownership checks.

### Display/timing notes
- The primary name is fetched on login/authentication and on manual refresh; there is no persistent cache beyond in-memory state.
- `TaskManager` polls `/names/primary/<address>` every 5s for up to 5 minutes after a register-name transaction to flip the task to “done”.
- Name lists for publish dialogs are fetched lazily when those dialogs open; sorting puts the current primary name first.

### Observations / gaps
- Hub currently exposes `GET_PRIMARY_NAME` but not `GET_ACCOUNT_NAMES` to apps; the latter is only enumerated, not handled.
- Most flows treat the primary name as the default identity; support for selecting a non-primary name exists in some publish flows (`data.name`) and the name pickers, but many UI areas (avatars, saved settings, app filters) assume a single primary name.
