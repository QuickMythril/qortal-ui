## Plan: align UI themes with Hub model (checklist)

- [ ] Define shared palette model
  - [ ] "Add Hub-style palette schema": Introduce a typed palette object (primary, secondary, background: default/paper/surface, text: primary/secondary, border: main/subtle, other: positive/danger/unread) in UI (TS/types or JS shape) to match Hub.
  - [ ] "Store themes + mode centrally": Add a ThemeContext/store (similar to Hub) to hold mode (light/dark), userThemes, currentThemeId, and persistence to localStorage (e.g., `saved_ui_theme`).

- [ ] Build palette→CSS variable mapping
  - [ ] "Map palette to existing CSS vars": Implement a mapping layer that derives all current `switch-theme.css` variables from the Hub-style palette, preserving existing UI color application. Open question: finalize the mapping table (which palette fields feed which vars).
  - [ ] "Generate Classic Light/Dark from mapping": Encode current UI light/dark colors as palette objects and feed them through the mapper to produce legacy var outputs.
  - [ ] "Add Hub Light/Dark defaults": Add Hub light/dark palettes and ensure the mapper produces the correct CSS vars for those as an additional default theme pair.

- [ ] Apply themes across UI
  - [ ] "Inject mapped CSS vars at runtime": Replace static `switch-theme.css` usage with runtime variable injection from the active mapped palette (while retaining `html[theme]` for compatibility).
  - [ ] "Ensure plugin shells pick up vars": Update plugin `index.html` loaders to consume the new ThemeContext output (still setting `theme` attr but also applying mapped vars).

- [ ] Replace hardcoded colors with tokens
  - [ ] "Audit and replace literals in core styles": Swap hardcoded colors in `core/src/styles/core-css.js` and related shared styles with mapped CSS vars. Open question: prioritize which literals to replace first.
  - [ ] "Audit and replace literals in plugins/components": Update inline hex/rgb in key plugins (chat, trade, wallet, q-apps, etc.) to use CSS vars, introducing new vars if needed and mapping them from the palette. Open question: finalize the first-pass list of components/colors to tackle.

- [ ] Theme manager UI (parity with Hub)
  - [ ] "Add ThemeManager component": Implement add/edit/delete/apply/import/export for palette objects (validate light/dark shapes).
  - [ ] "Wire ThemeManager to storage": Persist user themes and current selection; apply selected theme through the mapper to update vars.
  - [ ] "Update toggles to use ThemeContext": Point existing toggles (`theme-toggle`, `qort-theme-toggle`) to the new ThemeContext instead of directly mutating `localStorage`/`html`.

- [ ] Validation and tests
  - [ ] "Verify Classic vs Hub defaults": Confirm Classic Light/Dark render identically to current UI; Hub Light/Dark match Hub colors.
  - [ ] "Smoke test key flows": Chat, wallet, trade, QDN publish, notifications, and plugin shells respect active theme and custom themes.
  - [ ] "Custom theme import/export": Ensure ThemeManager can round-trip a theme JSON and reapply correctly.
