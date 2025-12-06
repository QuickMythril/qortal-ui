## Qortal Core – chat

### Transaction types
- `CHAT` (unconfirmable): direct or group chat packets, stored only in unconfirmed pool (not written to blocks).
  - Data length: 1–4000 bytes.
  - PoW: memory PoW over tx bytes (nonce cleared) using `MemoryPoW.compute2` with buffer 8MB.
    - Difficulty depends on sender balance: ≥4 QORT (400,000,000 QORT atoms) → 8 leading zero bits; below → 18 bits (`POW_DIFFICULTY_BELOW_QORT_THRESHOLD`).
  - Group routing: `txGroupId` indicates group; sender must be group member; recipient (if present) must also be group member. `txGroupId = NO_GROUP` for public/direct.
  - Recipient validation: if present, must be a valid address.
  - Rate limiting: rejects if unconfirmed pool already has more than `maxRecentChatMessagesPerAccount` (default 250) from same creator within `recentChatMessagesMaxAge` (default 24h) (`TOO_MANY_UNCONFIRMED`).
  - Blocked lists: rejects if sender address or any of sender’s registered names is blocked (via `ListUtils`).
  - Timestamp: must not be >5 minutes in future.
  - Signature validation also verifies PoW nonce (balance-based difficulty).
  - Confirmability: always false; `process`/`orphan` throw (should never enter blocks).
  - On import to unconfirmed: ensures an account skeleton so public key can be retrieved even after expiry.
- `MESSAGE` (separate type, some chat-like behavior):
  - Also uses memory PoW (difficulty varies by feature trigger; confirmable only to AT addresses after mempow updates).
  - Data length: 1–4000 bytes; optional payment; different confirmability rules. (UI/Hub use `CHAT`, not `MESSAGE`, for chat flows.)

### Storage / lifetime
- `CHAT` transactions live only in the unconfirmed transactions pool. Recent-limit check uses a 24h window (configurable by `recentChatMessagesMaxAge`), so effectively chat messages are available up to 24h unless evicted sooner by unconfirmed pool policies.
- Settings relevant:
  - `maxRecentChatMessagesPerAccount` (default 250)
  - `recentChatMessagesMaxAge` (default 24h in ms)
  - `wipeUnconfirmedOnStart` controls whether unconfirmed pool is cleared on node startup.

### Processing flow
- Clients build and sign CHAT (types 18/181 in Hub/UI) and submit to `/transactions/process?apiVersion=2` as Base58.
- Core validation:
  - TxGroupId/group membership checks (for group chats).
  - Data length, recipient address validity.
  - PoW nonce verification with difficulty based on sender balance.
  - Rate-limit for recent unconfirmed from same creator.
  - Blocklist checks.
  - If already exists in repository (unconfirmed), returns `INVALID_BUT_OK` to short-circuit.
- CHAT is never confirmed; it remains in unconfirmed storage until expiry/cleanup.

### Direct vs group
- Direct: `recipient` set to an address; `txGroupId` typically NO_GROUP; recipient validity enforced.
- Group: `recipient` usually null; `txGroupId` set to group; sender (and recipient if specified) must be group members; still unencrypted on-chain (privacy handled at higher layers via group keys).

### MemPoW specifics
- Buffer size 8 MiB (`POW_BUFFER_SIZE`).
- Difficulty split by balance threshold 4 QORT (400,000,000 atoms): high-balance difficulty 8 bits, low-balance difficulty 18 bits.
- Verification uses same parameters in `isSignatureValid`.

### Restrictions / anti-spam
- Data size limit 4 KB.
- Future timestamp limit 5 minutes.
- Max recent chats per account in unconfirmed pool (default 250) within ~24h; exceeding yields `TOO_MANY_UNCONFIRMED`.
- Blocked addresses/names rejected.
- Recipient must be a valid address if present; group membership enforced for group chats.

### Notes
- CHAT txs never reach blocks; clients must rely on peers’ unconfirmed pools/websocket to receive them within the retention window.
- Encryption (direct vs group) is handled at client layer; Core does not enforce/interpret encryption flags beyond storing the payload and validating size/PoW.
