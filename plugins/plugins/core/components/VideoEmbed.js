import { LitElement, html, css } from 'lit'
import { base64ToBlobUrl } from './qdn-action-encryption'
import { translate } from '../../../../core/translate'

class VideoEmbed extends LitElement {
	static get properties() {
		return {
			embedData: { type: Object },
			groupId: { type: Number },
			senderName: { type: String },
			error: { type: String },
			videoUrl: { type: String },
			loading: { type: Boolean },
			mimeType: { type: String },
			statusMessage: { type: String }
		}
	}

	static get styles() {
		return css`
			:host {
				display: block;
				margin-top: 8px;
			}
			.embed-container {
				display: flex;
				flex-direction: column;
				gap: 6px;
			}
			video {
				max-width: 100%;
				max-height: 320px;
				border-radius: 6px;
				background: #000;
			}
			.info {
				font-size: 12px;
				color: var(--text-muted, #8a8a8a);
			}
			.error {
				color: #f44336;
				font-size: 13px;
			}
		`
	}

	constructor() {
		super()
		this.embedData = null
		this.groupId = 0
		this.senderName = ''
		this.error = ''
		this.videoUrl = ''
		this.loading = false
		this.mimeType = ''
		this.statusMessage = ''
		this.objectUrl = null
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		if (this.objectUrl) {
			URL.revokeObjectURL(this.objectUrl)
			this.objectUrl = null
		}
	}

	async firstUpdated() {
		if (!this.embedData) return
		this.mimeType = this.embedData.mimeType || ''
		await this.loadVideo()
	}

	async loadVideo(retryCount = 0) {
		try {
			this.loading = true
			this.error = ''
			this.statusMessage = ''
			const { service, name, identifier, key, encryptionType } = this.embedData
			const nodeConfig = window.parent.reduxStore.getState().app.nodeConfig
			const myNode = nodeConfig.knownNodes[nodeConfig.node]
			const baseUrl = `${myNode.protocol}://${myNode.domain}:${myNode.port}`

			// First ensure the resource is built/ready
			const statusRes = await fetch(`${baseUrl}/arbitrary/resource/status/${service}/${name}/${identifier}?build=true`)
			const statusJson = await statusRes.json()
			if (!statusJson || statusJson.status !== 'READY') {
				if (retryCount < 3) {
					this.statusMessage = translate('transactions.loading') || 'Loading...'
					setTimeout(() => this.loadVideo(retryCount + 1), 4000)
					return
				}
				throw new Error(translate('chatpage.cchange104') || 'Video not available yet')
			}
			this.statusMessage = ''

			if (encryptionType) {
				const dataRes = await fetch(`${baseUrl}/arbitrary/${service}/${name}/${identifier}?encoding=base64`)
				const data = await dataRes.text()
				let decrypted = null
				if (encryptionType === 'private') {
					decrypted = await window.parent.sendMessage('DECRYPT_DATA_WITH_SHARING_KEY', {
						encryptedData: data,
						key: decodeURIComponent(key || '')
					})
				} else if (encryptionType === 'group') {
					decrypted = await window.parent.sendMessage('DECRYPT_QORTAL_GROUP_DATA', {
						data64: data,
						groupId: this.groupId
					})
				}
				if (!decrypted || decrypted.error) {
					throw new Error('Unable to decrypt video')
				}
				this.objectUrl = base64ToBlobUrl(decrypted, this.mimeType || 'video/mp4')
				this.videoUrl = this.objectUrl
			} else {
				this.videoUrl = `${baseUrl}/arbitrary/${service}/${name}/${identifier}?async=true`
			}
		} catch (error) {
			this.error = error && error.message ? error.message : 'Unable to load video'
		} finally {
			this.loading = false
		}
	}

	render() {
		if (!this.embedData) return null
		return html`
			<div class="embed-container">
				${this.error ? html`<div class="error">${this.error}</div>` : ''}
				${this.videoUrl ? html`
					<video controls preload="metadata">
						<source src="${this.videoUrl}" type="${this.mimeType || 'video/mp4'}">
						${translate('chatpage.cchange103') || 'Your browser does not support the video tag.'}
					</video>
				` : this.loading ? html`<div class="info">${this.statusMessage || translate('transactions.loading') || 'Loading...'}</div>` : ''}
				${this.senderName ? html`<div class="info">${this.senderName}</div>` : ''}
			</div>
		`
	}
}

customElements.define('video-embed', VideoEmbed)
