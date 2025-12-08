# Qortal Project UI

> **Status:** Original/legacy desktop interface for Qortal.
> The original developers no longer maintain Qortal UI, but it is now **maintained by community contributors** to keep it working with newer Qortal Core releases for users who still prefer this interface.

Please refer to the newer interfaces if you are a **new user** or want a more modern experience:

- **Qortal Hub (desktop app)** – https://github.com/Qortal/Qortal-Hub
- **Hosted Qortal Hub** – https://hub.qortal.link/
- **Qortal Go (mobile)** – https://github.com/Qortal/qortal-mobile
- **Hosted Qortal Go** – https://go.qortal.link

[![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/Qortal-Community/qortal-ui?label=latest%20version)](https://github.com/Qortal-Community/qortal-ui/releases/latest)
[![GitHub Releases](https://img.shields.io/github/downloads/Qortal-Community/qortal-ui/latest/total)](https://github.com/Qortal-Community/qortal-ui/releases/latest)
[![License](https://img.shields.io/badge/license-GPL--3.0-blue)](https://opensource.org/licenses/GPL-3.0)
[![Qortal Discord Invite](https://img.shields.io/discord/745037351163527189?color=%237289DA&label=Chat&logo=discord&logoColor=white)](https://discord.com/invite/54UyhB7)

Decentralizing The World

---

## What is Qortal UI?

Qortal UI is the **original Electron-based desktop interface** for the Qortal blockchain.
It connects to a local Qortal Core node and provides access to:

- Qortal **wallet** (balances and transactions)
- **QDN** content and Q-Apps
- **Q-Chat** messaging
- The **Trade Portal** for decentralized trading
- **Minting** and node tools

Mainline development has moved to **Qortal Hub** and **Qortal Go**, but this repository is:

- Maintained by the **community** on a best-effort basis
- Updated as needed to keep compatibility with **new Qortal Core versions**
- Intended for users who prefer the original UI and local-node workflow

New major features are unlikely; most changes will be **bugfixes and compatibility updates**.

---

## Other Qortal Interfaces

If you are not specifically looking for the legacy desktop UI, you may want one of these instead:

- **Qortal Hub (desktop)** – actively developed, feature-rich desktop app
  - Repo: https://github.com/Qortal/Qortal-Hub
  - Hosted: https://hub.qortal.link/

- **Qortal Go (mobile)** – Android-focused interface
  - Repo: https://github.com/Qortal/qortal-mobile
  - Hosted: https://go.qortal.link

These are recommended for **new users** and for those who do not specifically need the original Qortal UI.

---

## Requirements

Qortal UI is designed primarily to be used with a running Qortal Core node, but supports connecting to publicly accessible nodes hosted by private individuals or organizations.

You will need:

- **Qortal Core** recommended running locally (see the Qortal Core repo for setup)
- **Node.js** (currently recommended: v20.16.0, LTS “Iron”, supported by Electron v32)
- **npm** (currently recommended: npm 10.9.2 or later)

### Installing Node.js and npm via nvm (Linux)

The easiest way to install the required versions on Linux is via **nvm**:

```bash
sudo apt update && sudo apt install curl -y
sudo rm -rf ~/.nvm      # Only if you need to update an existing nvm install
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.profile       # For Debian-based distros
# or
source ~/.bashrc        # For Fedora / CentOS

nvm ls-remote           # List available Node versions
nvm install v20.16.0    # Install recommended Node version (LTS: Iron)
npm --location=global install npm@10.9.2
````

Verify your installation:

```bash
node --version
npm --version
```

If you have an older npm installation, update it:

```bash
npm update -g
```

> Note: You can also install Node via your distro’s package manager or build from ports; adjust paths and versions as needed.

---

## Building and Running Qortal UI from Source

These instructions assume a Linux-like environment.

### 1. Clone the repository

```bash
git clone https://github.com/Qortal-Community/qortal-ui.git
cd qortal-ui
```

### 2. Install dependencies

```bash
npm install
```

### 3. Build the UI

Build the UI server bundle and static files:

```bash
npm run build
```

---

## Running Qortal UI

You can run Qortal UI either as a browser-served app or as an Electron desktop app.

### Option A – Start the UI server (preferred)

This runs a local HTTP server that serves the UI.

```bash
npm run server &
```

The `&` puts the UI server in the background.
Check the console output for the listening address/port (commonly on localhost).

### Option B – Run the Electron app

This launches the Electron-based desktop UI:

```bash
npm run start-electron
```

> Ensure your **Qortal Core node** is running and reachable before starting the UI, otherwise some features will not work.

---

## Build Script (Unix-like systems)

To automate the build and run workflow, you can use the `build.sh` script from the project root.

Available options:

* `-s` – run the UI server after build
* `-e` – run the Electron app after build
* `-w` – use `npm run watch` instead of `npm run build` for hot swapping
* `-h` – show help

**Example:** build and start the UI server:

```bash
./build.sh -s
```

---

## Project Status, Issues & Contributions

* This repo is now **community-maintained**.
* The goal is to keep Qortal UI **working with new Qortal Core versions** and fix bugs, not to add large new features.
* If you encounter issues:

  * Check the existing issues on GitHub.
  * Open a new issue with as much detail as possible (Core version, OS, steps to reproduce).
* Contributions (bug fixes, compatibility changes, small UX improvements) are welcome:

  * Fork the repo.
  * Create a branch with your changes.
  * Submit a pull request with a clear description and, if possible, references to relevant Core/API changes.

Please keep changes focused and backwards‑compatible where possible, to avoid breaking workflows for users who still depend on this UI.

---

## License

Qortal UI is released under the **GNU General Public License v3.0 (GPL‑3.0)**.
See the [LICENSE](https://opensource.org/licenses/GPL-3.0) file for details.
