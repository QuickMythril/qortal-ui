import { css, html, LitElement } from 'lit'
import { translate, } from '../../../../core/translate'
import { chatGroupsModalStyles } from './plugins-css'

import './ChatGroupManager'

import '@material/mwc-dialog'
import '@material/mwc-list/mwc-list-item.js'
import '@material/mwc-menu'

export class ChatGroupsModal extends LitElement {
	static get properties() {
		return {
			openDialogGroupsModal: { type: Boolean },
			setOpenDialogGroupsModal: { attribute: false }
		}
	}

	static get styles() {
		return [chatGroupsModalStyles]
	}

	constructor() {
		super()
		this.openDialogGroupsModal = false
	}

	render() {
		return html`
			<mwc-dialog id="showDialogGroupsModal" ?open=${this.openDialogGroupsModal} @closed=${() => {this.setOpenDialogGroupsModal(false)}}>
				<div class="dialog-header"></div>
				<div class="dialog-container">
					<chat-groups-manager></chat-groups-manager>
				</div>
				<mwc-button slot="primaryAction" dialogAction="cancel" class="red" @click=${() => {this.setOpenDialogGroupsModal(false)}}>
					${translate('general.close')}
				</mwc-button>
			</mwc-dialog>
		`
	}

	firstUpdated() {
		// ...
	}
}

customElements.define('chat-groups-modal', ChatGroupsModal)