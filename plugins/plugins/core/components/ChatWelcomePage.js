import { html, LitElement } from 'lit'
import { Epml } from '../../../epml'
import { chatWelcomePageStyles } from './plugins-css'
import isElectron from 'is-electron'
import { getMyNameFromStore } from '../../utils/functions'
import '@material/mwc-icon'
import '@material/mwc-button'
import '@material/mwc-dialog'
import '@polymer/paper-spinner/paper-spinner-lite.js'
import '@vaadin/grid'

// Multi language support
import { get, registerTranslateConfig, translate, use } from '../../../../core/translate'
registerTranslateConfig({
	loader: lang => fetch(`/language/${lang}.json`).then(res => res.json())
})

const parentEpml = new Epml({ type: 'WINDOW', source: window.parent })

class ChatWelcomePage extends LitElement {
	static get properties() {
		return {
			selectedAddress: { type: Object },
			config: { type: Object },
			myAddress: { type: Object, reflect: true },
			messages: { type: Array },
			btnDisable: { type: Boolean },
			isLoading: { type: Boolean },
			balance: { type: Number },
			theme: { type: String, reflect: true },
			setOpenPrivateMessage: { attribute: false },
			openGroupPreview: { attribute: false }
		}
	}

	static get styles() {
		return [chatWelcomePageStyles]
	}

	constructor() {
		super()
		this.selectedAddress = window.parent.reduxStore.getState().app.selectedAddress || {}
		this.myAddress = {}
		this.displayName = translate('general.noRegisteredName')
		this.balance = 1
		this.messages = []
		this.btnDisable = false
		this.isLoading = false
		this.theme = localStorage.getItem('qortalTheme') ? localStorage.getItem('qortalTheme') : 'light'
		this.promotions = []
		this.promotionsLoading = false
		this.promotionsError = ''
		this.joiningGroupId = null
		this.promotionsInterval = null
	}

	render() {
		return html`
			<div>
				<div>
					<span class="welcome-title">${translate('welcomepage.wcchange1')}</span>
					<hr style="color: #eee; border-radius: 80%; margin-bottom: 2rem;">
				</div>
				<div class="sub-main">
						<div class="center-box">
							<mwc-icon class="img-icon">chat</mwc-icon><br>
							<div class="name-line">${this.displayName}</div>
							<div class="address-line">${this.myAddress.address || ''}</div>
							<div class="start-chat" @click="${() => this.setOpenPrivateMessage({name: '', open: true})}">
								${translate('welcomepage.wcchange2')}
							</div>
						</div>
					</div>

				<div class="promotions-section">
					<div class="promotions-header">
						<div>
							<p class="promotions-title">${translate('welcomepage.promotionsTitle') || 'Group promotions'}</p>
							<p class="promotions-subtitle">${translate('welcomepage.promotionsSubtitle') || 'See what groups are sharing this week.'}</p>
						</div>
						<mwc-button dense unelevated @click=${() => this.getPromotions(true)} ?disabled=${this.promotionsLoading}>
							${translate('browserpage.bchange2') || 'Reload'}
						</mwc-button>
					</div>

					${this.promotionsLoading ? html`
						<div class="promotions-loading">
							<paper-spinner-lite active></paper-spinner-lite>
						</div>
					` : this.promotionsError ? html`
						<div class="promotions-empty">
							<span>${this.promotionsError}</span>
						</div>
					` : this.promotions.length === 0 ? html`
						<div class="promotions-empty">
							<span>${translate('welcomepage.promotionsEmpty') || 'No promotions yet.'}</span>
						</div>
						` : html`
							<div class="promotions-list">
								${this.promotions.map(promo => this.renderPromotionCard(promo))}
							</div>
						`}
				</div>

				<!-- Start Chatting Dialog -->
				<mwc-dialog id="startSecondChatDialog" scrimClickAction="${this.isLoading ? '' : 'close'}">
					<div style="text-align:center">
						<h1>${translate('welcomepage.wcchange2')}</h1>
						<hr>
					</div>
					<p>${translate('welcomepage.wcchange3')}</p>
					<textarea class="input" ?disabled=${this.isLoading} id="sendTo" placeholder="${translate('welcomepage.wcchange4')}" rows="1"></textarea>
					<p style="margin-bottom:0;">
						<textarea class="textarea" @keydown=${(e) => this._textArea(e)} ?disabled=${this.isLoading} id="messageBox" placeholder="${translate('welcomepage.wcchange5')}" rows="1"></textarea>
					</p>
					<mwc-button ?disabled="${this.isLoading}" slot="primaryAction" @click=${() => {this._sendMessage()}}>
						${translate('welcomepage.wcchange6')}
					</mwc-button>
					<mwc-button ?disabled="${this.isLoading}" slot="secondaryAction" dialogAction="cancel" class="red">
						${translate('general.close')}
					</mwc-button>
				</mwc-dialog>
			</div>
		`
	}

	firstUpdated() {
		this.changeTheme()
		this.changeLanguage()
		this.syncAddressAndName()
		this.getPromotions()

		const stopKeyEventPropagation = (e) => {
			e.stopPropagation()
			return false
		}

		this.shadowRoot.getElementById('sendTo').addEventListener('keydown', stopKeyEventPropagation)
		this.shadowRoot.getElementById('messageBox').addEventListener('keydown', stopKeyEventPropagation)

		const getDataFromURL = () => {
			let tempUrl = document.location.href
			let splitedUrl = decodeURI(tempUrl).split('?')
			let urlData = splitedUrl[1]
			if (urlData !== undefined) {
				this.chatId = urlData
			}
		}

		window.addEventListener('storage', () => {
			const checkLanguage = localStorage.getItem('qortalLanguage')
			const checkTheme = localStorage.getItem('qortalTheme')

			use(checkLanguage)

			if (checkTheme === 'dark') {
				this.theme = 'dark'
			} else {
				this.theme = 'light'
			}
			document.querySelector('html').setAttribute('theme', this.theme)
		})

		parentEpml.ready().then(() => {
			parentEpml.subscribe('selected_address', async selectedAddress => {
				this.selectedAddress = {}
				selectedAddress = JSON.parse(selectedAddress)
				if (!selectedAddress || Object.entries(selectedAddress).length === 0) return
				this.selectedAddress = selectedAddress
				this.syncAddressAndName()
			})

		})

		parentEpml.imReady()

		this.clearConsole()

		setInterval(() => {
			this.clearConsole()
		}, 60000)

		this.promotionsInterval = setInterval(() => {
			this.getPromotions()
		}, 30 * 60 * 1000)
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		if (this.promotionsInterval) {
			clearInterval(this.promotionsInterval)
		}
	}

	clearConsole() {
		if (!isElectron()) {
		} else {
			console.clear()
			window.parent.electronAPI.clearCache()
		}
	}

	changeTheme() {
		const checkTheme = localStorage.getItem('qortalTheme')
		if (checkTheme === 'dark') {
			this.theme = 'dark'
		} else {
			this.theme = 'light'
		}
		document.querySelector('html').setAttribute('theme', this.theme)
	}

	changeLanguage() {
		const checkLanguage = localStorage.getItem('qortalLanguage')
		if (checkLanguage === null || checkLanguage.length === 0) {
			localStorage.setItem('qortalLanguage', 'us')
			use('us')
		} else {
			use(checkLanguage)
		}
	}

	getNodeBaseUrl() {
		const myNode = window.parent.reduxStore.getState().app.nodeConfig.knownNodes[window.parent.reduxStore.getState().app.nodeConfig.node]
		return `${myNode.protocol}://${myNode.domain}:${myNode.port}`
	}

	async getPromotions(force = false) {
		try {
			if (this.promotionsLoading && !force) return
			this.promotionsLoading = true
			this.promotionsError = ''
			const baseUrl = this.getNodeBaseUrl()
			const searchUrl = `${baseUrl}/arbitrary/resources/searchsimple?mode=ALL&service=DOCUMENT&identifier=group-promotions-ui24-&limit=100&includemetadata=false&reverse=true&prefix=true`
			const response = await fetch(searchUrl)
			if (!response.ok) throw new Error('Unable to load promotions')
			const promos = await response.json()

			const mapped = await Promise.all(promos.map(async promo => {
				const groupMatch = (promo.identifier || '').match(/group-(\d+)-/)
				const groupId = groupMatch ? groupMatch[1] : null
				if (!groupId) return null
				try {
					const [contentRes, groupRes] = await Promise.all([
						fetch(`${baseUrl}/arbitrary/${promo.service}/${promo.name}/${promo.identifier}`),
						fetch(`${baseUrl}/groups/${groupId}`)
					])
					const data = await contentRes.text()
					const groupInfo = groupRes.ok ? await groupRes.json() : {}
					return {
						...promo,
						data,
						groupId,
						groupInfo
					}
				} catch (e) {
					return null
				}
			}))

			const cleaned = mapped.filter(Boolean).sort((a, b) => (b.created || 0) - (a.created || 0))
			this.promotions = cleaned
		} catch (error) {
			this.promotionsError = (error && error.message) || (translate('welcomepage.promotionsError') || 'Unable to load promotions')
		} finally {
			this.promotionsLoading = false
		}
	}

	renderPromotionCard(promo) {
		const safePromo = promo || {}
		const groupInfo = (safePromo.groupInfo && typeof safePromo.groupInfo === 'object') ? safePromo.groupInfo : {}
		const groupId = safePromo.groupId
		const groupName = groupInfo.groupName || safePromo.groupName || translate('welcomepage.unknownGroup') || 'Group'
		const statusLabel = groupInfo.isOpen === false ? translate('grouppage.gchange17') || 'Private' : translate('grouppage.gchange16') || 'Public'
		const memberCount = groupInfo.memberCount || 0
		const description = groupInfo.description || ''
		const isJoining = this.joiningGroupId === groupId

		return html`
			<div class="promotion-card">
				<div class="promotion-header">
					<div>
						<p class="promotion-group">${groupName}</p>
						<p class="promotion-meta">
							${statusLabel}
							· ${memberCount} ${translate('grouppage.gchange54') || 'Members'}
						</p>
					</div>
					<div class="promotion-actions">
						<mwc-button dense outlined @click=${() => this.previewGroup(safePromo)}>
							${translate('appspage.schange40') || 'Preview'}
						</mwc-button>
						<mwc-button
							dense
							unelevated
							?disabled=${isJoining}
							@click=${() => this.joinGroup(safePromo)}
						>
							${isJoining ? html`<paper-spinner-lite active></paper-spinner-lite>` : translate('grouppage.gchange51') || 'Join'}
						</mwc-button>
					</div>
				</div>
				<p class="promotion-text">${safePromo.data || ''}</p>
				${description ? html`
					<p class="promotion-description">${description}</p>
				` : ''}
			</div>
		`
	}

	previewGroup(promo) {
		if (typeof this.openGroupPreview === 'function') {
			this.openGroupPreview(promo.groupId, promo)
		}
	}

	async joinGroup(promo) {
		const safePromo = promo || {}
		const groupInfo = (safePromo.groupInfo && typeof safePromo.groupInfo === 'object') ? safePromo.groupInfo : {}
		const groupId = safePromo.groupId
		const groupName = groupInfo.groupName || safePromo.groupName || ''
		if (!groupId) return
		if (!this.selectedAddress || !this.selectedAddress.address) {
			parentEpml.request('showSnackBar', translate('transactions.erroroccured') || 'Unable to join group')
			return
		}
		try {
			this.joiningGroupId = groupId
			const baseUrl = this.getNodeBaseUrl()
			const feeRes = await fetch(`${baseUrl}/transactions/unitfee?txType=JOIN_GROUP`)
			const feeJson = await feeRes.json()
			const fee = (Number(feeJson) / 1e8).toFixed(8)
			const lastRef = await parentEpml.request('apiCall', {
				type: 'api',
				url: `/addresses/lastreference/${this.selectedAddress.address}`
			})

			const txResponse = await parentEpml.request('transaction', {
				type: 31,
				nonce: this.selectedAddress.nonce,
				params: {
					fee,
					registrantAddress: this.selectedAddress.address,
					rGroupName: groupName,
					rGroupId: groupId,
					lastReference: lastRef,
					groupdialog1: get('transactions.groupdialog1'),
					groupdialog2: get('transactions.groupdialog2')
				},
				apiVersion: 2
			})

			const hasDataError = txResponse && txResponse.data && txResponse.data.error

			if (txResponse.success === true && !hasDataError) {
				parentEpml.request('showSnackBar', translate('transactions.transactioncreated') || 'Transaction created')
			} else {
				const message = (txResponse && txResponse.message) || (txResponse && txResponse.data && txResponse.data.message) || translate('transactions.erroroccured') || 'Unable to join group'
				parentEpml.request('showSnackBar', message)
			}
		} catch (error) {
			parentEpml.request('showSnackBar', (error && error.message) || (translate('transactions.erroroccured') || 'Unable to join group'))
		} finally {
			this.joiningGroupId = null
		}
	}

	syncAddressAndName() {
		try {
			const state = (window && window.parent && window.parent.reduxStore && typeof window.parent.reduxStore.getState === 'function')
				? window.parent.reduxStore.getState()
				: {}
			const selected = (state.app && state.app.selectedAddress) ? state.app.selectedAddress : {}
			this.myAddress = {
				...selected,
				address: selected.address || this.selectedAddress || ''
			}
			const name = getMyNameFromStore({ allowAddressFallback: false, allowActiveName: false })
			this.displayName = name && name !== this.myAddress.address ? name : translate('general.noRegisteredName')
		} catch (error) {
			console.error('Failed to sync address/name for welcome page', error)
			this.displayName = translate('general.noRegisteredName')
		}
	}

	_sendMessage() {
		this.isLoading = true
		const recipient = this.shadowRoot.getElementById('sendTo').value
		const messageBox = this.shadowRoot.getElementById('messageBox')
		const messageText = messageBox.value

		if (recipient.length === 0) {
			this.isLoading = false
		} else if (messageText.length === 0) {
			this.isLoading = false
		} else {
			this.sendMessage()
		}
	}

	async sendMessage() {
		this.isLoading = true

		const _recipient = this.shadowRoot.getElementById('sendTo').value
		const messageBox = this.shadowRoot.getElementById('messageBox')
		const messageText = messageBox.value

		let recipient

		const validateName = async (receiverName) => {
			let myRes
			let myNameRes = await parentEpml.request('apiCall', {
				type: 'api',
				url: `/names/${receiverName}`
			})
			if (myNameRes.error === 401) {
				myRes = false
			} else {
				myRes = myNameRes
			}
			return myRes
		}

		const myNameRes = await validateName(_recipient)

		if (!myNameRes) {
			recipient = _recipient
		} else {
			recipient = myNameRes.owner
		}

		let _reference = new Uint8Array(64)

		window.crypto.getRandomValues(_reference)

		let sendTimestamp = Date.now()

		let reference = window.parent.Base58.encode(_reference)

		const getAddressPublicKey = async () => {
			let isEncrypted
			let _publicKey

			let addressPublicKey = await parentEpml.request('apiCall', {
				type: 'api',
				url: `/addresses/publickey/${recipient}`
			})

			if (addressPublicKey.error === 102) {
				_publicKey = false
				// Do something here...
				let err1string = get('welcomepage.wcchange7')
				parentEpml.request('showSnackBar', `${err1string}`)
				this.isLoading = false
			} else if (addressPublicKey !== false) {
				isEncrypted = 1
				_publicKey = addressPublicKey
				await sendMessageRequest(isEncrypted, _publicKey)
			} else {
				isEncrypted = 0
				_publicKey = this.selectedAddress.address
				await sendMessageRequest(isEncrypted, _publicKey)
			}
		}

		const sendMessageRequest = async (isEncrypted, _publicKey) => {
			const messageObject = {
				messageText,
				images: [''],
				repliedTo: '',
				version: 3
			}
			const stringifyMessageObject = JSON.stringify(messageObject)
			let chatResponse = await parentEpml.request('chat', {
				type: 18,
				nonce: this.selectedAddress.nonce,
				params: {
					timestamp: sendTimestamp,
					recipient: recipient,
					recipientPublicKey: _publicKey,
					hasChatReference: 0,
					message: stringifyMessageObject,
					lastReference: reference,
					proofOfWorkNonce: 0,
					isEncrypted: isEncrypted,
					isText: 1
				}
			})
			await _computePow(chatResponse)
		}

		const _computePow = async (chatBytes) => {
			const _chatBytesArray = Object.keys(chatBytes).map(function (key) { return chatBytes[key] })
			const chatBytesArray = new Uint8Array(_chatBytesArray)
			const chatBytesHash = new window.parent.Sha256().process(chatBytesArray).finish().result
			const hashPtr = window.parent.sbrk(32, window.parent.heap)
			const hashAry = new Uint8Array(window.parent.memory.buffer, hashPtr, 32)

			hashAry.set(chatBytesHash)

			const difficulty = this.balance < 4 ? 18 : 8
			const workBufferLength = 8 * 1024 * 1024
			const workBufferPtr = window.parent.sbrk(workBufferLength, window.parent.heap)

			let nonce = window.parent.computePow(hashPtr, workBufferPtr, workBufferLength, difficulty)

			let _response = await parentEpml.request('sign_chat', {
				nonce: this.selectedAddress.nonce,
				chatBytesArray: chatBytesArray,
				chatNonce: nonce
			})

			getSendChatResponse(_response)
		}

		const getSendChatResponse = (response) => {
			if (response === true) {
				messageBox.value = ''
				let err2string = get('welcomepage.wcchange8')
				parentEpml.request('showSnackBar', `${err2string}`)
				this.isLoading = false
			} else if (response.error) {
				parentEpml.request('showSnackBar', response.message)
				this.isLoading = false
			} else {
				let err3string = get('welcomepage.wcchange9')
				parentEpml.request('showSnackBar', `${err3string}`)
				this.isLoading = false
			}

		}
		await getAddressPublicKey()
	}

	_textArea(e) {
		if (e.keyCode === 13 && !e.shiftKey) this._sendMessage()
	}

	// Standard functions
	getApiKey() {
		const myNode = window.parent.reduxStore.getState().app.nodeConfig.knownNodes[window.parent.reduxStore.getState().app.nodeConfig.node]
		return myNode.apiKey
	}

	isEmptyArray(arr) {
		if (!arr) { return true }
		return arr.length === 0
	}

	round(number) {
		return (Math.round(parseFloat(number) * 1e8) / 1e8).toFixed(8)
	}
}

window.customElements.define('chat-welcome-page', ChatWelcomePage)
