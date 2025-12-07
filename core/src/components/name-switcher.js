import { html, css, LitElement } from 'lit'
import { connect } from 'pwa-helpers'
import { store } from '../store'
import { pickDisplayName, pickDisplayNameOrAddress, pickAddress } from '../utils/name'
import { doUpdateAccountInfo as doUpdateAppAccountInfo } from '../redux/app/app-actions'
import { doUpdateAccountInfo as doUpdateUserAccountInfo } from '../redux/user/actions/update-account-info'
import { translate } from '../../translate'
import '@material/mwc-icon'
import '@material/mwc-menu'
import '@material/mwc-list/mwc-list-item.js'

class NameSwitcher extends connect(store)(LitElement) {
	static get properties() {
		return {
			accountInfo: { type: Object },
			nodeConfig: { type: Object },
			isMenuOpen: { type: Boolean }
		}
	}

	static get styles() {
		return css`
			:host {
				display: inline-block;
			}

			.anchor {
				position: relative;
			}

			.switcher {
				display: flex;
				align-items: center;
				gap: 8px;
				padding: 6px 10px;
				border-radius: 6px;
				cursor: pointer;
				user-select: none;
				color: var(--black);
				background: var(--white);
				border: 1px solid var(--qortal-border, #ddd);
			}

			.switcher:hover {
				border-color: var(--mdc-theme-primary, #4caf50);
			}

			.avatar {
				width: 28px;
				height: 28px;
				border-radius: 50%;
				overflow: hidden;
				display: flex;
				align-items: center;
				justify-content: center;
				background: transparent;
			}

			.avatar img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}

			.name {
				font-size: 14px;
				font-weight: 500;
				max-width: 180px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			mwc-menu {
				--mdc-menu-max-height: 60vh;
				--mdc-menu-min-width: 220px;
				--mdc-theme-surface: var(--sidetopbar);
				--mdc-theme-on-surface: var(--black);
				color: var(--black);
				background: var(--sidetopbar);
				--mdc-list-side-padding: 12px;
				--mdc-list-item-graphic-margin: 12px;
			}

			.list-name {
				display: flex;
				align-items: center;
				gap: 10px;
				color: var(--black);
				--mdc-ripple-color: var(--mdc-theme-primary, #4caf50);
				--mdc-ripple-press-opacity: 0.18;
				--mdc-ripple-hover-opacity: 0.12;
				--mdc-ripple-focus-opacity: 0.16;
			}

			.list-name-row {
				display: flex;
				align-items: center;
				gap: 10px;
			}

			.list-avatar {
				width: 24px;
				height: 24px;
				border-radius: 50%;
				overflow: hidden;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.list-avatar img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}

			.check-icon {
				margin-left: auto;
				color: var(--mdc-theme-primary, #4caf50);
			}
		`
	}

	constructor() {
		super()
		this.accountInfo = {}
		this.nodeConfig = {}
		this.isMenuOpen = false
	}

	stateChanged(state) {
		this.accountInfo = state.app.accountInfo || {}
		this.nodeConfig = state.app.nodeConfig || {}
	}

	get displayName() {
		return pickDisplayNameOrAddress(this.accountInfo)
	}

	get activeAvatarUrl() {
		const name = pickDisplayName(this.accountInfo)
		if (!name) return ''

		const node = this.nodeConfig?.knownNodes?.[this.nodeConfig?.node]
		if (!node) return ''

		return `${node.protocol}://${node.domain}:${node.port}/arbitrary/THUMBNAIL/${name}/qortal_avatar?async=true`
	}

	get namesList() {
		const allNames = Array.isArray(this.accountInfo?.allNames) ? this.accountInfo.allNames : []

		if (!allNames.length) return []

		return [...allNames]
	}

	openMenu() {
		const menu = this.shadowRoot.getElementById('name-menu')
		const anchor = this.shadowRoot.getElementById('switcher-button')
		if (!menu) return
		if (anchor) {
			menu.anchorElement = anchor
		}
		menu.open = true
	}

	handleSelect(name) {
		if (!name) return

		const nextAccountInfo = {
			...this.accountInfo,
			activeName: name,
			name
		}

		store.dispatch(doUpdateAppAccountInfo(nextAccountInfo))
		store.dispatch(doUpdateUserAccountInfo(nextAccountInfo))
	}

	renderAvatar(url) {
		if (url) {
			return html`<img src="${url}" @error=${(e) => this.handleAvatarError(e)} />`
		}

		return html`<mwc-icon>person</mwc-icon>`
	}

	handleAvatarError(e) {
		try {
			const icon = document.createElement('mwc-icon')
			icon.textContent = 'person'
			e.target.replaceWith(icon)
		} catch (err) {
			// Silent fallback
		}
	}

	render() {
		return html`
			<div class="anchor">
				<div class="switcher" id="switcher-button" @click=${() => this.openMenu()}>
					<div class="avatar">
						${this.renderAvatar(this.activeAvatarUrl)}
					</div>
					<div class="name">${this.displayName}</div>
				</div>

				<mwc-menu
					id="name-menu"
					@closed=${() => { this.isMenuOpen = false }}
				>
						${this.namesList.length === 0 ? html`
							<mwc-list-item disabled>${pickAddress(this.accountInfo) || translate('general.noRegisteredName')}</mwc-list-item>
						` : this.namesList.map((entry) => html`
							<mwc-list-item
								class="list-name"
								?selected=${entry?.name === this.accountInfo?.activeName}
								@click=${() => this.handleSelect(entry?.name)}
							>
								<span class="list-name-row">
									<span class="list-avatar">
										${entry?.name ? this.renderAvatar(this.avatarUrlFor(entry.name)) : html`<mwc-icon>account_circle</mwc-icon>`}
									</span>
									<span>${entry?.name || ''}</span>
									${entry?.name === this.accountInfo?.activeName ? html`
										<mwc-icon class="check-icon">check</mwc-icon>
									` : null}
								</span>
							</mwc-list-item>
						`)}
					</mwc-menu>
			</div>
		`
	}

	avatarUrlFor(name) {
		const node = this.nodeConfig?.knownNodes?.[this.nodeConfig?.node]
		if (!node || !name) return ''
		return `${node.protocol}://${node.domain}:${node.port}/arbitrary/THUMBNAIL/${name}/qortal_avatar?async=true`
	}
}

window.customElements.define('name-switcher', NameSwitcher)
