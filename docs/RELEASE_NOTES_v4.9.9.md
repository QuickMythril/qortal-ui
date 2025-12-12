# Qortal UI v4.9.9 (pre-release)

## Overview
- First community-maintained pre-release, bringing Qortal UI back to daily usability while v5.0.0 finalizes.
- You’ll notice smoother names/identity handling, safer public-node usage, a refreshed chat experience, and a more capable home/sidebar.
- Note: This update was very broad in scope and these notes may not capture every change perfectly.
- Thanks to the Qortal community for the support, feedback, and motivation to keep the Qortal UI evolving.

## Names & Identity
- Your primary/active name now shows up consistently everywhere—login, chat, trading, publishing, and tips—without you having to re-pick it.
- Registration and publish flows guide you with clearer validation, so you select names you own and see helpful errors when something’s off.
- You can quickly switch between primary/active/all names in dropdowns and the name switcher, with smart defaults and localized labels.
- Wallet, chat, and profile views favor your active/primary name and fall back gracefully if you don’t have one yet.

## Public Node Support
- You can point the UI at a public node and see its label/URL clearly in the picker and tooltips.
- Sensitive actions stay blocked on public nodes (lists, hosted data, cross-chain, ARRR wallet, minting), while read-only info and status remain available.
- Warnings and badges remind you when you’re on a public node, and admin/minting UIs stay hidden or read-only so you don’t trigger blocked actions.

## Chat Experience
- You can add emoji reactions to messages and see them update instantly, even while messages stream in.
- Chats load more reliably with smoother scrolling, better threading, cleaner reply previews, and fewer duplicate or missing messages.
- Images, video embeds, and Qortal links render cleanly and stay clickable; attachments follow the current theme.
- Private and group chats handle keys and encryption more safely so sends and decrypts stay stable.
- Inline loading, steadier selection, and guarded modals make the chat flow feel calmer (including low-balance confirmations when needed).

## Sidebar, Home, and Promotions
- Your sidebar lock/toggle choice now sticks, and the top layout is cleaner.
- You can drag, reorder, and group pinned tiles into folders with better sizing and previews.
- Group promotions are easier to browse with improved layouts, scrolling, and a quick reopen button; external links are guarded and routed safely.
- The home view comes with default Q-Apps and sends external links to your system browser when that makes sense.

## Wallet & Transactions
- Wallet lists stay stable with fixed rows and refresh correctly when you toggle names.
- Saved wallets can be reordered with clearer, aligned controls.

## UI Polish & Branding
- You’ll see updated Qortal UI branding (v5 logo), tweakable login backgrounds, and more consistent avatars across the app.
- Folder dialogs, tooltips, and icons got cleanup passes; the window title now shows the UI version.

## Docs & Localization
- More strings are localized (names, tooltips, public-node messaging), with fallbacks so you don’t get stuck on missing translations.
- Documentation reflects the new repo location and community-maintained status.

## Stability & Tooling
- Behind the scenes, more automated tests, linting, and build improvements reduce breakage and keep the app responsive.

## Closing Notes
- This pre-release is meant to give you a working, modernized Qortal UI while v5.0.0 finalizes.
- Community feedback remains central—please share issues and suggestions so we can keep improving quickly.
- Need help, want to report a bug, or share feedback?
  - Q-Chat: qortal://use-group/action-join/groupid-902
  - Nextcloud: https://cloud.qortal.org/call/sjksvbyv
  - GitHub: https://github.com/Qortal-Community/qortal-ui/issues
- Download: https://github.com/Qortal-Community/qortal-ui/releases
