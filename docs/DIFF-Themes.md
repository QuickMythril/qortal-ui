## Themes: Hub vs UI (working vs develop)

### Architecture / scope
- Hub: MUI-based theming with a ThemeContext. Supports light/dark plus user-defined custom themes (stored in `saved_ui_theme`). Palette is a structured object (primary, secondary, background, text, border, other) per mode; merged into MUI and CssBaseline variables.
- UI: CSS-variable-only theming with two fixed modes (light/dark). No custom themes. Theme is `qortalTheme` in localStorage; `html[theme]` drives a large set of CSS vars from `core/font/switch-theme.css`.

### Toggle & propagation
- Hub: `ThemeSelector` toggles mode; ThemeContext wraps the app. Apps (iframes) get `theme=<mode>` in URLs and a `THEME_CHANGED` postMessage.
- UI: `theme-toggle` and `qort-theme-toggle` set `qortalTheme` and `html` attribute; plugin HTML shells also set `theme` on load. No app-level message bus; components just read CSS vars/localStorage.

### Palette definition
- Hub defaults (light/dark) are concise and typed (`theme-light.ts`, `theme-dark.ts`): primary/secondary, background (default/surface/paper), text (primary/secondary), border (main/subtle), other (positive/danger/unread). CssBaseline also sets a few custom vars (`--Mail-Background`, `--bg-primary`, `--bg-2`, `--videoplayer-bg`).
- UI palettes are broad CSS var sets in `switch-theme.css` (dozens of keys: chat, menu/nav, borders, GIF UI, app tiles, backgrounds, avatars, etc.) plus hardcoded background images. Variables differ per mode and are not typed or validated.

### Custom theme support
- Hub: ThemeManager UI (dev mode) can add/edit/delete/import/export themes; validation requires light/dark palettes with required keys. Custom themes persisted and selectable; palette applies across MUI + CssBaseline vars.
- UI: No custom theme manager; only two static palettes. No import/export or validation.

### Application to components
- Hub: Components consume `theme.palette.*` via MUI (styled/system) and a few CSS vars for specific parts (PDF/video player, CoreSyncStatus). Most colors flow from the palette; some inline literals remain.
- UI: Components rely on CSS vars directly (`var(--...)`), but many colors are hardcoded hex/rgb in CSS/JS (e.g., `#f44336`, `whitesmoke`, `#03a9f4`). Large bespoke var set must be kept in sync; literals ignore theme changes.

### Persistence
- Hub: `saved_ui_theme` stores mode, userThemes, currentThemeId.
- UI: `qortalTheme` stores mode only; palettes are static files.

### Gaps / incompatibilities
- No custom theme path in UI; Hub’s user-defined palettes cannot be applied without introducing a mapping layer or refactoring to a structured palette.
- Palette models differ: Hub has small typed palette; UI has many bespoke vars and background images. Direct mapping would require a translation table and replacing hardcoded colors.
- Hub uses MUI theming; UI is not MUI-based and depends on global CSS vars, so Hub palette updates won’t propagate without systematic variable alignment.
