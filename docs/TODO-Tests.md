# Chat & Node Test TODOs

Tracking planned additions to strengthen chat handling and node integration tests.

## Chat parsing (offline/unit)
- [x] Orphan edit: only edit present, synthesize base and render edited content.
- [x] Reaction without base: keep reactions visible without hiding other messages.
- [x] Reply to missing base: render reply with safe fallback preview.
- [ ] Out-of-order arrival: update/reaction before base, then base arrives; final render keeps base with updates/reactions intact.
- [ ] Group key cache hydrate: use localStorage `symKeysCurrent` entry for a groupId without network.
- [ ] Private vs group decode: direct (txGroupId 0) and group (>0) paths don’t cross flags.
- [ ] Cannot decrypt fallback: encrypted-like payload with missing key shows placeholder, no crash.
- [ ] Hub-format payload: version 3 / messageText parsed same as standard.
- [ ] Embed parsing: encoded embed link is stripped and structured embed info returned.

## Node-backed integration (already present)
- [x] Admin status reachable.
- [x] Deterministic keypair and address derivation.
- [x] Test account address/name: primary name `qortal-ui-test`, public key match, balance > 0, last reference non-false.
- [ ] (Optional) Direct chat to self via API when auth available (build/compute/sign/process) and retrieval check.

## Future enhancements
- [ ] Add node health: `/stats` consistency and syncPercent sanity.
- [ ] Expand utils roundtrips: base58/base64/hex conversions.
- [ ] Additional name/address checks: search endpoint includes test name.
