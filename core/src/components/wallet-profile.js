import { html, LitElement } from 'lit'
import { connect } from 'pwa-helpers'
import { store } from '../store'
import { walletProfileStyles } from '../styles/core-css'
import { pickDisplayName, avatarFallbackChar } from '../utils/name'

// Multi language support
import { translate } from '../../translate'

class WalletProfile extends connect(store)(LitElement) {
	static get properties() {
		return {
			wallet: { type: Object },
			nodeConfig: { type: Object },
			accountInfo: { type: Object },
			theme: { type: String, reflect: true }
		}
	}

	static get styles() {
		return [walletProfileStyles]
	}

	constructor() {
		super()
		this.wallet = {}
		this.nodeConfig = {}
		this.accountInfo = {
			names: [],
			addressInfo: {}
		}
		this.displayName = pickDisplayName(this.accountInfo)
		this.avatarError = false
		this.theme = localStorage.getItem('qortalTheme') ? localStorage.getItem('qortalTheme') : 'light'
	}

	render() {
		return html`
			<div id="profileInMenu">
				<div style="padding: 8px 0;">
					<div id="accountName">
						<div id="child inline-block-child" class="full-info-logo">${this.getAvatar()}</div>
						&nbsp;&nbsp;&nbsp;
						<div id="inline-block-child">
							<div>
								${this.displayName || translate("chatpage.cchange15")}
							</div>
                            				<div>
								${this.accountInfo.addressInfo ? html`
									<span style="margin-bottom: 8px; display: inline-block; font-size: 14px;">
										${translate("walletprofile.minterlevel")} - <span style="color: #03a9f4;">${this.accountInfo.addressInfo.level} ${this.accountInfo.addressInfo.flags === 1 ? html`<strong>(F)</strong>` : ''}
									</span>
								` : ''}
							</div>
                            				<p id="blocksMinted">${translate("walletprofile.blocksminted")} - ${this.accountInfo.addressInfo.blocksMinted + this.accountInfo.addressInfo.blocksMintedAdjustment}</p>
						</div>
					</div>
					<p id="address">${this.wallet.addresses[0].address}</p>
				</div>
			</div>
		`
	}

	firstUpdated() {
		// ...
	}

	getAvatar() {
		const fallbackChar = avatarFallbackChar(this.accountInfo)
		if (!this.displayName && !fallbackChar) {
			return html`<img class="round-fullinfo" src="/img/incognito.png">`
		}

		const avatarNode = store.getState().app.nodeConfig.knownNodes[store.getState().app.nodeConfig.node]
		const avatarUrl = avatarNode.protocol + '://' + avatarNode.domain + ':' + avatarNode.port
		const url = this.displayName ? `${avatarUrl}/arbitrary/THUMBNAIL/${this.displayName}/qortal_avatar?async=true` : ''

		return html`
			<div style="position: relative; width: 120px; height: 120px;">
				${this.displayName ? html`
					<img class="round-fullinfo" src="${url}" ?hidden=${this.avatarError} @error=${() => { this.avatarError = true }} />
				` : null}
				${(this.avatarError || !this.displayName) && fallbackChar ? html`
					<div class="round-fullinfo" style="display:flex; align-items:center; justify-content:center; background: var(--paper-grey-200, #e0e0e0); color: var(--black); font-size:48px;">
						${fallbackChar}
					</div>
				` : null}
				${(!fallbackChar && (this.avatarError || !this.displayName)) ? html`
					<img class="round-fullinfo" src="/img/incognito.png">
				` : null}
			</div>
		`
	}

	stateChanged(state) {
		this.wallet = state.app.wallet
		this.nodeConfig = state.app.nodeConfig
		this.accountInfo = state.app.accountInfo
		this.displayName = pickDisplayName(this.accountInfo)
		this.avatarError = false
	}
}

window.customElements.define('wallet-profile', WalletProfile)
