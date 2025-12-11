## UI qortalRequest catch-up plan

- Fill action coverage gaps (names)
  - [ ] Implement `REGISTER_NAME`, `UPDATE_NAME`, `BUY_NAME`, `SELL_NAME`, `CANCEL_SELL_NAME` in the UI qortalRequest listener, matching Hub’s payload/fee flows and reusing existing name tx helpers.
  - [ ] Add consent + error handling parity (modals, public-node guards) and wire results to `listOfAllQortalRequests`.

- Fill action coverage gaps (groups/admin)
  - [ ] Implement group admin actions: `INVITE_TO_GROUP`, `CANCEL_GROUP_INVITE`, `KICK_FROM_GROUP`, `BAN_FROM_GROUP`, `CANCEL_GROUP_BAN`, `ADD_GROUP_ADMIN`, `REMOVE_GROUP_ADMIN`, `LEAVE_GROUP`, `CREATE_GROUP`, `UPDATE_GROUP` with the same validation and permission prompts Hub uses.
  - [ ] Add tests/QA scripts to exercise each group action against a local node.

- Normalize name responses
  - [ ] Align `GET_ACCOUNT_NAMES`/`GET_PRIMARY_NAME` outputs to Core/Hub (NameSummary or `{name, owner}` objects) while preserving active-name ordering for the logged-in user.
  - [ ] Update docs and any dependent UI code consuming the old string array shape.

- Chat parity adjustments
  - [ ] Do NOT add the 4-QORT minimum balance gate. Low-balance sends should be of trying PoW at the higher difficulty; keep PoW difficulty logic in sync with Core.
  - [ ] Verify `chatReference` passthrough and 4KB limit enforcement with unit/e2e tests.

- Payments / misc Hub-only actions
  - [ ] Port `MULTI_ASSET_PAYMENT_WITH_PRIVATE_DATA`, `TRANSFER_ASSET`, and `SIGN_FOREIGN_FEES` handlers to the UI listener using Hub’s implementations as a template.
  - [ ] Confirm foreign-server helpers and `SAVE_FILE` support remote attachment downloads (parity with Hub’s location-based path).

- Validation
  - [ ] Add targeted tests or manual checklists for new handlers (happy/error paths, public-node guard).
