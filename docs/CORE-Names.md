## Qortal Core – names

### API surface (`org/qortal/api/resource/NamesResource`)
- `GET /names` – list all names; optional `after`, `limit`, `offset`, `reverse`.
- `GET /names/address/{address}` – names owned by address (NameSummary); lite nodes proxy to peers.
- `GET /names/primary/{address}` – primary name for address (NameSummary); not allowed in lite mode.
- `GET /names/{name}` – fetch by name (uses reduced/normalized lookup); throws NAME_UNKNOWN if missing.
- `GET /names/search?query=&prefix=&limit=&offset=&reverse=` – search by query, optional prefix-only.
- Build unsigned tx endpoints (Base58): `POST /names/register` (REGISTER_NAME), `/names/update` (UPDATE_NAME), `/names/sell`, `/names/sell/cancel`.

### Core rules & limits
- Name length: 3–40 bytes (UTF-8) (`Name.MIN_NAME_SIZE/MAX_NAME_SIZE`).
- Data length: up to 4000 bytes (`Name.MAX_DATA_SIZE`).
- Names must be normalized (`Unicode.normalize`)—no leading/trailing whitespace, collapsed spaces, no zero-width chars.
- Names cannot resemble Qortal addresses (`Crypto.isValidAddress` check in register/update).
- Reduced name (for uniqueness) uses `Unicode.sanitize`: NFKD, remove zero-width, collapse whitespace, strip marks/accents, lowercase, homoglyph reduction (from `char_codes.txt`). Uniqueness enforced on reduced name (`reducedNameExists/fromReducedName`).
- Registration can be temporarily disabled between specific heights (self-sponsorship algo v2/v3 window) returning `TEMPORARY_DISABLED`.
- One-name-per-account enforced until `BlockChain.oneNamePerAccount(height)` flips; multiple names allowed after `getMultipleNamesPerAccountHeight`.
- Primary name stored in `PrimaryNames` table: `getPrimaryName/setPrimaryName/removePrimaryName/resetPrimaryName` (`Account` + `NameRepository`).

### Transactions and validation
- REGISTER_NAME (`RegisterNameTransaction`):
  - Validates length/normalization/data size; rejects address-like names; balance must cover fee.
  - Fails if reduced name already exists or one-name-per-account restriction applies.
  - Process: saves to Names; if multiple-names feature active and account has no primary, sets primary to new name.
- UPDATE_NAME (`UpdateNameTransaction`):
  - Cannot update primary if owner has >1 name (`NOT_SUPPORTED`).
  - Validates current name existence, normalization; txGroupId must match creation group.
  - New name optional; if present must meet length/normalize/address check and not collide on reduced name (unless case-only change).
  - New data length <= 4000. Name cannot be for sale; owner must match.
  - Process: updates Names, caches nameReference; if multiple-names active and updating primary, resets primary to new name. Orphans restore old name/data and primary if needed.
- SELL_NAME: If owner has >1 name, cannot sell primary. Validates normalization, ownership, not already for sale, price >0 and <MAX_AMOUNT.
- BUY_NAME:
  - Blocks buyer if already has primary? Validation checks buyer primary name not for sale? (Primary restriction: if buyer has primary not for sale? It checks buyerPrimaryName and sellerPrimaryName in isValid and process).
  - On process: transfers ownership/funds, updates nameReference. Primary handling (post multiple-names height): seller loses primary if selling it; buyer sets primary if none.
  - Orphan reverses ownership/balances and restores primary names accordingly.

### Primary name determination
- `Account.determinePrimaryName`: if one name → that name; if multiple → picks earliest acquisition transaction (register/buy/update) that left name with owner, using tx history filtered by confirmation status. `resetPrimaryName` can recompute and set.
- `getPrimaryName` returns Optional; `getPrimaryName` API wraps into NameSummary; absent primary yields NameSummary with null name but owner filled.

### Repository behaviors
- Names table stores: name, reduced_name, owner, data, registered_when, updated_when, for-sale flag, sale_price, reference, creation_group_id.
- PrimaryNames table via `getPrimaryName/setPrimaryName/removePrimaryName/clearPrimaryNames`.
- Integrity: `NamesDatabaseIntegrityCheck` can rebuild Names entries from transaction history (register/update/sell/cancel-sell/buy) and is invoked preProcess on register/update/sell.

### Normalization/duplication prevention
- Registration uses `Unicode.sanitize(name)` to produce reducedName saved into transaction and Names. Duplicate check uses reducedName, so case/diacritics/homoglyph/spacing variants are considered identical.
- Update rename also uses reducedNewName to prevent collisions except when only case-adjusting same name.

### Multiple names & primary constraints
- Before multiple-names height, `oneNamePerAccount` forbids registering a second name.
- After multiple-names height:
  - Primary auto-set on first registration/buy.
  - Selling or updating primary while owning >1 name is rejected (`NOT_SUPPORTED`).
  - Primary can shift automatically only when updating/renaming your sole/primary name (new name becomes primary), or via buy/sell flows: seller loses primary if they sell it; buyer sets primary if they had none. There is no manual “switch primary” between multiple owned names in Core today.
