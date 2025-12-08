## Plan: bring Qortal UI up to Hub public-node parity (checklist)

- [x] Add public-node constants and detection
  - [x] Define `EXT_NODE_QORTAL_LINK`/`HTTPS_EXT_NODE_QORTAL_LINK` and a `gateways` array (mirroring Hub) plus an `isPublicNode()` helper in UI’s shared config layer.
  - [x] Extend default node list to include the public gateway (no apiKey, `enableManagement:false`); keep localhost mainnet/testnet defaults.
  - [x] Ensure node selection persists protocol/domain/port/apiKey and exposes a derived `baseUrl` + `apiKey` for requests.

- [x] Update request routing to respect public vs local
  - [x] Add a helper to build endpoints: append `apiKey` only when present; otherwise use base URL; when no node is selected, never auto-switch to public—prompt the user with an explicit opt-in before falling back to the public gateway.
  - [x] Expose selected-node context globally (baseUrl/apiKey/isPublic) for Epml/qortal-ui-crypto consumers.
  - [x] Wire Epml consumers to the selected-node context (global snapshot of baseUrl/apiKey) and expose `buildApiUrl` for request building.
  - [x] Add a global `isPublicNode` flag in Redux/derived selectors for easy guards.
  - [x] Replace per-call manual URL concatenation with the shared builder across request sites (app-view, tour, friends/notifications/profile/start-minting, remaining helpers like export-keys).

- [x] Node selection UX parity
  - [x] Surface the public node in the Settings node picker with a “Public node” label and warning copy.
  - [x] If selected node is public, skip API-key generation/testing in login, and clear stored apiKey for that entry.
  - [x] Show a lightweight indicator/banner of the currently selected node (Local/Public/Custom) in the header/login flow.
  - [x] Add i18n strings for public-node warnings and descriptions (reuse Hub copy where suitable).

- [x] Feature guards aligned with Hub
  - [x] QDN publishes: enforce 500 MB per file limit on public node; keep 2 GB limit otherwise.
  - [x] Block unsupported actions on public node (throw/notify):
    - Hosted data delete APIs.
    - Lists (add/delete) APIs.
    - Cross-chain wallet/balance/transactions for non-QORT (esp. ARRR).
    - Non-QORT send; allow QORT only.
    - Foreign server management (set/add/remove) and foreign fee updates.
    - Admin actions (stop/restart/bootstrap/peers/minting).
  - [x] Surface clear user-facing errors matching Hub’s “no action public node” messaging.

- [x] UI affordances when on public node
  - [x] Hide/disable node-management menu for the public node (respect `enableManagement:false`).
  - [x] Mirror Hub UX that hides block/unblock or moderation actions if they rely on non-gateway endpoints (audit UI components that call Core admin/management routes).
  - [x] Add a small badge in sensitive dialogs (e.g., trade/buy-order) noting “using public node: <host>”.

- [x] Storage and migration
  - [x] Migrate existing `myQortalNodes` entries: keep user nodes, append the public entry if missing; preserve `mySelectedNode`.
  - [x] Ensure old records without `enableManagement` or `apiKey` still work; default missing fields safely.

- [x] Testing / validation

## Issues to fix from manual testing (public node UX)

- [ ] Overview page - avatar and minter level elements shift left.
- [ ] Q-Apps plugin fails to load on public node; diagnose and fix while Websites works.
- [ ] Rework Minting page
  - [?] error says "[publicNode.actionBlocked]"
- [ ] Check Data Management page
- [ ] Check Auto Buy page
- [ ] "Not available on the public node. Connect to your own node to continue."
  - [ ] home page
- [?] "No name" keeps last active name
