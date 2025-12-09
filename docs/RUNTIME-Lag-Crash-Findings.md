# Runtime Lag & Crash Findings (Q-Chat focus)

Working notes from runtime forensics; no code edits made yet.

## What was inspected
- Electron runtime logs in `~/.config/qortal-ui/logs/{qortal-ui.log,main.log}`.
- Crashpad directory `~/.config/qortal-ui/Crashpad` (currently only `client_id` and `settings.dat`, no minidumps).
- Observed running local Qortal Core (`qortal.jar` Java process).

## Key findings
- Q-Chat throws repeated runtime errors that likely break renders when switching groups:
  - `TypeError: translate is not a function` (`plugin/core/q-chat/q-chat.js`, multiple times on 2024-12-08).
  - `TypeError: Cannot read properties of null (reading 'sender')`.
  - Earlier runs (2024-09-01) show `Cannot read properties of undefined (reading 'name')`, `n.map is not a function`, `e.sort is not a function`.
  - These unhandled promise errors can stop UI updates and explain the white-screen/blank render during group switches.
- Recurrent warnings/noise:
  - “Unable to generate API key” during init.
  - “Stream with name side_effect_action already exists! Returning it instead” from worker init.
  - GPU warnings: `dri3 extension not supported` (no fatal GPU crash evidence).
  - Trade route logs Redux error #14 and asset/font fetch failures (separate from Q-Chat but noisy).
- Crash artifacts are not being written (Crashpad has no completed dumps), so renderer crashes aren’t captured yet.

## Immediate next profiling actions
- Launch with remote debugging to capture performance + memory during group/message switches:  
  `ELECTRON_ENABLE_LOGGING=1 ELECTRON_DEBUGGER_PORT=9222 npm run start-electron -- --remote-debugging-port=9222`
- From Chrome DevTools (attach to `localhost:9222`):
  - Record Performance trace while switching groups and loading history.
  - Take Memory snapshot to check for leaks when switching groups repeatedly.
  - Capture Network timings to see request/parse latency and payload sizes.
- After any crash, check `~/.config/qortal-ui/Crashpad/completed`; if still empty, we should enable/verify crash dump writing to get renderer crash evidence.
- Automated trace capture: once the app is running with `--remote-debugging-port=9222`, you can run  
  `npm install --no-save chrome-remote-interface` (once), then  
  `node scripts/record-cdp-trace.js --trace ./trace.json --heap ./heap.heapsnapshot --duration 20000`  
  - Optional: add `--wait` if you want the script to *start* tracing only after you press Enter (useful to navigate to Q-Chat before capturing).  
  - While tracing, switch groups/messages, then hit Enter to stop (or it auto-stops after 20s).

## Trace snapshot (2025-12-09 run 1)
- 20s capture ended when the first group loaded. Main-thread time dominated by a 3.9s `HandlePostMessage` handling a worker message (`build/worker.js` onmessage `R.f.onmessage`), consistent with the bcrypt/asmcrypto KDF worker (likely login/API-key derivation). This causes an initial UI freeze but is not chat-specific.
- Other long tasks: `connect-mixin` and `vaadin-grid` `connectedCallback` + layout/reflow up to ~270ms/200ms during initial route load; no clear chat hot path captured yet.
- Next step: run another trace with `--wait`, start tracing only after you’re on the Q-Chat page, then click/switch groups to capture chat-specific jank.

## Trace snapshot (2025-12-09 run 2 – chat focus)
- Capture span ~20s starting after navigating to Q-Chat (trace file `trace.json`, size ~71MB).
- Main thread (renderer) heavy hitters:
  - `HandlePostMessage`: 3.9s total; longest single event 3.9s. Still likely worker message handling, but happening during chat view.
  - `FunctionCall` time (4.4s total) mostly in `plugin/core/q-chat/q-chat.js`:
    - `_onCaptureFocus` at line ~18267: 766ms in a single call (overlay focus manager).
    - Anonymous function at line ~20152: 601ms single call (needs source mapping; likely chat overlay/scroll handler).
    - Multiple `connectedCallback` calls at line ~14685: 40–90ms each, repeated (chat components mounting).
  - GC pressure: ~6.1s of GC on the main thread in 20s (major + incremental), indicating heavy short-lived allocations when entering chat/switching.
  - ParseHTML: ~1.4s; Layout/Paint modest (~370ms layout, 270ms paint).
- Interpretation:
  - Chat view is allocating heavily on entry, triggering GC and long synchronous handlers in `q-chat.js`. The focus handler and an anonymous routine near 20152 are long tasks (>0.5s) and likely tied to overlay/focus management or bulk DOM work.
  - The prior worker KDF spike still appears (HandlePostMessage), but the dominant chat jank is now from renderer-side work and GC.
- Next trace ask: once we reduce allocations (virtualize message/head lists, memoize render payloads, kill cache-clearing timers), rerun to confirm GC drop and removal of 500ms+ function calls in `q-chat.js`.

## Code-path lag/crash suspects (latest audit)
- Heavy render path in message list: each `message-template` parses message JSON, runs TipTap `generateHTML`, traverses DOM to rewrite links, and scans for embeds during every render (`plugins/plugins/core/components/ChatScroller.js:1042-1174`). Any prop change causes this work for all visible messages; likely source of UI jank on chat open/group switch. Quick win: precompute/memoize render-safe HTML in `processMessages` and avoid repeating per-render work; consider list virtualization.
- Aggressive cache clearing: both the chat shell and the scroller clear Electron cache every 60s (`plugins/plugins/core/q-chat/q-chat.src.js:489-493,834-840`; `plugins/plugins/core/components/ChatScroller.js:317-321,753-757,2368-2373`). Blocking IPC/disk calls on the UI thread can stall or crash the renderer. Quick win: remove the timers; only clear cache on demand.
- Group key download/decrypt blocks render: group selection triggers synchronous fetch/sort/download/decrypt of symmetric keys on the main thread before rendering the chat (`plugins/plugins/core/q-chat/q-chat.src.js:598-692`). Multiple network requests, localStorage writes, and NaCl decrypt run inline, delaying navigation and risking crashes. Quick win: move to a worker and cache per-group keys; set `activeChatHeadUrl` immediately and load keys asynchronously.
- Chat head list churn: building chat heads fetches `/groups/*` and `/names/*` for each head on every update and renders via `.map` with no stable keys (`plugins/plugins/core/q-chat/q-chat.src.js:1279-1315,1211-1214`; `plugins/plugins/core/components/ChatHead.js:37-119,214-239`). Avatar fetch retry loops plus full re-render of large lists can spike network/CPU when switching chats. Quick win: cache metadata per group, bind objects directly (avoid JSON string props), and virtualize the head list.
- WebSocket reconnection loops: direct/group sockets auto-restart after close/error with no disposal guard (`plugins/plugins/core/components/ChatPage.js:2705-2736,2829-2834`). If the component unmounts or chatId changes, orphan sockets can keep reconnecting and delivering messages to a dead view, wasting CPU/memory and risking instability. Quick win: add a disposed/abort flag and ensure only one live socket per chat; close without restart on unmount.

## Fix sketches and additional quick wins
- Message render hotspots (`ChatScroller.js:1042-1185`): Pre-decode/HTML-generate messages inside `processMessages` before state updates, cache by signature, and pass render-ready strings/nodes to `message-template`; avoid re-running TipTap/JSON.parse per render. Complexity: medium (refactor data shape); risk: low if gated by feature flag.
- Cache-clearing timers (`q-chat.src.js:489-493,834-840` and `ChatScroller.js:317-321,753-757,2368-2373`): Remove intervals or gate behind a manual menu action; ensure single cache clear via main process when requested. Complexity: low; risk: low.
- Blocking group key fetch/decrypt (`q-chat.src.js:598-692`): Move fetch/decrypt to a dedicated worker (reuse existing worker infra), cache decrypted keys per group in memory/localStorage, and set `activeChatHeadUrl` immediately while showing a loading state. Complexity: medium; risk: medium around crypto edge cases—needs validation of key freshness.
- Chat head churn (`q-chat.src.js:1211-1315` and `ChatHead.js:37-119,214-239`): Cache ownerName/isOpen results; pass objects via property bindings (avoid JSON.stringify); add stable `key`/`id` props; virtualize the list (see below). Complexity: medium; risk: low.
- WebSocket reconnect guard (`ChatPage.js:2705-2834`): Track a `disposed`/`currentChatId` token and skip restart in `onclose/onerror` when unmounted or chatId changes; clear ping timeouts; close socket in `disconnectedCallback`. Complexity: low-medium; risk: low.
- Virtualization absence: Message list is a plain `<ul>` (`ChatScroller.js:134-208`) and chat heads map directly (`q-chat.src.js:1211-1214`). Insert a virtualizer (e.g., `@lit-labs/virtualizer`) around the message groups in `ChatScroller.render` and around chat heads in `renderChatHead`. Complexity: medium; risk: UI polish (scroll behavior) needs testing.
- Memoization/state churn: `message-template` re-parses every render because `messagesToRender` replaces objects; selectors/memoization are absent. Stabilize message objects and memoize per-signature render payloads in `processMessages`; limit `shouldUpdate` to keys that matter (avoid re-render on every `messageQueue` tick) (`ChatScroller.js:667-740`). Complexity: medium; risk: low if guarded.
- Unguarded listeners/intervals: Storage/contextmenu listeners in `q-chat.src.js:408-440`, `ChatPage.js:835-851`, `ChatScroller.js:285-321`, `ChatScroller.js:2021-2050`, and message-level storage listener in `message-template` lack cleanup. Add removals in `disconnectedCallback`/`disconnected` hooks and clear cache intervals. Complexity: low; risk: low.
- Blocking work on main thread: JSON.parse of large messages in `message-template` (`ChatScroller.js:1068-1175`), repeated Base64 decode/decrypt in `processMessages` (worker handles decode, but render still parses), and localStorage JSON reads in hot paths (`ChatPage.js:835-851`). Offload remaining parsing to workers and cache parsed payloads. Complexity: medium; risk: low.
- Error boundary gap: No boundary around chat components. Wrap `q-chat` root or `chat-page` host with a Lit-based error boundary (e.g., a wrapper custom element that catches `error` events/try-catch render) in `plugins/plugins/core/q-chat/index.html` or `q-chat.src.js` host render. Complexity: low; risk: low—prevents white screen on render exceptions.

## Unknowns/assumptions to validate
- Measure message payload sizes to ensure worker offload covers all heavy decode; if very large, virtualization priority increases.
- Verify whether removing cache clears impacts any existing troubleshooting workflows.
- Confirm worker-based key decrypt still meets security expectations and doesn’t require main-thread-only APIs.

## Trace-to-source mapping (heavy frames) and refactors
- `_onCaptureFocus` (~18267 in compiled `q-chat.js`): Polymer overlay manager focus trap from paper-dialog; triggered by our dialogs in `q-chat.src.js` (dialogs ~240-520, 910-1180) and `ChatScroller.js` (delete dialogs ~2160-2330). Refactor: render dialogs conditionally only when open, reuse a single dialog instance, avoid overlapping backdrops when not needed. Complexity: low-medium; risk: low.
- Anonymous function (~20152 in compiled `q-chat.js`): Click handler in `ChatSearchResults.js:47-51` (`@click` does `shadowRoot.querySelector('.chat-result-card').classList.add('active')`). Refactor: remove shadowRoot query; use event target or data state to mark active; add stable keys on results. Complexity: low; risk: low.
- `connectedCallback` (~14685 in compiled `q-chat.js`): `Chat` connectedCallback in `q-chat.src.js:733-802`; eagerly waits for child editors/modals and instantiates TipTap editor, reads localStorage, and subscribes to Redux immediately. Refactor: lazy-init editor on first chat open/input; avoid awaiting `getUpdateCompleteTextEditor` on connect; cache `symKeysCurrent` outside hot path; ensure unsubscribe on teardown. Complexity: medium; risk: low-medium (ensure consumers handle lazy editor).
- Additional heavy loops/allocations nearby: `setChatHeads` (`q-chat.src.js:1279-1315`) fetches owner/isOpen per head every update—cache/memoize; dialogs rendered in tree create multiple overlays—render only when open; `ChatSearchResults` maps without keys and allocates handlers per render—memoize results and add keys.
