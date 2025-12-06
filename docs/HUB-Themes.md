## Qortal Hub – themes (develop)

### Theme architecture
- MUI ThemeProvider is wrapped by a custom context (`src/components/Theme/ThemeContext.tsx`) that manages `themeMode` (`light`/`dark`), `userThemes`, and `currentThemeId`.
- Default theme id `default` uses `theme-light.ts` and `theme-dark.ts` palette values. Settings persist to `localStorage` under `saved_ui_theme` (stores mode, `userThemes`, and `currentThemeId`). Initial default mode is `dark`.
- The active palette is merged into MUI via `createTheme({ ...baseThemeOptions, palette })`, where `baseThemeOptions` comes from `theme-light.ts` or `theme-dark.ts` (typography, spacing, component overrides).
- CssBaseline overrides in light/dark set CSS vars for non-MUI CSS: `--primary-main`, `--text-primary`, `--text-secondary`, `--background-default`, `--background-paper`, `--background-surface`, plus `--Mail-Background`, `--bg-primary`, `--bg-2`, `--videoplayer-bg`, and custom scrollbars.
- Theme toggle: `ThemeSelector` (App header) calls `toggleTheme`. `AppViewer` passes `theme=<mode>` to iframe apps and sends a `THEME_CHANGED` postMessage on change.

### Default palette tokens
- **Light palette (`theme-light.ts`)**  
  - primary: main `rgba(0, 133, 255, 1)`, dark `rgb(113, 198, 212)`, light `rgb(180, 200, 235)`  
  - secondary: main `rgb(69, 173, 255)`  
  - background: default `rgba(250, 250, 250, 1)`, surface `rgb(240, 240, 240)`, paper `rgb(220, 220, 220)`  
  - text: primary `rgba(0, 0, 0, 0.87)`, secondary `rgba(0, 0, 0, 0.6)`  
  - border: main `rgba(0, 0, 0, 0.12)`, subtle `rgba(0, 0, 0, 0.08)`  
  - other: positive `rgb(94, 176, 73)`, danger `rgb(177, 70, 70)`, unread `rgb(66, 151, 226)`  
  - CssBaseline vars: `--Mail-Background rgba(49, 51, 56, 1)`, `--bg-primary rgba(31, 32, 35, 1)`, `--bg-2 rgba(39, 40, 44, 1)`, `--videoplayer-bg rgba(31, 32, 35, 1)`
- **Dark palette (`theme-dark.ts`)**  
  - primary: main `rgb(100, 155, 240)`, dark `rgb(45, 92, 201)`, light `rgb(130, 185, 255)`  
  - secondary: main `rgb(69, 173, 255)`  
  - background: default `rgb(49, 51, 56)`, surface `rgb(58, 60, 65)`, paper `rgb(77, 80, 85)`  
  - text: primary `rgb(255, 255, 255)`, secondary `rgb(179, 179, 179)`  
  - border: main `rgba(255, 255, 255, 0.12)`, subtle `rgba(255, 255, 255, 0.08)`  
  - other: positive `rgb(94, 176, 73)`, danger `rgb(177, 70, 70)`, unread `rgb(66, 151, 226)`  
  - CssBaseline vars: `--Mail-Background rgba(6, 10, 30, 1)`, `--bg-primary rgba(6, 10, 30, 1)`, `--bg-2 rgb(39, 40, 44)`, `--videoplayer-bg rgba(31, 32, 35, 1)`
- Theme extensions (`src/styles/theme.d.ts`): palette gains `border.main/subtle`, `other.positive/danger/unread`, and `background.surface`.

### Custom themes (Theme Manager)
- UI: `ThemeManager` (shown in Group Settings when dev mode enabled) lets users add, edit, delete, import, export, and apply themes. Uses @uiw/react-color Sketch pickers with dark styling from `styles/themeManager.css`.
- Stored theme shape per mode: `{ mode: 'light'|'dark', primary:{main,dark,light}, secondary:{main}, background:{default,paper,surface}, text:{primary,secondary}, border:{main,subtle}, other:{positive,danger,unread} }`. Root object adds `{ id, name, light, dark }`. `id: 'default'` is reserved.
- Validation (`validateTheme`) requires both `light` and `dark` objects with the above keys and matching `mode` fields.
- Export drops `id` and writes `ui_theme_<name>.json`; import reads JSON, validates, assigns a new id, and applies it. Themes persist in `saved_ui_theme`.

### Theme application in UI
- Most components use `useTheme()` or styled components to consume `theme.palette.*` (background/text/primary/secondary/other). Common containers and buttons styled in `src/styles/App-styles.ts` rely on theme palette values.
- Non-MUI CSS uses the CssBaseline vars: `PdfViewer` and `VideoPlayer` use `--Mail-Background`/`--videoplayer-bg`; `CoreSyncStatus.css` uses `--bg-2`.
- QDN iframe apps receive the current mode via query params and postMessage (`THEME_CHANGED`).

### Hardcoded colors / non-themable spots (examples)
- `CoreSyncStatus.css`: light tooltip uses `#f1f1f1`/`#000000`, dark tooltip uses `var(--bg-2)` but border `var(--black)`; box-shadow uses fixed rgba.
- `ReactionPicker.css`: dark theme class sets `--epr-emoji-size` only; no palette linkage.
- `App-styles.ts`: some hover states fall back to `#fff` for icon fill and box shadows are fixed; `CustomButtonAccept` defaults to `customColor || '#fff'`.
- Many components include inline literal colors (e.g., `red` mute state in `ContextMenu.tsx`, fixed opacity black shadows, rgb(...) backgrounds). These do not respond to custom palettes without refactors.

### Notes/coverage
- Theme toggle and custom themes affect MUI palette consumers and any CSS using the exported vars; hardcoded colors remain unchanged.
- Default mode is dark; theme settings survive reload via localStorage.
- No evidence of legacy/unused theme files beyond the light/dark/common/themeManager styles; reaction/core CSS contain some fixed colors that may need audit if full theming is required.
