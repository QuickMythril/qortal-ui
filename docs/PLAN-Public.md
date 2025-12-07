## Plan: bring Qortal UI up to Hub public-node parity (checklist)

- [x] Add public-node constants and detection
  - [x] Define `EXT_NODE_QORTAL_LINK`/`HTTPS_EXT_NODE_QORTAL_LINK` and a `gateways` array (mirroring Hub) plus an `isPublicNode()` helper in UI’s shared config layer.
  - [x] Extend default node list to include the public gateway (no apiKey, `enableManagement:false`); keep localhost mainnet/testnet defaults.
  - [x] Ensure node selection persists protocol/domain/port/apiKey and exposes a derived `baseUrl` + `apiKey` for requests.

- [ ] Update request routing to respect public vs local
  - [x] Add a helper to build endpoints: append `apiKey` only when present; otherwise use base URL; when no node is selected, never auto-switch to public—prompt the user with an explicit opt-in before falling back to the public gateway.
  - [ ] Wire `qortal-ui-crypto` / Epml initialization to use the new base-url builder and carry the selected apiKey.
  - [ ] Add a global `isPublicNode` flag in Redux/derived selectors for easy guards.

- [ ] Node selection UX parity
  - [ ] Surface the public node in the Settings node picker with a “Public node” label and warning copy.
  - [ ] If selected node is public, skip API-key generation/testing in login, and clear stored apiKey for that entry.
  - [ ] Show a lightweight indicator/banner of the currently selected node (Local/Public/Custom) in the header/login flow.
  - [ ] Add i18n strings for public-node warnings and descriptions (reuse Hub copy where suitable).

- [ ] Feature guards aligned with Hub
  - [ ] QDN publishes: enforce 500 MB per file limit on public node; keep 2 GB limit otherwise.
  - [ ] Block unsupported actions on public node (throw/notify):
    - Hosted data list/delete APIs.
    - Lists (get/add/delete) APIs.
    - Cross-chain wallet/balance/transactions for non-QORT (esp. ARRR).
    - Non-QORT send; allow QORT only.
    - Foreign server management (set/add/remove) and foreign fee updates.
    - Admin actions (stop/restart/bootstrap/peers/minting).
  - [ ] Surface clear user-facing errors matching Hub’s “no action public node” messaging.

- [ ] UI affordances when on public node
  - [ ] Hide/disable node-management menu for the public node (respect `enableManagement:false`).
  - [ ] Mirror Hub UX that hides block/unblock or moderation actions if they rely on non-gateway endpoints (audit UI components that call Core admin/management routes).
  - [ ] Add a small badge in sensitive dialogs (e.g., trade/buy-order) noting “using public node: <host>”.

- [ ] Storage and migration
  - [ ] Migrate existing `myQortalNodes` entries: keep user nodes, append the public entry if missing; preserve `mySelectedNode`.
  - [ ] Ensure old records without `enableManagement` or `apiKey` still work; default missing fields safely.

- [ ] Testing / validation
  - [ ] Verify routing: public node selected → requests omit apiKey and hit `ext-node.qortal.link`; custom/local nodes → apiKey appended and management endpoints reachable.
  - [ ] Confirm guards: each restricted action throws the public-node error; allowed actions still work.
  - [ ] Confirm publishes: >500 MB fails on public, succeeds on local; ≤500 MB succeeds on public.
  - [ ] UX checks: node picker shows public entry, login skips key generation on public, banner/badges render, node-management hidden on public.
