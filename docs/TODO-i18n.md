## TODO: i18n coverage and cleanup

- [ ] Audit recent UI changes for hardcoded strings (Names flow, publish modal, chat tweaks, theme picker, notifications).
- [ ] Add any missing keys to `locales/en.json`; mirror keys across other locale files with English fallbacks until translations arrive.
- [ ] Replace inline literals with existing helpers (`translate`, `get`) in components and functional templates.
- [ ] Verify locale switching still works in main surfaces (dashboard, chat, wallet, publish modal, name switcher).
- [ ] Add a lightweight check to catch missing keys during CI or dev builds (e.g., dev warning or script that scans for untranslated text patterns).
- [ ] Update contributor guidance on adding strings to ensure new UI copy lands in `locales/en.json` first.

## Harcoded strings

## Translation sequencing (per string)

English → German → Dutch → Norwegian → French → Spanish → Portuguese → Italian → Romanian → Russian → Polish → Serbian → Croatian → Finnish → Estonian → Hungarian → Hindi → Chinese (Simplified) → Chinese (Traditional) → Japanese → Korean
