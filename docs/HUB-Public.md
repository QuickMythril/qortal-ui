# Qortal Hub public node behavior

## What counts as a “public node”
- Hub treats any API URL containing `ext-node.qortal.link` as a public gateway (see `gateways` in `src/background/background.ts:128` and constants in `src/constants/constants.ts:199-214`).
- If no API selection is stored, network calls fall back to the public gateway: `createEndpoint` and `getBaseApi` default to `groupApi` (`https://ext-node.qortal.link`) when no saved API key is present (`src/background/background.ts:284-321`).
- The app-level flag `isRunningPublicNode` is derived from `isRunningGateway` (`src/qortal/qortal-requests.ts:89-101`) on every state change (`src/App.tsx:479-487`).

## How users pick or end up on the public node
- Login screen → “Choose node” dialog lists:
  - Local node `http://127.0.0.1:12391`
  - Public node `https://ext-node.qortal.link`
  - Any custom nodes saved in storage  
  Selecting one saves it to storage via `setApiKey` and updates the displayed node (`src/components/NotAuthenticated.tsx:560-649`).
- If the local core is missing/offline, the “Use your local core” recommendation dialog offers “continue with public node,” which clears the saved API key so Hub falls back to the public gateway (`src/components/CoreSetupRecommendationDialog.tsx:98-125`).
- Node choices are persisted in wallet storage or browser storage (`setApiKeyCase` in `src/background/background-cases.ts:960-1016`) and mirrored in the in-memory `globalApiKey` (`src/App.tsx:263-281`).

## Request routing and configuration
- All QDN/chain requests are built through `createEndpoint`, which appends `apiKey=<saved key>` to the chosen base URL; when no URL is saved it uses the public gateway (`src/background/background.ts:307-321`).
- The “public node” check is string-based: any saved URL not containing the `gateways` host is treated as non-public. Custom remote nodes are therefore treated as “local” for permissions, even if they are not truly local.

## User-visible UX when on a public node
- Block/Unblock features are hidden while on a public node to avoid unsupported moderation calls (`src/components/WrapperUserAction.tsx:24-166`, `src/components/Group/Group.tsx:2038-2071`, `src/components/Group/GroupList.tsx:190-223`).
- Login/advanced node picker shows the current node label (“Local” vs “Public”) via `nodeDisplay` (`src/utils/helpers.ts:1-43`).
- Modal copy explicitly warns that the public node is a privately operated convenience node with limitations (`src/components/CoreSetupRecommendationDialog.tsx:60-94` and `src/i18n/locales/en/node.json`).
- Buy-order confirmation highlights whether a public gateway is being used (`src/qortal/get.ts:4659-4723`).

## Functional limits enforced while using the public gateway
Hub blocks or constrains several actions when `isRunningGateway()` is true:
- Hosted data management is disabled: listing and deleting hosted resources require a non-public node (`src/qortal/get.ts:928-1014`).
- List APIs are disabled: retrieving, adding to, or deleting from lists throws the “no action public node” error (`src/qortal/get.ts:1070-1243`).
- QDN publishes are capped at 500 MB per file on the public node; larger publishes require a non-public node (`MAX_SIZE_PUBLIC_NODE` and checks in `src/qortal/get.ts:1325-1394` and `src/qortal/get.ts:1565-1601`).
- Cross-chain/ARRR operations: ARRR wallet info and balances are blocked on the gateway (`src/qortal/get.ts:2620-2717`, `src/qortal/get.ts:2865-2926`, `src/qortal/get.ts:2929-2954`). Sending non-QORT coins is also blocked; only QORT sends are allowed on the public node (`src/qortal/get.ts:4016-4094`).
- Cross-chain server configuration calls (set/add/remove current foreign server) and foreign fee updates are blocked on the gateway (`src/qortal/get.ts:3392-3855`).
- Admin actions (stop/restart core, peers, minting accounts, etc.) are blocked when on the public node (`src/qortal/get.ts:5115-5202`).

## Operational notes
- Because the default storage state is “no API key,” first-run users effectively hit the public gateway until they validate/save a local or custom node. Running `isNodeValid()` during login stores the validated node so subsequent calls stop using the gateway.
- Only one host is treated as “public” today. If additional public nodes are introduced they must be added to `gateways` to inherit the same protections.
