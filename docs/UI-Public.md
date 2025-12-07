# Qortal UI node selection and custom node handling

## Defaults and persistence
- Startup loads node config from local storage (`myQortalNodes`, `mySelectedNode`) and falls back to two localhost presets (mainnet/testnet) if empty; no public gateway is defined (`core/src/redux/app/actions/node-config.js:5-118`).
- The selected node index and the full node list are kept in local storage and mirrored into Redux state (`nodeConfig`) when `doLoadNodeConfig` runs during app init (`core/src/initStore.js:6-36`).

## UI/UX for choosing nodes
- The settings dialog presents a custom node picker with the current selection, an add/edit/remove flow, and import/export of the node list (`core/src/functional-components/settings-page.js:59-210,214-590`).
- Adding or editing a node captures `name`, `protocol`, `domain`, `port`, sets `enableManagement: true` on the node object, updates Redux via `doAddNode`/`doEditNode`, and rewrites `myQortalNodes` (`core/src/functional-components/settings-page.js:354-492`).
- Selecting a node updates Redux via `doSetNode`, rewrites `mySelectedNode`, and shows a toast with the chosen endpoint; the selection is restored on reload from local storage (`core/src/functional-components/settings-page.js:214-292,340-352`).
- Import/Export uses a `.nodes` file with the serialized node array; “Delete custom node list” resets back to the two localhost presets (`core/src/functional-components/settings-page.js:302-338,431-590`).

## API key handling
- On login, the UI tries to auto-generate an API key for the selected node (`POST /admin/apikey/generate`) and then tests it (`GET /admin/apikey/test`); success persists the key into the selected node entry in `myQortalNodes` (`core/src/apiKeyUtils.js:4-55`, invoked from `core/src/components/login-view/login-section.js:720-757`).
- If generation/test fails, a manual “My Key” dialog lets the user paste an API key, tests it, and saves it on the selected node (`core/src/functional-components/mykey-page.js:35-92`).

## How requests use the selected node
- `initApi(store)` wires `qortal-ui-crypto` to the Redux state so `api.request` and `Epml` proxy calls resolve relative to the currently selected node (`core/src/initStore.js:6-16`).
- Components derive the base URL from the selected node (`protocol://domain:port`) and reuse the stored API key via `getApiKey()` when building endpoints (e.g., balance and trade-bot calls in `core/src/components/app-view.js:432-2086,3071-3074` and node-type detection in `core/src/components/app-view.js:1727-1741`).
- The `enableManagement` flag on the node controls whether the Node Management menu item is shown (`core/src/components/app-view.js:1969-1984`); custom nodes created in the UI default this flag to `true`.

## Notable differences from Qortal Hub
- Qortal UI does not ship or detect any hosted “public node”; the only bundled entries are local/mainnet and local/testnet, and every action simply uses whichever custom node the user selects.
- There are no public-node-specific restrictions in the UI layer; capabilities (e.g., node management) are gated only by the selected node’s own API responses and the `enableManagement` flag the user sets on that node.
