## TODO: i18n coverage and cleanup

- [ ] Audit recent UI changes for hardcoded strings (Names flow, publish modal, chat tweaks, theme picker, notifications).
- [ ] Add any missing keys to `locales/en.json`; mirror keys across other locale files with English fallbacks until translations arrive.
- [ ] Replace inline literals with existing helpers (`translate`, `get`) in components and functional templates.
- [ ] Verify locale switching still works in main surfaces (dashboard, chat, wallet, publish modal, name switcher).
- [ ] Add a lightweight check to catch missing keys during CI or dev builds (e.g., dev warning or script that scans for untranslated text patterns).
- [ ] Update contributor guidance on adding strings to ensure new UI copy lands in `locales/en.json` first.

## Harcoded strings

- "No registered name"/"No Registered Name" fallbacks in `core/src/utils/name.js:26`, `core/src/components/name-switcher.js:214`, `plugins/plugins/core/node-management/node-management.src.js:95/105`, `plugins/plugins/core/q-chat/q-chat.src.js:309/1066`, `plugins/plugins/core/group-management/group-management.src.js:2436/2462/2512/2562/2611`, `plugins/plugins/core/components/qortal-info-view.js:986`, `plugins/plugins/core/components/ChatWelcomePage.js:43/185/188`, `plugins/plugins/core/components/NameMenu.js:241`, `core/src/components/user-info-view/user-info-view.js:1108`.
- "Note: the Core primary name is fixed; the UI will let you pick an active name later for display without changing your primary." in `plugins/plugins/core/name-registration/name-registration.src.js:162`.
- "Primary Name" heading/aria in `plugins/plugins/core/name-registration/name-registration.src.js:165/742`.
- "Additional Names" heading/aria in `plugins/plugins/core/name-registration/name-registration.src.js:167/754`.
- "Name cannot look like a QORT address" fallback in `plugins/plugins/core/name-registration/name-registration.src.js:120/722/725`.
- "Primary name cannot be sold while you have other names" title in `plugins/plugins/core/name-registration/name-registration.src.js:780`.
