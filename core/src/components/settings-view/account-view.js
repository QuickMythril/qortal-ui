import { html, LitElement } from 'lit'
import { connect } from 'pwa-helpers'
import { store } from '../../store'
import { accountViewStyles } from '../../styles/core-css'
import { pickDisplayName, avatarFallbackChar } from '../../utils/name'
import { getSelectedNodeBaseUrl } from '../../utils/node'

// Multi language support
import { get, translate } from '../../../translate'

class AccountView extends connect(store)(LitElement) {
	static get properties() {
		return {
			accountInfo: { type: Object },
			switchAvatar: { type: String },
			theme: { type: String, reflect: true }
		}
	}

	static get styles() {
		return [accountViewStyles]
	}

	constructor() {
		super()
		this.accountInfo = store.getState().app.accountInfo
		this.switchAvatar = ''
		this.displayName = pickDisplayName(this.accountInfo)
		this.avatarError = false
		this.theme = localStorage.getItem('qortalTheme') ? localStorage.getItem('qortalTheme') : 'light'
	}

	render() {
		return html`
			<div class="sub-main">
				<div class="center-box">
					<div class="img-icon">${this.getAvatar()}</div>
					<span id="accountName">
						${this.displayName || get("general.noRegisteredName")}
					</span>
					<div class="content-box">
						<span class="title">${translate("settings.address")}: </span>
						<span class="value">${store.getState().app.selectedAddress.address}</span>
						<br/>
						<span class="title">${translate("settings.publickey")}: </span>
						<span class="value">${store.getState().app.selectedAddress.base58PublicKey}</span>
					</div>
				</div>
			</div>
		`
	}

	firstUpdated() {
		this.getSwitchAvatar()

		setInterval(() => {
			this.getSwitchAvatar()
		}, 10000)
	}

	getAvatar() {
		const fallbackChar = avatarFallbackChar(this.accountInfo)
		const isLight = this.switchAvatar === 'light'
		const defaultImg = isLight ? '/img/noavatar_light.png' : '/img/noavatar_dark.png'

		if (!this.displayName && !fallbackChar) {
			return html`<img src="${defaultImg}" style="width:150px; height:150px; border-radius: 25%;">`
		}

		const avatarUrl = getSelectedNodeBaseUrl(store.getState())
		const url = this.displayName ? `${avatarUrl}/arbitrary/THUMBNAIL/${this.displayName}/qortal_avatar?async=true` : ''

		return html`
			<div style="width:150px; height:150px;">
				${this.displayName ? html`
					<img src="${url}" style="width:150px; height:150px; border-radius: 25%;" ?hidden=${this.avatarError} @error=${() => { this.avatarError = true }}>
				` : null}
				${(this.avatarError || !this.displayName) && fallbackChar ? html`
					<div style="width:150px; height:150px; border-radius:25%; display:flex; align-items:center; justify-content:center; background: var(--paper-grey-200, #e0e0e0); color: var(--black); font-size:60px;">
						${fallbackChar}
					</div>
				` : null}
				${(!fallbackChar && (this.avatarError || !this.displayName)) ? html`
					<img src="${defaultImg}" style="width:150px; height:150px; border-radius: 25%;">
				` : null}
			</div>
		`
	}

	getSwitchAvatar() {
		this.switchAvatar = localStorage.getItem('qortalTheme')
	}

	stateChanged(state) {
		this.accountInfo = state.app.accountInfo
		this.displayName = pickDisplayName(this.accountInfo)
		this.avatarError = false
	}
}

window.customElements.define('account-view', AccountView)
