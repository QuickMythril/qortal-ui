import { html, LitElement } from 'lit'
import { Epml } from '../../../epml'
import { chatSelectStyles } from './plugins-css'
import '@material/mwc-icon'

const parentEpml = new Epml({ type: 'WINDOW', source: window.parent })

class ChatSelect extends LitElement {
	static get properties() {
		return {
			selectedAddress: { type: Object },
			config: { type: Object },
			chatInfo: { type: Object },
			iconName: { type: String },
			activeChatHeadUrl: { type: String },
			isImageLoaded: { type: Boolean },
			setActiveChatHeadUrl: { attribute: false },
			avatarImg: { type: Object },
			avatarUrl: { type: String }

		}
	}

	static get styles() {
		return [chatSelectStyles]
	}

	constructor() {
		super()
		this.selectedAddress = {}
		this.config = {
			user: {
				node: {}
			}
		}
		this.chatInfo = {}
		this.iconName = ''
		this.activeChatHeadUrl = ''
		this.isImageLoaded = false
		this.imageFetches = 0
		this.avatarImg = ''
		this.avatarUrl = ''
	}

	render() {
		return html`
			<li @click=${() => this.getUrl(this.chatInfo.url)} class="clearfix ${this.activeChatHeadUrl === this.chatInfo.url ? 'active' : ''}">
				${this.isImageLoaded ? html`${this.avatarImg}` : html``}
				${!this.isImageLoaded && !this.chatInfo.name && !this.chatInfo.groupName ? html`<mwc-icon class="img-icon">account_circle</mwc-icon>` : html``}
				${!this.isImageLoaded && this.chatInfo.name ?
		html`
						<div
							style="width:40px; height:40px; float:left; border-radius:50%; background: ${this.activeChatHeadUrl === this.chatInfo.url ? 'var(--chatHeadBgActive)' : 'var(--chatHeadBg)'};
							color: ${this.activeChatHeadUrl === this.chatInfo.url ? 'var(--chatHeadTextActive)' : 'var(--chatHeadText)'};
                        				font-weight:bold; display:flex; justify-content:center; align-items:center; text-transform:capitalize;"
						>
							${this.chatInfo.name.charAt(0)}
						</div>
					`
		: ''
}
				${!this.isImageLoaded && this.chatInfo.groupName ?
		html`
						<div
							style="width:40px; height:40px; float:left; border-radius:50%; background: ${this.activeChatHeadUrl === this.chatInfo.url ? 'var(--chatHeadBgActive)' : 'var(--chatHeadBg)'};
							color: ${this.activeChatHeadUrl === this.chatInfo.url ? 'var(--chatHeadTextActive)' : 'var(--chatHeadText)'};
							font-weight:bold; display:flex; justify-content:center; align-items:center; text-transform:capitalize;"
						>
							${this.chatInfo.groupName.charAt(0)}
						</div>
					`
		: ''
}
				<div class="about">
					<div class="name">
						<span style="float:left; padding-left: 8px; color: var(--chat-group);">
							${this.chatInfo.groupName ? this.chatInfo.groupName : this.chatInfo.name !== undefined ? this.chatInfo.name : this.chatInfo.address.substr(0, 15)}
						</span>
					</div>
				</div>
			</li>
		`
	}

	willUpdate(changedProperties) {
		if (changedProperties.has('chatInfo') || changedProperties.has('config')) {
			this.updateAvatar()
		}
	}

	firstUpdated() {
		let configLoaded = false

		parentEpml.ready().then(() => {
			parentEpml.subscribe('selected_address', async selectedAddress => {
				this.selectedAddress = {}
				selectedAddress = JSON.parse(selectedAddress)
				if (!selectedAddress || Object.entries(selectedAddress).length === 0) return
				this.selectedAddress = selectedAddress
			})

			parentEpml.subscribe('config', c => {
				if (!configLoaded) {
					configLoaded = true
				}
				this.config = JSON.parse(c)
			})
		})

		parentEpml.imReady()
	}

	createImage(imageUrl) {
		const imageHTMLRes = new Image()

		imageHTMLRes.style = 'width:40px; height:40px; float: left; border-radius:50%'

		imageHTMLRes.onclick = () => {
			this.openDialogImage = true
		}

		imageHTMLRes.onload = () => {
			this.isImageLoaded = true
		}

		imageHTMLRes.onerror = () => {
			if (this.imageFetches < 4) {
				setTimeout(() => {
					this.imageFetches = this.imageFetches + 1
					imageHTMLRes.src = imageUrl
				}, 500)
			} else {
				this.isImageLoaded = false
			}
		}

		imageHTMLRes.src = imageUrl

		return imageHTMLRes
	}

	shouldUpdate(changedProperties) {
		if (changedProperties.has('activeChatHeadUrl')) {
			return true
		}

		if (changedProperties.has('chatInfo')) {
			return true
		}

		return false
	}

	getUrl(chatUrl) {
		this.setActiveChatHeadUrl(chatUrl)
	}

	onPageNavigation(pageUrl) {
		parentEpml.request('setPageUrl', pageUrl)
	}

	// Standard functions
	getApiKey() {
		const myNode = window.parent.reduxStore.getState().app.nodeConfig.knownNodes[window.parent.reduxStore.getState().app.nodeConfig.node]
		return myNode.apiKey
	}

	getNodeUrl() {
		const nodeState = window.parent.reduxStore.getState().app.nodeConfig
		const myNode = nodeState.knownNodes[nodeState.node]
		return `${myNode.protocol}://${myNode.domain}:${myNode.port}`
	}

	updateAvatar() {
		const newAvatarUrl = this.computeAvatarUrl()

		if (!newAvatarUrl) {
			this.avatarUrl = ''
			this.avatarImg = ''
			this.isImageLoaded = false
			return
		}

		if (newAvatarUrl === this.avatarUrl && this.avatarImg) {
			return
		}

		this.avatarUrl = newAvatarUrl
		this.imageFetches = 0
		this.isImageLoaded = false
		this.avatarImg = this.createImage(newAvatarUrl)
	}

	computeAvatarUrl() {
		const groupString = 'Group_' + this.chatInfo.groupId
		const groupAvatarString = 'qortal_group_avatar_' + this.chatInfo.groupId

		if (groupString === 'Group_0') {
			return '/img/qgcgroup.png'
		}

		if (groupString === 'Group_1') {
			return '/img/qdcgroup.png'
		}

		if (this.chatInfo.name) {
			const encodedName = encodeURIComponent(this.chatInfo.name)
			return `${this.getNodeUrl()}/arbitrary/THUMBNAIL/${encodedName}/qortal_avatar?async=true`
		}

		if (this.chatInfo.ownerName) {
			const encodedOwnerName = encodeURIComponent(this.chatInfo.ownerName)
			return `${this.getNodeUrl()}/arbitrary/THUMBNAIL/${encodedOwnerName}/${groupAvatarString}?async=true`
		}

		return ''
	}

	isEmptyArray(arr) {
		if (!arr) { return true }
		return arr.length === 0
	}

	round(number) {
		return (Math.round(parseFloat(number) * 1e8) / 1e8).toFixed(8)
	}
}

window.customElements.define('chat-select', ChatSelect)
