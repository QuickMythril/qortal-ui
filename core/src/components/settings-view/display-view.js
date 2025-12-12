import { html, LitElement, css } from 'lit'
import { applyBackgroundPreference, getBackgroundPreference, setBackgroundPreference } from '../../utils/background-preference'
import '@material/mwc-select'
import '@material/mwc-list/mwc-list-item.js'

class DisplayView extends LitElement {
	static get properties() {
		return {
			backgroundPreference: { type: String },
			theme: { type: String, reflect: true }
		}
	}

	static get styles() {
		return [css`
			.sub-main {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 12px;
			}

			.field {
				display: flex;
				flex-direction: column;
				gap: 6px;
				min-width: 260px;
				max-width: 360px;
				width: 100%;
			}

			label {
				text-align: left;
				color: var(--black);
				font-size: 16px;
			}

			.helper {
				color: var(--sectxt);
				font-size: 14px;
				margin: 0;
				text-align: center;
				max-width: 420px;
			}
		`]
	}

	constructor() {
		super()
		this.backgroundPreference = getBackgroundPreference()
		this.theme = localStorage.getItem('qortalTheme') ? localStorage.getItem('qortalTheme') : 'light'
	}

	firstUpdated() {
		applyBackgroundPreference(this.backgroundPreference)
	}

	handleBackgroundChange(e) {
		const value = e.target.value

		if (!value) {
			return
		}

		this.backgroundPreference = value
		setBackgroundPreference(value)
	}

	render() {
		return html`
			<div class="sub-main">
				<div class="field">
					<label for="backgroundSelect">Background</label>
					<mwc-select
						id="backgroundSelect"
						outlined
						value=${this.backgroundPreference}
						@selected=${this.handleBackgroundChange}
						@change=${this.handleBackgroundChange}
					>
						<mwc-list-item value="classic">Classic</mwc-list-item>
						<mwc-list-item value="none">None</mwc-list-item>
					</mwc-select>
				</div>
				<p class="helper">
					Classic uses the default themed image. None removes the background image.
				</p>
			</div>
		`
	}
}

window.customElements.define('display-view', DisplayView)
