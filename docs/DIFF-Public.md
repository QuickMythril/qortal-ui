# Qortal Hub vs Qortal UI: public/custom node handling

## Scope
- Hub sources: `src/background/background.ts`, `src/components/NotAuthenticated.tsx`, `src/hooks/useAuth.tsx`, gateway guards in `src/qortal/get.ts`, UX copy in `src/components/CoreSetupRecommendationDialog.tsx`.
- UI sources: `core/src/redux/app/actions/node-config.js`, `core/src/functional-components/settings-page.js`, `core/src/apiKeyUtils.js`, `core/src/functional-components/mykey-page.js`, request usage in `core/src/components/app-view.js`.

## Defaults and detection
- **Hub**: Defaults to the public gateway `https://ext-node.qortal.link` when no API key is stored (see `groupApi` fallback and `createEndpoint` in `src/background/background.ts:284-321`). Public vs non-public is a string check against the `gateways` list (`ext-node.qortal.link` only).
- **UI**: Defaults to two localhost entries (mainnet/testnet). No public gateway concept; every node is “custom/local” and is whatever the user selects (`core/src/redux/app/actions/node-config.js:5-118`).

## Node selection UX
- **Hub**: Login screen modal lists Local (127.0.0.1:12391), Public (`ext-node.qortal.link`), and stored custom nodes. Choosing sets `apiKey` in storage and updates `selectedNodeInfoAtom` (`src/components/NotAuthenticated.tsx:560-649`). A recommendation dialog lets users “continue with public node” if local core is absent (`src/components/CoreSetupRecommendationDialog.tsx`).
- **UI**: Settings dialog provides a dropdown of stored nodes, add/edit/remove, import/export `.nodes` file, and reset to defaults (`core/src/functional-components/settings-page.js:59-590`). Selection persists `mySelectedNode` and shows a toast; no explicit public-node path.

## API key behavior
- **Hub**: Stores URL+apikey in `apiKey` storage; public node entry uses an empty apiKey. On load, `getApiKey` drives global routing; `isNodeValid` can prompt to generate/test local keys and handle invalid keys (`src/hooks/useAuth.tsx`). Public gateway is always treated as “no key”.
- **UI**: On login, attempts `POST /admin/apikey/generate` and `GET /admin/apikey/test` against the selected node; success saves `apiKey` on that node in `myQortalNodes` (`core/src/apiKeyUtils.js`, called from `core/src/components/login-view/login-section.js:720-757`). Manual key entry lives in `mykey-page.js`.

## Routing of requests
- **Hub**: `createEndpoint` injects `apiKey` query when present, else uses the public gateway base; websocket base uses `ext-node` unless a node is selected (`src/background/background.ts`). `isRunningGateway()` gates many actions.
- **UI**: `qortal-ui-crypto` and `Epml` calls rely on the selected node’s `protocol/domain/port`; API key appended explicitly where needed (e.g., balances/trade bot in `core/src/components/app-view.js:1994-2086`). No gateway check layer.

## Feature gating / limits
- **Hub**: Public node is restricted—hosted data list/delete, list APIs, cross-chain balance/wallet/ARRR, non-QORT send, foreign server management, admin actions, and >500 MB QDN publishes are blocked when `isRunningGateway()` is true (`src/qortal/get.ts` guards).
- **UI**: No public-node-specific guardrails. Capabilities depend only on node responses and user-set `enableManagement` (shows Node Management menu) (`core/src/components/app-view.js:1969-1984`).

## Storage & persistence
- **Hub**: Uses extension storage (`walletStorage`/local) for `apiKey` and `customNodes`; in-memory `globalApiKey` mirrors selection for React usage (`src/App.tsx:240-300`).
- **UI**: Persists `myQortalNodes` and `mySelectedNode` in `localStorage`; Redux hydrates them on boot (`core/src/initStore.js`, `core/src/redux/app/app-reducer.js`).

## Practical takeaway
- Hub offers a built-in, labeled public gateway with protective feature blocks; UI assumes users supply a reachable node and only manages endpoints/keys without special public-node logic.
