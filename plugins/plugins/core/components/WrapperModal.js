import { html, LitElement } from 'lit'
import { wrapperModalStyles } from './plugins-css'

export class WrapperModal extends LitElement {
	static get properties() {
		return {
			customStyle: { type: String },
			onClickFunc: { attribute: false },
			zIndex: { type: Number }
		}
	}

	static get styles() {
		return [wrapperModalStyles]
	}

	render() {
		return html`
			<div>
				<div style="z-index: ${this.zIndex || 50}" class="backdrop" @click=${() => { this.onClickFunc() }}></div>
				<div class="modal-body" style=${this.customStyle ? this.customStyle : ""}><slot></slot></div>
			</div>
		`
	}
}

customElements.define('wrapper-modal', WrapperModal)