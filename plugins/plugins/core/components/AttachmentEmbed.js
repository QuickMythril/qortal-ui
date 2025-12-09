import { LitElement, html, css } from 'lit'
import { base64ToBlobUrl } from './qdn-action-encryption'
import FileSaver from 'file-saver'
import { translate } from '../../../../core/translate'
import '@material/mwc-button'

class AttachmentEmbed extends LitElement {
	static get properties() {
		return {
			embedData: { type: Object },
			groupId: { type: Number },
			senderName: { type: String },
			loading: { type: Boolean },
			error: { type: String },
			statusMessage: { type: String }
		}
	}

	safeT(key, fallback) {
		const t = translate(key)
		if (t && typeof t === 'string' && !t.startsWith('[')) return t
		return fallback
	}

	static get styles() {
		return css`
			:host {
				display: block;
				margin-top: 8px;
			}
			.embed-card {
				border: 1px solid var(--chat-border, #e0e0e0);
				border-radius: 8px;
				padding: 10px;
				background: var(--chat-bubble-bg, rgba(0,0,0,0.03));
				display: flex;
				flex-direction: column;
				gap: 6px;
				color: var(--mdc-theme-on-surface, var(--black));
			}
			.header {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				font-weight: 600;
				color: var(--mdc-theme-on-surface, var(--black));
			}
			.button-row {
				display: flex;
				justify-content: flex-start;
			}
			.error { color: var(--red-color, #c62828); font-size: 13px; }
			.filename { color: var(--mdc-theme-on-surface, var(--black)); }
			.info { color: var(--text-muted, #8a8a8a); font-size: 12px; }
		`
	}

	constructor() {
		super()
		this.embedData = null
		this.groupId = 0
		this.senderName = ''
		this.loading = false
		this.error = ''
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

	getNodeUrl() {
		const myNode = window.parent.reduxStore.getState().app.nodeConfig.knownNodes[window.parent.reduxStore.getState().app.nodeConfig.node]
		return `${myNode.protocol}://${myNode.domain}:${myNode.port}`
	}

	async downloadAttachment(retryCount = 0) {
		if (!this.embedData) return
		const { service, name, identifier, encryptionType, key, fileName } = this.embedData
		try {
			this.loading = true
			this.error = ''
			this.statusMessage = ''
			const nodeUrl = this.getNodeUrl()
			const statusRes = await fetch(`${nodeUrl}/arbitrary/resource/status/${service}/${name}/${identifier}?build=true`)
			const statusJson = await statusRes.json()
			if (!statusJson || statusJson.status !== 'READY') {
				if (retryCount < 3) {
					this.statusMessage = this.safeT('transactions.loading', 'Loading...')
					setTimeout(() => this.downloadAttachment(retryCount + 1), 4000)
					return
				}
				throw new Error(this.safeT('chatpage.cchange105', 'Attachment not available yet'))
			}

			let blob = null
			if (encryptionType) {
				const dataRes = await fetch(`${nodeUrl}/arbitrary/${service}/${name}/${identifier}?encoding=base64`)
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
					throw new Error('Unable to decrypt attachment')
				}
				this.objectUrl = base64ToBlobUrl(decrypted, this.embedData.mimeType || 'application/octet-stream')
				const response = await fetch(this.objectUrl)
				blob = await response.blob()
			} else {
				const res = await fetch(`${nodeUrl}/arbitrary/${service}/${name}/${identifier}`)
				blob = await res.blob()
			}
			if (blob) {
				await this.saveBlob(blob, decodeURIComponent(fileName || identifier))
			}
		} catch (error) {
			this.error = error && error.message ? error.message : 'Unable to download attachment'
		} finally {
			this.loading = false
		}
	}

	async saveBlob(blob, suggestedName) {
		// Prefer electron native save dialog when available
		if (window.parent && window.parent.electronAPI && typeof window.parent.electronAPI.saveBlobToDisk === 'function') {
			const arrayBuffer = await blob.arrayBuffer()
			const base64Data = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
			const res = await window.parent.electronAPI.saveBlobToDisk(base64Data, suggestedName || 'attachment')
			if (res && !res.canceled) return
			if (res && res.canceled) return
		} else {
			try {
				if (window.showSaveFilePicker) {
					const handle = await window.showSaveFilePicker({
						suggestedName: suggestedName || 'attachment',
						types: [{
							description: 'File',
							accept: { '*/*': ['.*'] }
						}]
					})
					const writable = await handle.createWritable()
					await writable.write(blob)
					await writable.close()
					return
				}
			} catch (err) {
				if (err && err.name === 'AbortError') return
			}
		}

		FileSaver.saveAs(blob, suggestedName || 'attachment')
	}

	render() {
		if (!this.embedData) return null
		const owner = this.senderName || this.embedData.name || ''
		const downloadLabel = this.safeT('core:action.download_file', 'Download file')
		const loadingLabel = this.statusMessage || this.safeT('transactions.loading', 'Loading...')
		return html`
			<div class="embed-card">
				<div class="header">
					<span>${owner ? `${owner} sent an attachment` : 'Attachment'}</span>
				</div>
				<div class="button-row">
					<mwc-button
						dense
						unelevated
						@click=${() => this.downloadAttachment()}
						?disabled=${this.loading}
					>
						${this.loading ? loadingLabel : downloadLabel}
					</mwc-button>
				</div>
				${this.error ? html`<div class="error">${this.error}</div>` : ''}
				${this.embedData.fileName ? html`<div class="filename">${decodeURIComponent(this.embedData.fileName)}</div>` : ''}
				${this.embedData.mimeType ? html`<div class="info">${this.embedData.mimeType}</div>` : ''}
				${this.embedData.encryptionType ? html`<div class="info">${this.embedData.encryptionType === 'group' ? 'Group encrypted' : 'Encrypted'}</div>` : ''}
			</div>
		`
	}
}

customElements.define('attachment-embed', AttachmentEmbed)
