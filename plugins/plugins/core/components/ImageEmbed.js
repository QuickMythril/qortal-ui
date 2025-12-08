import { html, LitElement, css } from 'lit'
import { base64ToBlobUrl } from './qdn-action-encryption'
import { chatStyles } from './plugins-css'
import '@material/mwc-icon'
import '@material/mwc-button'

class ImageEmbed extends LitElement {
	static get properties() {
		return {
			embedData: { type: Object },
			groupId: { type: Number },
			senderName: { type: String },
			imageUrl: { type: String },
			isLoading: { type: Boolean },
			errorMsg: { type: String }
		}
	}

	static get styles() {
		return [
			chatStyles,
			css`
				.embed-card {
					border: 1px solid var(--chat-border, #e0e0e0);
					border-radius: 8px;
					padding: 8px;
					margin-bottom: 8px;
					background: var(--chat-bubble-bg, rgba(0,0,0,0.03));
				}
				.embed-card__header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 8px;
					gap: 6px;
				}
				.embed-card__title {
					display: flex;
					align-items: center;
					gap: 6px;
					font-weight: 600;
					color: var(--black);
				}
				.embed-card__status {
					color: var(--black);
					font-size: 14px;
				}
				.embed-card__status.error {
					color: var(--red-color, #c62828);
				}
				.embed-card__body {
					display: flex;
					justify-content: center;
					align-items: center;
				}
			`
		]
	}

	constructor() {
		super()
		this.embedData = null
		this.groupId = null
		this.senderName = ''
		this.imageUrl = ''
		this.isLoading = false
		this.errorMsg = ''
		this.nodeUrl = this.getNodeUrl()
		this.objectUrl = null
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		this.revokeObjectUrl()
	}

	revokeObjectUrl() {
		if (this.objectUrl) {
			URL.revokeObjectURL(this.objectUrl)
			this.objectUrl = null
		}
	}

	updated(changedProps) {
		if (changedProps.has('embedData')) {
			this.loadImage()
		}
	}

	render() {
		const owner = this.senderName || this.embedData?.name || ''

		return html`
			<div class="embed-card">
				<div class="embed-card__header">
					<div class="embed-card__title">
						<mwc-icon style="color: var(--chat-group);">image</mwc-icon>
						<span>${owner ? `Image from ${owner}` : 'Image embed'}</span>
					</div>
					<mwc-icon
						style="cursor: pointer;"
						@click=${() => this.loadImage()}
						title="Refresh"
					>refresh</mwc-icon>
				</div>
				${this.isLoading ? html`
					<div class="embed-card__status">Loading image…</div>
				` : this.errorMsg ? html`
					<div class="embed-card__status error">${this.errorMsg}</div>
				` : this.imageUrl ? html`
					<div class="embed-card__body">
						<img
							src=${this.imageUrl}
							style="max-width: 100%; border-radius: 6px;"
							alt="Embedded image"
							@load=${() => { this.isLoading = false }}
							@error=${() => { this.errorMsg = 'Unable to load image'; this.imageUrl = '' }}
						/>
					</div>
				` : html`
					<div class="embed-card__status">No image available</div>
				`}
			</div>
		`
	}

	getNodeUrl() {
		const myNode = window.parent.reduxStore.getState().app.nodeConfig.knownNodes[window.parent.reduxStore.getState().app.nodeConfig.node]
		return `${myNode.protocol}://${myNode.domain}:${myNode.port}`
	}

	async loadImage() {
		if (!this.embedData || !this.embedData.service || !this.embedData.name || !this.embedData.identifier) {
			this.errorMsg = 'Invalid embed data'
			return
		}

		this.isLoading = true
		this.errorMsg = ''
		this.revokeObjectUrl()

		const { service, name, identifier, encryptionType, key, mimeType } = this.embedData

		try {
			if (encryptionType === 'private') {
				if (!window.parent || typeof window.parent.sendMessage !== 'function') {
					throw new Error('Embed decryption not available in this context')
				}
				if (!key) {
					throw new Error('Missing key for private image')
				}
				const res = await fetch(`${this.nodeUrl}/arbitrary/${service}/${name}/${identifier}?encoding=base64`)
				const data = await res.text()
				const decrypted = await window.parent.sendMessage('DECRYPT_DATA_WITH_SHARING_KEY', {
					encryptedData: data,
					key: decodeURIComponent(key)
				})
				if (!decrypted || decrypted.error) {
					throw new Error(decrypted?.error || 'Unable to decrypt image')
				}
				this.objectUrl = base64ToBlobUrl(decrypted, mimeType || 'image/png')
				this.imageUrl = this.objectUrl
			} else if (encryptionType === 'group') {
				if (!window.parent || typeof window.parent.sendMessage !== 'function') {
					throw new Error('Embed decryption not available in this context')
				}
				if (!this.groupId) {
					throw new Error('Missing group to decrypt image')
				}
				const res = await fetch(`${this.nodeUrl}/arbitrary/${service}/${name}/${identifier}?encoding=base64`)
				const data = await res.text()
				const decrypted = await window.parent.sendMessage('DECRYPT_QORTAL_GROUP_DATA', {
					data64: data,
					groupId: this.groupId
				})
				if (!decrypted || decrypted.error) {
					throw new Error(decrypted?.error || 'Unable to decrypt image')
				}
				this.objectUrl = base64ToBlobUrl(decrypted, mimeType || 'image/png')
				this.imageUrl = this.objectUrl
			} else {
				this.imageUrl = `${this.nodeUrl}/arbitrary/${service}/${name}/${identifier}?async=true`
			}
		} catch (error) {
			this.errorMsg = error?.message || 'Unable to load image'
			this.imageUrl = ''
		} finally {
			this.isLoading = false
		}
	}
}

window.customElements.define('image-embed', ImageEmbed)
