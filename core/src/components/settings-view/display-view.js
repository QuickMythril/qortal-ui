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

			mwc-select {
				--mdc-theme-surface: var(--plugback);
				--mdc-theme-on-surface: var(--black);
				--mdc-theme-text-primary-on-background: var(--black);
				--mdc-theme-text-primary-on-surface: var(--black);
				--mdc-text-field-fill-color: var(--plugback);
				--mdc-text-field-ink-color: var(--black);
				--mdc-text-field-label-ink-color: var(--sectxt);
				--mdc-text-field-outlined-idle-border-color: var(--txtfieldborder);
				--mdc-text-field-outlined-hover-border-color: var(--txtfieldhoverborder);
				--mdc-text-field-focused-label-color: var(--mdc-theme-primary);
				--mdc-select-dropdown-icon-color: var(--black);
				width: 100%;
			}

			.preview {
				border: 1px solid var(--border);
				border-radius: 6px;
				overflow: hidden;
				width: 100%;
				max-width: 360px;
				box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
			}

			.preview img {
				width: 100%;
				display: block;
			}
		`]
	}

	constructor() {
		super()
		this.backgroundPreference = getBackgroundPreference()
		this.theme = localStorage.getItem('qortalTheme') ? localStorage.getItem('qortalTheme') : 'light'
	}

	connectedCallback() {
		super.connectedCallback()

		this._handleThemeChange = e => {
			if (e?.detail) {
				this.theme = e.detail
			}
		}

		window.addEventListener('qort-theme-change', this._handleThemeChange)
	}

	disconnectedCallback() {
		window.removeEventListener('qort-theme-change', this._handleThemeChange)
		super.disconnectedCallback()
	}

	firstUpdated() {
		const docTheme = typeof document !== 'undefined' ? document.documentElement.getAttribute('theme') : null

		if (docTheme) {
			this.theme = docTheme
		}

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

	getPreviewUrl() {
		const currentTheme = typeof document !== 'undefined'
			? document.documentElement.getAttribute('theme') || this.theme
			: this.theme

		return currentTheme === 'dark' ? '/img/qortal_background_dark_.jpg' : '/img/qortal_background_light_.jpg'
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
				${this.backgroundPreference === 'classic' ? html`
					<div class="preview" aria-label="Background preview">
						<img src="${this.getPreviewUrl()}" alt="Classic background preview">
					</div>
				` : null}
				<p class="helper">
					Classic uses the default themed image. None removes the background image.
				</p>
			</div>
		`
	}
}

window.customElements.define('display-view', DisplayView)
