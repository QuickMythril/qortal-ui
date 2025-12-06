## Qortal UI – themes (working)

### Theme architecture
- Two built-in modes only: `light` and `dark`. No custom theme manager/import/export.
- Theme state is stored in `localStorage` under `qortalTheme`; default is `light` if not set. The HTML root gets `theme="light"` or `theme="dark"` (set in `core/public/index.html` on load and by the theme toggle components).
- Theme toggles:
  - `core/src/components/theme-toggle.js` (icon buttons) and `core/src/components/qort-theme-toggle.js` (switch) both flip `qortalTheme`, dispatch a `qort-theme-change` event (unused elsewhere), and call `document.querySelector('html').setAttribute('theme', this.theme)`.
  - Many components read `localStorage.getItem('qortalTheme')` into `this.theme` for internal styling but rely on the global CSS vars for actual coloring.
- Styles are driven by CSS variables defined in `core/font/switch-theme.css`; components and shared styles use these vars (e.g., `var(--black)`, `var(--mdc-theme-primary)`).

### Default palette variables
Defined in `core/font/switch-theme.css`. Key vars per mode:

- **Light (html)**  
  `--white #ffffff`  
  `--black #080808`  
  `--gray #c8c8c8`, `--graylight #bbbbbb`  
  `--plugback #ffffff` (page bg)  
  `--border #d0d6de`, `--border2 #dde2e8`, `--border3 #080808`  
  `--copybutton #707584`  
  `--chat-group #080808`  
  `--chat-bubble #9f9f9f0a`, `--chat-bubble-bg #e6e6e6`, `--chat-bubble-myBg #d1ddf2`, `--chat-bubble-msg-color #080808`  
  `--reaction-bubble-outline #6b6969`  
  `--chat-menu-bg #ffffff`, `--chat-menu-outline #dad9d9`, `--chat-menu-icon #3b3b3c`, `--chat-menu-icon-hover #dad9d9`  
  `--block-user-bg-hover #dad9d9`  
  `--paperclip-icon #494949`  
  `--sectxt #576374`, `--vdicon #707b8a`  
  Trade/inputs: `--tradehead #6a6c75`, `--tradeborder #666666`, `--tradehave #555555`, `--txtfieldborder #666666`, `--txtfieldhoverborder #00000` (typo?)  
  `--relaynodetxt #646464`  
  Menu/nav: `--menuhover #eeeeee`, `--menuactive #ebebeb`, `--menuactivergb 235, 235, 235`, `--mainmenutext #080808`, `--mainmenutexthover #080808`, `--switchbackground #666666`, `--switchborder #333333`, `--sidetopbar #ffffff`, `--nav-selected-color #dddddd`, `--nav-selected-color-text #333333`, `--nav-color-active #d1d1d1`, `--nav-color-hover #eeeeee`, `--nav-text-color #080808`, `--nav-icon-color #080808`, `--nav-border-color #eeeeee`, `--nav-border-selected-color #03a9f4`  
  Alerts/buttons: `--error #d50000`, `--login-border rgba(0, 167, 245)`, `--login-border-50pct rgba(0, 167, 245, 0.5)`, `--login-border-10pct rgba(0, 167, 245, 0.1)`, `--login-button rgb(3, 169, 244)`, `--general-color-blue #03a9f4`, `--qchat-name #03a9f4`, `--qchat-my-name #05be0e`  
  Backgrounds: `--background url("/img/qortal_background_light_.jpg")`, `--chatHeadBg #ebebeb`, `--chatHeadBgActive #ebebeb`, `--chatHeadText #080808`, `--chatHeadTextActive #080808`, `--lightChatHeadHover #1e1f201a`, `--group-header #929292`, `--group-drop-shadow rgb(17 17 26 / 10%) 0px 1px 0px`  
  Reactions/GIF UI: `--reactions-tooltip-bg #ffffff`, `--gifs-drop-shadow #32326926 0px 2px 5px 0px, #0000000d 0px 1px 1px 0px`, `--gif-tooltip-bg #dad7ef`, `--gif-search-icon-bs rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px`, `--gif-search-icon #ffffff`, `--gif-button-row-bg #eaeaef`, `--gif-button-row-color #464040`, `--gif-collection-hover-bg #eaeaefa3`  
  App tiles: `--app-background-1 #045de9`, `--app-background-2 #09c6f9`, `--app-icon #ffffff`, `--app-hr rgba(0, 0, 0, .3)`  
  Misc: `--code-block-text-color #008fd5`, `--noavatar url("/img/noavatar_light.png")`

- **Dark (html[theme="dark"])**  
  `--white #0f1a2e` (note inverted), `--black #c9d2d9`  
  `--gray #d8d8d8`, `--graylight #0b305e`  
  `--plugback #0f1a2e`  
  `--border #0b305e`, `--border2 #0b305e`, `--border3 #767676`  
  `--copybutton #d0d6de`  
  `--chat-group #ffffff`  
  `--chat-bubble #9694941a`, `--chat-bubble-bg #2d3749`, `--chat-bubble-myBg #40444d`, `--chat-bubble-msg-color #ffffff`  
  `--reaction-bubble-outline #ffffff`  
  `--chat-menu-bg #32394c`, `--chat-menu-outline #32394c`, `--chat-menu-icon #ffffff`, `--chat-menu-icon-hover #a49a9a36`  
  `--block-user-bg-hover #121a2f`  
  `--paperclip-icon #d0c9c9`  
  `--sectxt #bbc3cd`, `--vdicon #d0d6de`  
  Trade/inputs: `--tradehead #008fd5`, `--tradeborder #0b305e`, `--tradehave #dddddd`, `--txtfieldborder #0b305e`, `--txtfieldhoverborder #ffffff`  
  `--relaynodetxt #d4d4d4`  
  Menu/nav: `--menuhover #008fd5`, `--menuactive #008fd5`, `--menuactivergb 0, 143, 213`, `--mainmenutext #008fd5`, `--mainmenutexthover #0f1a2e`, `--switchbackground #eeeeee`, `--switchborder #03a9f4`, `--sidetopbar #070d19`, `--nav-selected-color #0f1a2e`, `--nav-selected-color-text #76c8f5`, `--nav-color-active #d1d1d1`, `--nav-color-hover #444444`, `--nav-text-color #008fd5`, `--nav-icon-color #008fd5`, `--nav-border-color #0b305e`, `--nav-border-selected-color #76c8f5`  
  Alerts/buttons: `--error #d50000`, `--login-border rgba(0, 167, 245)` (same as light), `--login-button rgb(3, 169, 244)`, `--general-color-blue #03a9f4`, `--qchat-name #03a9f4`, `--qchat-my-name #05be0e`  
  Backgrounds: `--background url("/img/qortal_background_dark_.jpg")`, `--chatHeadBg #008fd5`, `--chatHeadBgActive #0f1a2e`, `--chatHeadText #ffffff`, `--chatHeadTextActive #ffffff`, `--lightChatHeadHover #e0e1e31a`, `--group-header #c8c8c8`, `--group-drop-shadow rgb(191 191 191 / 32%) 0px 1px 0px`  
  Reactions/GIF UI: `--reactions-tooltip-bg #161515`, `--gifs-drop-shadow 0px 2px 2px 0px hsla(0, 0%, 0%, 0.14), 0px 3px 1px -2px hsla(0, 0%, 0%, 0.12), 0px 1px 5px 0px hsla(0, 0%, 0%, 0.2)`, `--gif-tooltip-bg #586b8d`, `--gif-search-icon-bs 0px 8px 10px 1px hsla(0, 0%, 0%, 0.14), 0px 3px 14px 2px hsla(0, 0%, 0%, 0.12), 0px 5px 5px -3px hsla(0, 0%, 0%, 0.2)`, `--gif-search-icon #586b8d`, `--gif-button-row-bg #82899c`, `--gif-button-row-color #151212`, `--gif-collection-hover-bg #ffffff26`  
  App tiles: `--app-background-1 #7f5a83`, `--app-background-2 #0d324d`, `--app-icon #03a9f4`, `--app-hr rgba(255, 255, 255, .3)`  
  Misc: `--code-block-text-color #008fd5`, `--noavatar url("/img/noavatar_dark.png")`

### How themes are applied
- Global CSS vars are consumed throughout `core/src/styles/core-css.js` and component styles (e.g., `var(--mdc-theme-primary)`, `var(--black)`, `var(--chat-bubble-bg)`, etc.). Many Polymer/Lit components read `this.theme` but rely on these vars for actual colors.
- `core/public/index.html` also defines scrollbar colors (`--scrollbarBG #a1a1a1`, `--thumbBG #6a6c75`) and sets `background: var(--plugback)` on html/body.
- Each plugin/feature page loads its own HTML shell (e.g., `plugins/plugins/core/*/index.html`) that reads `qortalTheme` and sets the `theme` attribute on `html`, so embedded plugin frames inherit the same CSS vars.

### Hardcoded colors / non-themable spots
- Numerous fixed colors remain in `core/src/styles/core-css.js` (e.g., `#f44336` error buttons, scrollbar colors `whitesmoke`, `rgb(180,176,176)`, hover backgrounds `#d7d7d75c`, etc.).
- Inline styles across plugin components use literal hex/rgb values (e.g., `#03a9f4`, `#f44336`, `whitesmoke`) alongside vars. These do not change with custom palettes beyond the two predefined themes.
- Background images are hardcoded per theme via `--background` URLs; changing palettes alone will not change these assets.
- No palette validation or custom theme import exists; only the two fixed sets in `switch-theme.css` are used.

### Notes
- Theme switching is purely CSS-variable based; there is no MUI or JS-driven palette computation in this UI.
- Because many colors are literals in CSS/JS and the variable set is large and bespoke, aligning with Hub’s custom-theme model would require mapping Hub palette fields to these vars and refactoring hardcoded colors.
