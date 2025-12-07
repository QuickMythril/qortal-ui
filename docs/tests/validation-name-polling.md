## Validation: name registration polling populates `primaryName` + `allNames`

Manual check steps:

1. Use an account that owns multiple names (e.g., Name1 primary, Name2, Name3).
2. Start the UI with Redux DevTools open (inspect `app.accountInfo`).
3. After login, confirm the polling action populates:
   - `primaryName` set to the core primary name.
   - `allNames` array matches `/names/address/<address>?limit=0&reverse=false`.
   - Legacy `names` array has primary first.
4. Change core primary (or register a new name) and wait for polling (10s interval) to refresh; verify `primaryName` and `allNames` update accordingly.
5. Ensure no errors when `/names/primary` is unauthorized (lite node): `primaryName` empty and `allNames` from `/names/address`.

Automated coverage: `core/src/redux/user/actions/update-name.test.js` (Jest).
