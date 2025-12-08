import { html, LitElement } from 'lit'
import { render } from 'lit/html.js'
import { repeat } from 'lit/directives/repeat.js'
import { connect } from 'pwa-helpers'
import { store } from '../store'
import { Epml } from '../epml'
import { addPluginRoutes } from '../plugins/addPluginRoutes'
import { setIsOpenDevDialog, setNewTab } from '../redux/app/app-actions'
import { defaultQappsTabs } from '../data/defaultQapps'
import { showPluginStyles, navBarStyles, appAvatarStyles } from '../styles/core-css'
import FileSaver from 'file-saver'
import ShortUniqueId from 'short-unique-id'
import '../functional-components/frag-file-input'
import '@material/mwc-button'
import '@material/mwc-dialog'
import '@material/mwc-icon'
import '@material/mwc-textfield'
import '@polymer/iron-icons/iron-icons.js'
import '@polymer/paper-dialog/paper-dialog.js'
import '@polymer/paper-icon-button/paper-icon-button.js'
import '@vaadin/grid'
import '@vaadin/text-field'

// Multi language support
import { get, registerTranslateConfig, translate, use } from '../../translate'
import { buildRequestUrl, getSelectedNodeBaseUrl, isSelectedNodePublic } from '../utils/node'

registerTranslateConfig({
	loader: lang => fetch(`/language/${lang}.json`).then(res => res.json())
})

export const parentEpml = new Epml({ type: 'WINDOW', source: window.parent })

class ShowPlugin extends connect(store)(LitElement) {
	static get properties() {
		return {
			app: { type: Object },
			pluginConfig: { type: Object },
			url: { type: String },
			linkParam: { type: String },
			registeredUrls: { type: Array },
			currentTab: { type: Number },
			tabs: { type: Array },
			theme: { type: String, reflect: true },
			tabInfo: { type: Object },
			chatLastSeen: { type: Array },
			chatHeads: { type: Array },
			proxyPort: { type: Number },
			isOpenDevDialog: { type: Boolean }
		}
	}

	static get styles() {
		return [showPluginStyles]
	}

	constructor() {
		super()
		this.registeredUrls = []
		this.initialRegisteredUrls = []
		this.currentTab = 0
		this.tabs = []
		this.uid = new ShortUniqueId()
		this.tabInfo = {}
		this.chatLastSeen = []
		this.chatHeads = []
		this.proxyPort = 0
		this.isOpenDevDialog = false
		this.theme = localStorage.getItem('qortalTheme') ? localStorage.getItem('qortalTheme') : 'light'
	}

	render() {
		const plugSrc = (myPlug) => {
			return myPlug === undefined ? 'about:blank' : `${window.location.origin}/plugin/${myPlug.domain}/${myPlug.page}${this.linkParam}`
		}

		return html`
			<div id="showPluginId" style="width:0px"></div>
			<div class="tabs">
				${this.tabs.map((tab, index) => {
		let title = ''
		let icon = ''
		let count = 0

		if (tab.myPlugObj && tab.myPlugObj.title === 'Overview Page') {
			title = html`${translate('tabmenu.tm28')}`
		} else if (tab.myPlugObj && tab.myPlugObj.title === 'Minting Details') {
			title = html`${translate('tabmenu.tm1')}`
		} else if (tab.myPlugObj && tab.myPlugObj.title === 'Become a Minter') {
			title = html`${translate('tabmenu.tm2')}`
		} else if (tab.myPlugObj && tab.myPlugObj.title === 'Sponsorship List') {
			title = html`${translate('tabmenu.tm3')}`
		} else if (tab.myPlugObj && tab.myPlugObj.title === 'Wallets') {
			title = html`${translate('tabmenu.tm4')}`
		} else if (tab.myPlugObj && tab.myPlugObj.title === 'Trade Portal') {
			title = html`${translate('tabmenu.tm5')}`
		} else if (tab.myPlugObj && tab.myPlugObj.title === 'Auto Buy') {
			title = html`${translate('tabmenu.tm6')}`
		} else if (tab.myPlugObj && tab.myPlugObj.title === 'Reward Share') {
			title = html`${translate('tabmenu.tm7')}`
		} else if (tab.myPlugObj && tab.myPlugObj.title === 'Q-Chat') {
			title = html`${translate('tabmenu.tm8')}`
		} else if (tab.myPlugObj && tab.myPlugObj.title === 'Name Registration') {
			title = html`${translate('tabmenu.tm9')}`
		} else if (tab.myPlugObj && tab.myPlugObj.title === 'Names Market') {
			title = html`${translate('tabmenu.tm10')}`
		} else if (tab.myPlugObj && tab.myPlugObj.title === 'Websites') {
			title = html`${translate('tabmenu.tm11')}`
		} else if (tab.myPlugObj && tab.myPlugObj.title === 'Q-Apps') {
			title = html`${translate('tabmenu.tm12')}`
		} else if (tab.myPlugObj && tab.myPlugObj.title === 'Group Management') {
			title = html`${translate('tabmenu.tm13')}`
		} else if (tab.myPlugObj && tab.myPlugObj.title === 'Data Management') {
			title = html`${translate('tabmenu.tm14')}`
		} else if (tab.myPlugObj && tab.myPlugObj.title === 'Puzzles') {
			title = html`${translate('tabmenu.tm15')}`
		} else if (tab.myPlugObj && tab.myPlugObj.title === 'Node Management') {
			title = html`${translate('tabmenu.tm16')}`
		} else if (tab.myPlugObj && tab.myPlugObj.title === 'Qortal Lottery') {
			title = html`${translate('tabmenu.tm42')}`
		} else if (tab.myPlugObj && tab.myPlugObj.url === 'myapp') {
			title = tab.myPlugObj && tab.myPlugObj.title
		} else if (tab.myPlugObj && tab.myPlugObj.url === 'devmode') {
			title = html`${translate('tabmenu.tm38')}`
		} else {
			title = html`${translate('tabmenu.tm17')}`
		}

		if (tab.myPlugObj && tab.myPlugObj.mwcicon) {
			icon = tab.myPlugObj.mwcicon
		} else {
			icon = 'tab'
		}

		if (tab.myPlugObj && (tab.myPlugObj.url === 'myapp') && this.tabInfo[tab.id]) {
			title = this.tabInfo[tab.id].name
		}

		if (tab.myPlugObj && (tab.myPlugObj.url === 'myapp') && this.tabInfo[tab.id]) {
			count = this.tabInfo[tab.id].count
		}

		if (tab.myPlugObj && tab.myPlugObj.url === 'q-chat') {
			for (const chat of this.chatHeads) {
				const lastReadMessage = this.chatLastSeen.find((ch) => {
					let id

					if (chat.groupId === 0) {
						id = chat.groupId
					} else if (chat.groupId) {
						id = chat.groupId
					} else {
						id = chat.address
					}

					return ch.key.includes(id)
				})

				if (lastReadMessage && lastReadMessage.timestamp < chat.timestamp) {
					count = count + 1
				}
			}
		}

		return html`
						<div
							id="tab-${tab.id}"
							class="tab ${this.currentTab === index ? 'active' : ''}"
							@click="${() => {
		this.currentTab = index
	}}"
							@mousedown="${(event) => {
		if (event.button === 1) {
			event.preventDefault()
			this.removeTab(index, tab.id)
		}
	}}"
						>
							<div id="icon-${tab.id}" class="${this.currentTab === index ? 'iconActive' : 'iconInactive'}">
								${tab.myPlugObj && tab.myPlugObj.url === 'myapp' ?
		html`
										<tab-avatar appname=${title} appicon=${icon}></tab-avatar>
									` : html`
										<mwc-icon>${icon}</mwc-icon>
									`
}
							</div>
							<div class="tabCard">
								${count ?
		html`
										<span class="tabTitle ml-30">${title}</span>
										<span class="count ml-5">${count}</span>
										<span class="show ml-25">
											<mwc-icon class="close" @click=${(event) => { event.stopPropagation(); this.removeTab(index, tab.id)}}>
												close
											</mwc-icon>
										</span>
									` : html`
										<span class="tabTitle ml-30">${title}</span>
										<span class="show ml-25">
											<mwc-icon class="close" @click=${(event) => { event.stopPropagation(); this.removeTab(index, tab.id)}}>
												close
											</mwc-icon>
										</span>
									`
}
							</div>
						</div>
					`
	})}
				<button
					class="add-tab-button"
					title="${translate('tabmenu.tm18')}"
					@click=${() => {
		const lengthOfTabs = this.tabs.length
		this.addTab({
			url: '',
			id: this.uid.rnd()
		})
		this.currentTab = lengthOfTabs
	}}
				>+</button>
			</div>
			${repeat(this.tabs, (tab) => tab.id, (tab, index) =>
		html`
					<div id="frame-${tab.id}" class=${this.currentTab === index ? 'showIframe' : 'hideIframe'}>
						<iframe
							src="${plugSrc(tab.myPlugObj)}"
							data-id=${tab.id}
							id="showPluginFrame${index}" 
							style="width:100%; height: calc(var(--window-height) - 102px); border: 0; padding: 0; margin: 0;"
							class=${!tab.myPlugObj ? 'hideIframe' : ''}
						></iframe>
						<nav-bar
							id="plug-${tab.id}"
							class=${!tab.myPlugObj ? 'showIframe' : 'hideIframe'}
							.registeredUrls=${this.registeredUrls}
							.changePage=${(val) => this.changePage(val)}
						></nav-bar>
					</div>
				`
	)}
			<mwc-dialog
				id="addDevDialog"
				?open=${this.isOpenDevDialog}
				@closed=${() => {
		this.shadowRoot.getElementById('domainInput').value = ''
		this.shadowRoot.getElementById('portInput').value = ''
		this.isOpenDevDialog = false
		store.dispatch(setIsOpenDevDialog(false))
	}}
			>
				<div style="text-align: center;">
					<h2>${translate('tabmenu.tm39')}</h2>
					<hr>
				</div>
				<p>
					<mwc-textfield id="domainInput" style="width:100%; color: var(--black);" required outlined label="${translate('settings.domain')}"></mwc-textfield>
				</p>
				<p>
					<mwc-textfield id="portInput" style="width:100%; color: var(--black);" required outlined label="${translate('settings.port')}"></mwc-textfield>
				</p>
				<mwc-button slot="secondaryAction" dialogAction="close" class="red">
					${translate('general.close')}
				</mwc-button>
				<mwc-button slot="primaryAction" @click="${this.getProxyPort}">
					${translate('tabmenu.tm40')}
				</mwc-button>
			</mwc-dialog>
		`
	}

	firstUpdated() {
		this.changeLanguage()

		this.tabs.forEach((tab, index) => {
			const frame = this.shadowRoot.getElementById(`showPluginFrame${index}`)
			this.createEpmlInstance(frame, index)
		})

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

	async getUpdateComplete() {
		await super.getUpdateComplete()

		return true
	}

	async getProxyPort() {
		this.proxyPort = 0
		let framework = ''

		const domain = this.shadowRoot.getElementById('domainInput').value
		const port = this.shadowRoot.getElementById('portInput').value

		if (domain.length >= 3 && port.length >= 2) {
			framework = domain + ':' + port
		} else {
			let errorString = get('tabmenu.tm41')
			parentEpml.request('showSnackBar', `${errorString}`)

			return
		}

		let framePort = await parentEpml.request('apiCall', {
			url: '/developer/proxy/start',
			method: 'POST',
			headers: {
				'Content-Type': 'text/plain'
			},
			body: `${framework}`
		})

		this.createUrl(framePort)
	}

	createUrl(framePort) {
		this.proxyPort = framePort
		const baseUrl = getSelectedNodeBaseUrl(store.getState())
		if (!baseUrl) return
		const proxyUrl = new URL(baseUrl)
		proxyUrl.port = this.proxyPort
		const myFrameNodeUrl = proxyUrl.origin

		this.changePage({
			'url': 'devmode',
			'domain': 'core',
			'page': `qdn/browser/index.html?link=${myFrameNodeUrl}&dev=FRAMEWORK`,
			'title': 'Dev Server',
			'icon': 'vaadin:desktop',
			'mwcicon': 'api',
			'menus': [],
			'parent': false
		})

		this.shadowRoot.querySelector('#addDevDialog').close()
	}

	async addTab(tab) {
		if (this.tabs == []) {
			// ...Nothing to do
		} else {
			this.tabs.forEach((rac, index) => {
				let racId = ''
				let tabRacId = ''
				let frameRacId = ''
				let plugRacId = ''
				let iconRacId = ''

				racId = rac.id
				tabRacId = 'tab-' + racId
				frameRacId = 'frame-' + racId
				plugRacId = 'plug-' + racId
				iconRacId = 'icon-' + racId

				const plugObjRac = rac.url

				var tabActiveRac = this.shadowRoot.getElementById(tabRacId)
				var frameActiveRac = this.shadowRoot.getElementById(frameRacId)
				var plugActiveRac = this.shadowRoot.getElementById(plugRacId)
				var iconActiveRac = this.shadowRoot.getElementById(iconRacId)

				if (plugObjRac === undefined || '') {
					tabActiveRac.classList.remove('active')
					iconActiveRac.classList.remove('iconActive')
					iconActiveRac.classList.add('iconInactive')
					plugActiveRac.classList.remove('showIframe')
					plugActiveRac.classList.add('hideIframe')
				} else {
					tabActiveRac.classList.remove('active')
					iconActiveRac.classList.remove('iconActive')
					iconActiveRac.classList.add('iconInactive')
					frameActiveRac.classList.remove('showIframe')
					frameActiveRac.classList.add('hideIframe')
				}
			})
		}

		this.tabs = [...this.tabs, tab]

		await this.getUpdateComplete()

		// add the new tab to the tabs array
		const newIndex = this.tabs.length - 1

		// render the tab and wait for it to be added to the DOM
		const frame = this.shadowRoot.getElementById(`showPluginFrame${newIndex}`)
		this.createEpmlInstance(frame, newIndex)
	}

	removeTab(index, tabA) {
		const tabB = this.tabs.length - 1
		const tabC = this.tabs[tabB].id

		if (tabC === tabA) {
			let theId = ''
			let tabId = ''
			let frameId = ''
			let plugId = ''
			let iconId = ''

			this.tabs = this.tabs.filter((tab, tIndex) => tIndex !== index)
			this.currentTab = this.tabs.length - 1

			const tabD = this.tabs.length - 1

			if (tabD < 0) {
				const lengthOfTabs = this.tabs.length
				this.addTab({
					url: '',
					id: this.uid.rnd()
				})
				this.currentTab = lengthOfTabs
			} else {
				const plugObj = this.tabs[tabD].url
				theId = this.tabs[tabD].id
				tabId = 'tab-' + theId
				frameId = 'frame-' + theId
				plugId = 'plug-' + theId
				iconId = 'icon-' + theId

				var tabActive = this.shadowRoot.getElementById(tabId)
				var frameActive = this.shadowRoot.getElementById(frameId)
				var plugActive = this.shadowRoot.getElementById(plugId)
				var iconActive = this.shadowRoot.getElementById(iconId)

				if (plugObj === undefined || '') {
					tabActive.classList.add('active')
					iconActive.classList.remove('iconInactive')
					iconActive.classList.add('iconActive')
					plugActive.classList.remove('hideIframe')
					plugActive.classList.add('showIframe')
				} else {
					tabActive.classList.add('active')
					iconActive.classList.remove('iconInactive')
					iconActive.classList.add('iconActive')
					frameActive.classList.remove('hideIframe')
					frameActive.classList.add('showIframe')
				}

				this.requestUpdate()
			}
		} else {
			// Remove tab from array
			this.tabs = this.tabs.filter((tab, tIndex) => tIndex !== index)

			if (this.tabs.length !== 0) {
				this.currentTab = 0
			}

			this.requestUpdate()
		}
	}

	createEpmlInstance(frame, index) {
		const showingPluginEpml = new Epml({
			type: 'WINDOW',
			source: frame.contentWindow
		})

		addPluginRoutes(showingPluginEpml)

		showingPluginEpml.imReady()

		// store Epml instance in tab for later use
		this.tabs[index].epmlInstance = showingPluginEpml

		// Register each instance with a unique identifier
		Epml.registerProxyInstance(`visible-plugin-${index}`, showingPluginEpml)
	}

	updated(changedProps) {
		if (changedProps.has('url') || changedProps.has('registeredUrls')) {
			const plugArr = []

			this.registeredUrls.forEach(myPlugArr => {
				myPlugArr.menus.length === 0 ? plugArr.push(myPlugArr) : myPlugArr.menus.forEach(i => plugArr.push(myPlugArr, i))
			})

			const myPlugObj = plugArr.find(pagePlug => {
				return pagePlug.url === this.url
			})

			if (this.tabs.length === 0) {
				this.addTab({
					url: '',
					id: this.uid.rnd()
				})
			} else {
				const copiedTabs = [...this.tabs]

				copiedTabs[this.currentTab] = {
					...copiedTabs[this.currentTab],
					url: this.url,
					myPlugObj
				}

				this.tabs = copiedTabs
			}

			this.requestUpdate()
		}

		if (changedProps.has('computerUrl')) {
			if (this.computedUrl !== 'about:blank') {
				this.loading = true
			}
		}
	}

	changePage(page) {
		const copiedTabs = [...this.tabs]

		copiedTabs[this.currentTab] = {
			...copiedTabs[this.currentTab],
			myPlugObj: page,
			url: page.url
		}

		this.tabs = copiedTabs
	}

	async stateChanged(state) {
		const split = state.app.url.split('/')
		const newRegisteredUrls = state.app.registeredUrls

		let newUrl, newLinkParam

		if (newRegisteredUrls !== this.registeredUrls) {
			this.registeredUrls = newRegisteredUrls
		}

		if (split[0] === '' && split[1] === 'app' && split[2] === undefined) {
			newUrl = ''
			newLinkParam = ''
		} else if (split.length === 5 && split[1] === 'app') {
			newUrl = split[2]
			newLinkParam = split[3] === undefined ? '' : '?' + split[3] + '/' + split[4]
		} else if (split[1] === 'app') {
			newUrl = split[2]
			newLinkParam = ''
		} else {
			newUrl = '404'
			newLinkParam = ''
		}

		if (newUrl !== this.url) {
			this.url = newUrl
		}

		if (newLinkParam !== this.linkParam) {
			this.linkParam = newLinkParam
		}

		if (this.tabInfo !== state.app.tabInfo) {
			this.tabInfo = state.app.tabInfo
		}

		if (this.chatLastSeen !== state.app.chatLastSeen) {
			this.chatLastSeen = state.app.chatLastSeen
		}

		if (state.app.chatHeads !== this.unModifiedChatHeads) {
			let chatHeads = []

			if (state.app.chatHeads && state.app.chatHeads.groups) {
				chatHeads = [...chatHeads, ...state.app.chatHeads.groups]
			}

			if (state.app.chatHeads && state.app.chatHeads.direct) {
				chatHeads = [...chatHeads, ...state.app.chatHeads.direct]
			}

			this.chatHeads = chatHeads
			this.unModifiedChatHeads = state.app.chatHeads
		}

		if (state.app.newTab) {
			const newTab = state.app.newTab

			if (newTab.openExisting && this.tabs.find((tab) => tab.url === newTab.url)) {
				const findIndex = this.tabs.findIndex((tab) => tab.url === newTab.url)
				if (findIndex !== -1) {
					this.currentTab = findIndex
				}

				store.dispatch(setNewTab(null))
			} else if (!this.tabs.find((tab) => tab.id === newTab.id)) {
				await this.addTab(newTab)

				this.currentTab = this.tabs.length - 1

				//clear newTab
				store.dispatch(setNewTab(null))
			} else {
				const findIndex = this.tabs.findIndex((tab) => tab.id === newTab.id)
				if (findIndex !== -1) {
					const copiedTabs = [...this.tabs]
					copiedTabs[findIndex] = newTab
					this.tabs = copiedTabs
					this.currentTab = findIndex
				}

				//clear newTab
				store.dispatch(setNewTab(null))
			}
		}

		if (state.app.isOpenDevDialog) {
			this.isOpenDevDialog = state.app.isOpenDevDialog
		}
	}
}

window.customElements.define('show-plugin', ShowPlugin)

class NavBar extends connect(store)(LitElement) {
	static get properties() {
		return {
			menuList: { type: Array },
			newMenuList: { type: Array },
			myMenuList: { type: Array },
			myMenuPlugins: { type: Array },
			myApps: { type: Array },
			changePage: { attribute: false },
			pluginName: { type: String },
			pluginType: { type: String },
			pluginPage: { type: String },
			mwcIcon: { type: String },
			pluginNameToDelete: { type: String },
			pluginNumberToDelete: { type: String },
			textFieldDisabled: { type: Boolean },
			initialName: { type: String },
			newId: { type: String },
			removeTitle: { type: String },
			myFollowedNames: { type: Array },
			myFollowedNamesList: { type: Array },
			searchNameContentString: { type: String },
			searchNameResources: { type: Array },
			addressInfo: { type: Object },
			folderDialogOpen: { type: Boolean },
			activeFolderId: { type: String },
			activeFolderName: { type: String }
		}
	}

	static get styles() {
		return [navBarStyles]
	}

	constructor() {
		super()
		this.menuList = []
		this.newMenuList = []
		this.myMenuList = []
		this.myMenuPlugins = []
		this.pluginName = ''
		this.pluginType = ''
		this.pluginPage = ''
		this.myApps = ''
		this.mwcIcon = ''
		this.pluginNameToDelete = ''
		this.pluginNumberToDelete = ''
		this.textFieldDisabled = false
		this.initialName = ''
		this.newId = ''
		this.removeTitle = ''
		this.myFollowedNames = []
		this.myFollowedNamesList = []
		this.searchContentString = ''
		this.searchNameResources = []
		this.addressInfo = store.getState().app.accountInfo.addressInfo
		this.folderDialogOpen = false
		this.activeFolderId = ''
		this.activeFolderName = 'New Folder'
		this._draggingId = null
		this._lastHoverTarget = null
		this._hasDragged = false
		this._updateMyMenuPlugins = this._updateMyMenuPlugins.bind(this)
	}

	render() {
		return html`
			<div class="parent">
				<mwc-icon class="resetIcon" @click="${() => this.resetMenu()}" title="${translate('tabmenu.tm29')}">reset_tv</mwc-icon>
				<mwc-icon class="searchIcon" @click="${() => this.openNameSearch()}" title="${translate('tabmenu.tm30')}">person_search</mwc-icon>
				<mwc-icon class="importIcon" @click="${() => this.openImportDialog()}" title="${translate('tabmenu.tm33')}">upload</mwc-icon>
				<mwc-icon class="exportIcon" @click="${() => this.exportTabMenu()}" title="${translate('tabmenu.tm34')}">download</mwc-icon>
				<div class="navbar">
					<input @keydown=${this._handleKeyDown} id="linkInput" type="text" placeholder="qortal://">
					<button @click="${this.handlePasteLink}">${translate('general.open')}</button>
				</div>
				<div class="app-list">
					${repeat(this.myMenuList, (plugin) => plugin.pluginNumber || plugin.url, (plugin, index) => html`
						<div
							class="app-icon ${plugin.type === 'folder' ? 'folder-tile' : ''}"
							draggable="true"
							data-id=${plugin.pluginNumber}
							@dragstart=${(e) => this.handleDragStart(e, plugin.pluginNumber)}
							@dragover=${(e) => this.handleDragOver(e, plugin.pluginNumber)}
							@dragleave=${this.handleDragLeave}
							@drop=${(e) => this.handleDrop(e, plugin.pluginNumber)}
							@dragend=${this.handleDragEnd}
							@click=${() => this.handleTileClick(plugin)}
						>
							<div class="app-icon-box ${plugin.type === 'folder' ? 'folder' : ''}">
								${this.renderRemoveIcon(plugin, () => this.handleTileClick(plugin))}
							</div>
							${this.renderTitle(plugin)}
						</div>
					`)}
					<div class="app-icon" draggable="false" @click="${() => this.openAddNewPlugin()}">
						<div class="app-icon-box">
							<mwc-icon class="menuIcon">add</mwc-icon>
						</div>
						<span class="text" title="${translate('tabmenu.tm19')}">${translate('tabmenu.tm19')}</span>
					</div>
				</div>
			</div>
			<mwc-dialog id="addNewPlugin" scrimClickAction="" escapeKeyAction="">
				<div style="text-align:center">
					<h2>${translate('tabmenu.tm26')}</h2>
					<hr>
					<br>
				</div>
				<p>
					${translate('tabmenu.tm24')}
					<select
						required
						@change="${() => this.val()}"
						validationMessage="${translate('grouppage.gchange14')}"
						id="pluginTypeInput"
						label="${translate('tabmenu.tm24')}"
					>
						<option value="reject" selected>${translate('grouppage.gchange15')}</option>
						<option style="margin-top: 10px;" value="0">${translate('tabmenu.tm20')}</option>
						<option style="margin-top: 10px;" value="1">${translate('tabmenu.tm21')}</option>
						<option disabled style="font-size: 0.25em;"></option>
						<option disabled style="background: #666; font-size: 0.1px;"></option>
						<option disabled style="font-size: 0.50em;"></option>
						${this.filterSelectMenu()}
					</select>
				</p>
				<p>
					<mwc-textfield
						?disabled="${this.textFieldDisabled}"
						style="width: 100%; color: var(--black);"
						outlined
						id="pluginNameInput"
						label="${translate('login.name')}"
						type="text"
						value="${this.initialName}"
					></mwc-textfield>
				</p>
				<mwc-button slot="primaryAction" @click=${this.addToMyMenuPlugins}>
					${translate('tabmenu.tm19')}
				</mwc-button>
				<mwc-button slot="secondaryAction" dialogAction="cancel" class="red">
					${translate('general.close')}
				</mwc-button>
			</mwc-dialog>
			<mwc-dialog id="removePlugin" scrimClickAction="" escapeKeyAction="">
				<div style="text-align:center">
					<h2>${translate('tabmenu.tm27')}</h2>
					<hr>
					<br>
				</div>
				<p style="text-align:center">${translate('tabmenu.tm23')}</p>
				<h3 style="text-align:center">${this.removeTitle}</h3>
				<mwc-button slot="primaryAction" @click=${this.removeAppFromArray}>
					${translate('general.yes')}
				</mwc-button>
				<mwc-button slot="secondaryAction" dialogAction="cancel" class="red">
					${translate('general.no')}
				</mwc-button>
			</mwc-dialog>
			<mwc-dialog id="folderDialog" ?open=${this.folderDialogOpen} @closed=${() => this.closeFolder()}>
				<div class="folder-modal-header">
					<mwc-textfield
						style="width: 100%; color: var(--black);"
						outlined
						label="Folder Name"
						.value=${this.activeFolderName}
						?disabled=${!this.folderDialogOpen}
						@input=${this.handleFolderNameInput}
					></mwc-textfield>
				</div>
				<div class="folder-modal-grid">
					${this.getActiveFolderChildren().map((child) => html`
						<div class="folder-child" @click=${() => this.handleFolderChildClick(child)}>
							<div class="app-icon-box">
								${child.url === 'myapp'
		? html`<app-avatar appicon=${child.mwcicon} appname=${child.title}></app-avatar>`
		: html`<mwc-icon class="menuIcon">${child.mwcicon || 'apps'}</mwc-icon>`}
							</div>
							<div class="text">${child.title}</div>
							<div class="folder-child-actions">
								<button @click=${(e) => { e.stopPropagation(); this.removeFromFolder(child.pluginNumber, this.activeFolderId) }}>Remove</button>
							</div>
						</div>
					`)}
					${this.getActiveFolderChildren().length === 0 ? html`<p class="empty-folder">No items</p>` : ''}
				</div>
				<mwc-button slot="primaryAction" dialogAction="close">
					${translate('general.close')}
				</mwc-button>
			</mwc-dialog>
			<paper-dialog id="searchNameDialog" class="searchSettings" vertical-align="top" horizontal-align="center" dynamic-align>
				<div style="display: inline;">
					<div class="search">
						<vaadin-text-field
							style="width: 350px"
							id="searchNameContent"
							placeholder="${translate('appspage.schange33')}"
							value="${this.searchNameContentString}"
							@keydown="${this.searchNameKeyListener}"
							clear-button-visible
							autofocus
						></vaadin-text-field>
						<paper-icon-button icon="icons:search" @click="${() => this.searchNameResult()}" title="${translate('websitespage.schange35')}"></paper-icon-button>
						<paper-icon-button icon="icons:close" @click="${() => this.closeNameSearch()}" title="${translate('general.close')}"></paper-icon-button>
					</div>
				</div>
				<br>
				<div class="divCard">
					<vaadin-grid theme="wrap-cell-content" id="searchNameGrid" ?hidden="${this.isEmptyArray(this.searchNameResources)}" .items="${this.searchNameResources}" aria-label="Search Name">
						<vaadin-grid-column
							width="6rem"
							flex-grow="0" header="${translate('appspage.schange5')}"
							.renderer=${(root, column, data) => {
		render(html`${this.renderNameAvatar(data.item)}`, root)
	}}
						></vaadin-grid-column>
						<vaadin-grid-column
							width="12rem"
							flex-grow="0"
							header="${translate('datapage.dchange5')}"
							.renderer=${(root, column, data) => {
		render(html`${data.item.name}`, root)
	}}
						></vaadin-grid-column>
						<vaadin-grid-column
							width="10rem"
							flex-grow="0"
							header="${translate('appspage.schange8')}"
							.renderer=${(root, column, data) => {
		render(html`${this.renderMyFollowUnfollowButton(data.item)}`, root)
	}}
						></vaadin-grid-column>
					</vaadin-grid>
					${this.isEmptyArray(this.searchNameResources) ? html`
						<span style="color: var(--black); text-align: center; font-size: 16px;">${translate('login.entername')}</span>
					`: ''}
				</div>
				<div style="text-align: right;">
					<button @click="${this.openMyFollowedNames}">${translate('tabmenu.tm31')}</button>
				</div>
			</paper-dialog>
			<paper-dialog id="myFollowedNamesDialog" class="searchSettings" vertical-align="top" horizontal-align="center" dynamic-align>
				<div style="text-align:center">
					<h2>${translate('tabmenu.tm31')}</h2>
					<hr>
				</div>
				<div class="divCard">
					<vaadin-grid theme="wrap-cell-content" id="followedNameGrid" ?hidden="${this.isEmptyArray(this.myFollowedNamesList)}" .items="${this.myFollowedNamesList}" aria-label="My Followed Bames">
						<vaadin-grid-column
							width="6rem"
							flex-grow="0" header="${translate('appspage.schange5')}"
							.renderer=${(root, column, data) => {
		render(html`${this.renderNameAvatar(data.item)}`, root)
	}}
						></vaadin-grid-column>
						<vaadin-grid-column
							width="12rem"
							flex-grow="0"
							header="${translate('datapage.dchange5')}"
							.renderer=${(root, column, data) => {
		render(html`${data.item.name}`, root)
	}}
						></vaadin-grid-column>
						<vaadin-grid-column
							width="10rem"
							flex-grow="0"
							header="${translate('appspage.schange8')}"
							.renderer=${(root, column, data) => {
		render(html`${this.renderMyFollowUnfollowButton(data.item)}`, root)
	}}
						></vaadin-grid-column>
					</vaadin-grid>
					${this.isEmptyArray(this.myFollowedNamesList) ? html`
						<span style="color: var(--black); text-align: center; font-size: 16px;">${translate('tabmenu.tm32')}</span>
					`: ''}
				</div>
				<div style="display: flex; justify-content: space-between;">
					<button @click="${this.openNameSearch}">${translate('websitespage.schange35')}</button>
					<button style="background-color: red;" @click="${this.closeMyFollowedNames}">${translate('general.close')}</button>
				</div>
			</paper-dialog>
			<mwc-dialog id="importTabMenutDialog">
				<div style="text-align:center">
					<h2>${translate('tabmenu.tm33')}</h2>
					<hr>
					<br>
				</div>
				<div style="min-height: 150px; min-width: 500px; box-sizing: border-box; position: relative;">
					<frag-file-input accept=".tabmenu" @file-read-success="${(e) => this.importTabMenu(e.detail.result)}"></frag-file-input>
					<h4 style="color: #F44336; text-align: center;">${translate('walletpage.wchange56')}</h4>
					<h5 style="text-align: center;">${translate('tabmenu.tm35')}</h5>
				</div>
				<mwc-button slot="primaryAction" dialogAction="cancel" class="red">
					${translate('general.close')}
				</mwc-button>
			</mwc-dialog>
		`
	}

	async firstUpdated() {
		addPluginRoutes(parentEpml)
		parentEpml.imReady()

		this.addressInfo = store.getState().app.accountInfo.addressInfo
		this.menuList = store.getState().app.registeredUrls

		const addressInfo = this.addressInfo
		const isMinter = addressInfo?.error !== 124 && +addressInfo?.level > 0
		const isSponsor = +addressInfo?.level >= 5
		const appDelay = ms => new Promise(res => setTimeout(res, ms))

		await this.checkMyMenuPlugins()

		await appDelay(250)

		this.refreshMenuListsFromPlugins()

		await appDelay(250)

		await this.getMyFollowedNames()
		await this.getMyFollowedNamesList()
	}

	async _updateMyMenuPlugins(event) {
		await new Promise((res) => {
			setTimeout(() => {
				res()
			}, 500)
		})

		this.myMenuPlugins = event.detail

		this.refreshMenuListsFromPlugins()
	}

	refreshMenuListsFromPlugins() {
		const addressInfo = this.addressInfo
		const isMinter = addressInfo?.error !== 124 && +addressInfo?.level > 0
		const isSponsor = +addressInfo?.level >= 5

		const passesFilter = (item) => {
			if (!item) return false

			if (!isMinter && item.url === 'minting') return false
			if (isMinter && item.url === 'become-minter') return false
			if (!isSponsor && item.url === 'sponsorship-list') return false

			return true
		}

		const filteredList = []

		this.myMenuPlugins.forEach((item) => {
			if (item?.type === 'folder') {
				const children = item.children || []
				const filteredChildren = children.filter(child => passesFilter(child))
				filteredList.push({
					...item,
					children: filteredChildren
				})
			} else if (passesFilter(item)) {
				filteredList.push(item)
			}
		})

		this.newMenuList = filteredList
		this.myMenuList = filteredList

		this.requestUpdate()
	}

	connectedCallback() {
		super.connectedCallback()
		window.addEventListener('myMenuPlugs-event', this._updateMyMenuPlugins)
	}

	disconnectedCallback() {
		window.removeEventListener('myMenuPlugs-event', this._updateMyMenuPlugins)
		super.disconnectedCallback()
	}

	openImportDialog() {
		this.shadowRoot.getElementById('importTabMenutDialog').show()
	}

	importTabMenu(file) {
		let myFile = ''
		myFile = file

		this.myMenuPlugins = []

		localStorage.removeItem('myMenuPlugs')

		const newTabMenu = JSON.parse((myFile) || '[]')
		const copyPayload = [...newTabMenu]

		localStorage.setItem('myMenuPlugs', JSON.stringify(newTabMenu))

		this.saveSettingToTemp(copyPayload)
		this.shadowRoot.getElementById('importTabMenutDialog').close()
		this.myMenuPlugins = JSON.parse(localStorage.getItem('myMenuPlugs') || '[]')
		this.firstUpdated()

		let success5string = get('tabmenu.tm36')

		parentEpml.request('showSnackBar', `${success5string}`)
	}

	exportTabMenu() {
		let tabMenu = ''

		const qortalTabMenu = JSON.stringify(localStorage.getItem('myMenuPlugs'))
		const qortalTabMenuSave = JSON.parse((qortalTabMenu) || '[]')
		const blob = new Blob([qortalTabMenuSave], { type: 'text/plain;charset=utf-8' })

		tabMenu = 'qortal.tabmenu'

		this.saveFileToDisk(blob, tabMenu)
	}

	async saveFileToDisk(blob, fileName) {
		try {
			const fileHandle = await self.showSaveFilePicker({
				suggestedName: fileName,
				types: [{
					description: 'File'
				}]
			})

			const writeFile = async (fileHandle, contents) => {
				const writable = await fileHandle.createWritable()

				await writable.write(contents)
				await writable.close()
			}

			writeFile(fileHandle, blob).then(() => console.log('FILE SAVED'))

			let snack4string = get('tabmenu.tm37')
			parentEpml.request('showSnackBar', `${snack4string} ${fileName}`)
		} catch (error) {
			if (error.name === 'AbortError') {
				return
			}

			FileSaver.saveAs(blob, fileName)

			let snack4string = get('tabmenu.tm37')
			parentEpml.request('showSnackBar', `${snack4string} ${fileName}`)
		}
	}

	openNameSearch() {
		this.searchNameResources = []
		this.shadowRoot.getElementById('searchNameContent').value = ''
		this.shadowRoot.getElementById('myFollowedNamesDialog').close()
		this.shadowRoot.getElementById('searchNameDialog').open()
	}

	closeNameSearch() {
		this.shadowRoot.getElementById('searchNameDialog').close()
	}

	openMyFollowedNames() {
		this.shadowRoot.getElementById('searchNameDialog').close()
		this.shadowRoot.getElementById('myFollowedNamesDialog').open()
		this.getMyFollowedNamesList()
	}

	closeMyFollowedNames() {
		this.shadowRoot.getElementById('myFollowedNamesDialog').close()
	}

	async getMyFollowedNames() {
		if (isSelectedNodePublic(store.getState())) {
			parentEpml.request('showSnackBar', `${get('publicNode.actionBlocked')}`)
			return []
		}

		this.myFollowedNames = await parentEpml.request('apiCall', {
			url: buildRequestUrl('/lists/followedNames', store.getState())
		})
	}

	searchNameKeyListener(e) {
		if (e.key === 'Enter') {
			this.searchNameResult()
		}
	}

	async getMyFollowedNamesList() {
		if (isSelectedNodePublic(store.getState())) {
			parentEpml.request('showSnackBar', `${get('publicNode.actionBlocked')}`)
			return
		}

		const followedNamesUrl = buildRequestUrl('/lists/followedNames', store.getState())

		var myFollowedNamesNew = []

		this.myFollowedNamesList = []

		await fetch(followedNamesUrl).then(response => {
			return response.json()
		}).then(data => {
			return data.map(item => {
				const addListName = {
					name: item
				}
				myFollowedNamesNew.push(addListName)
			})
		})

		this.myFollowedNamesList = myFollowedNamesNew

		if (this.shadowRoot.getElementById('myFollowedNamesDialog').opened) {
			this.shadowRoot.getElementById('myFollowedNamesDialog').notifyResize()
		}
	}

	async searchNameResult() {
		let searchMyName = this.shadowRoot.getElementById('searchNameContent').value

		if (searchMyName.length === 0) {
			let err1string = get('appspage.schange34')
			parentEpml.request('showSnackBar', `${err1string}`)
		} else {
			let searchNameResources = await parentEpml.request('apiCall', {
				url: `/names/search?query=${searchMyName}&prefix=true&limit=0&reverse=true`
			})

			if (this.isEmptyArray(searchNameResources)) {
				let err2string = get('appspage.schange17')
				parentEpml.request('showSnackBar', `${err2string}`)
			} else {
				this.searchNameResources = searchNameResources

				if (this.shadowRoot.getElementById('searchNameDialog').opened) {
					this.shadowRoot.getElementById('searchNameDialog').notifyResize()
				}
			}
		}
	}

	renderNameAvatar(nameObj) {
		let myName = nameObj.name

		const nameUrl = buildRequestUrl(`/arbitrary/THUMBNAIL/${myName}/qortal_avatar?async=true`, store.getState())

		return html`<img src="${nameUrl}" onerror="this.src='/img/incognito.png';">`
	}

	renderMyFollowUnfollowButton(nameObj) {
		let name = nameObj.name

		if (this.myFollowedNames == null || !Array.isArray(this.myFollowedNames)) {
			return html``
		}

		if (this.myFollowedNames.indexOf(name) === -1) {
			return html`<mwc-button @click=${() => this.myFollowName(nameObj)}><mwc-icon>add_to_queue</mwc-icon>&nbsp;${translate('appspage.schange29')}</mwc-button>`
		} else {
			return html`<mwc-button @click=${() => this.myUnfollowName(nameObj)}><mwc-icon>remove_from_queue</mwc-icon>&nbsp;${translate('appspage.schange30')}</mwc-button>`
		}
	}

	async myFollowName(nameObj) {
		if (isSelectedNodePublic(store.getState())) {
			parentEpml.request('showSnackBar', `${get('publicNode.actionBlocked')}`)
			return false
		}

		let name = nameObj.name

		let items = [
			name
		]

		let namesJsonString = JSON.stringify({ 'items': items })

		let ret = await parentEpml.request('apiCall', {
			url: buildRequestUrl('/lists/followedNames', store.getState()),
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: `${namesJsonString}`
		})

		if (ret === true) {
			this.myFollowedNames = this.myFollowedNames.filter(item => item != name)
			this.myFollowedNames.push(name)
		} else {
			let err3string = get('appspage.schange22')
			parentEpml.request('showSnackBar', `${err3string}`)
		}

		await this.getMyFollowedNamesList()

		return ret
	}

	async myUnfollowName(nameObj) {
		if (isSelectedNodePublic(store.getState())) {
			parentEpml.request('showSnackBar', `${get('publicNode.actionBlocked')}`)
			return false
		}

		let name = nameObj.name

		let items = [
			name
		]

		let namesJsonString = JSON.stringify({ 'items': items })

		let ret = await parentEpml.request('apiCall', {
			url: buildRequestUrl('/lists/followedNames', store.getState()),
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: `${namesJsonString}`
		})

		if (ret === true) {
			this.myFollowedNames = this.myFollowedNames.filter(item => item != name)
		} else {
			let err4string = get('appspage.schange23')
			parentEpml.request('showSnackBar', `${err4string}`)
		}

		await this.getMyFollowedNamesList()

		return ret
	}

	async checkMyMenuPlugins() {
		const appDelay = ms => new Promise(res => setTimeout(res, ms))

		if (localStorage.getItem('myMenuPlugs') === null) {
			await appDelay(500)

			const listOfPlugins = this.menuList.filter(plugin => plugin.url !== 'puzzles')
			const addQapps = [...listOfPlugins, ...defaultQappsTabs]
			const myObj = JSON.stringify(addQapps)

			localStorage.setItem('myMenuPlugs', myObj)

			await appDelay(250)

			this.myMenuPlugins = JSON.parse(localStorage.getItem('myMenuPlugs') || '[]')
		} else {
			let newPluginMenu = JSON.parse(localStorage.getItem('myMenuPlugs') || '[]')

			const oldQchat = 'messaging/q-chat/index.html'
			const newQchat = 'q-chat/index.html'
			const oldMinting = 'minting/index.html'
			const newMinting = 'minting-info/index.html'
			const oldWebsites = 'qdn/index.html'
			const newWebsites = 'q-website/index.html'
			const oldDatamanager = 'qdn/data-management/index.html'
			const newDatamanager = 'data-management/index.html'

			// Check if local storage have broken links and replace them
			newPluginMenu.find(a => {
				if (a.page === oldQchat) {
					a.page = newQchat
				} else if (a.page === oldMinting) {
					a.page = newMinting
				} else if (a.page === oldWebsites) {
					a.page = newWebsites
				} else if (a.page === oldDatamanager) {
					a.page = newDatamanager
				} else {}
			})

			localStorage.setItem('myMenuPlugs', JSON.stringify(newPluginMenu))

			await appDelay(250)

			this.myMenuPlugins = JSON.parse(localStorage.getItem('myMenuPlugs') || '[]')
		}
	}

	resetMenu() {
		localStorage.removeItem('myMenuPlugs')
		this.firstUpdated()
	}

	val() {
		const theValue = this.shadowRoot.getElementById('pluginTypeInput').value

		if (theValue === 'reject') {
			this.textFieldDisabled = false
			this.initialName = ''
			this.mwcIcon = ''
		} else if (theValue === '0') {
			this.textFieldDisabled = false
			this.initialName = ''
			this.mwcIcon = ''
		} else if (theValue === '1') {
			this.textFieldDisabled = false
			this.initialName = ''
			this.mwcIcon = ''
		} else if (theValue === 'overview-page') {
			this.mwcIcon = ''
			this.initialName = ''
			this.textFieldDisabled = true
			this.initialName = 'Overview Page'
			this.mwcIcon = 'home'
		} else if (theValue === 'minting') {
			this.mwcIcon = ''
			this.initialName = ''
			this.textFieldDisabled = true
			this.initialName = 'Minting Details'
			this.mwcIcon = 'info_outline'
		} else if (theValue === 'become-minter') {
			this.mwcIcon = ''
			this.initialName = ''
			this.textFieldDisabled = true
			this.initialName = 'Become a Minter'
			this.mwcIcon = 'thumb_up'
		} else if (theValue === 'sponsorship-list') {
			this.mwcIcon = ''
			this.initialName = ''
			this.textFieldDisabled = true
			this.initialName = 'Sponsorship List'
			this.mwcIcon = 'format_list_numbered'
		} else if (theValue === 'wallet') {
			this.mwcIcon = ''
			this.initialName = ''
			this.textFieldDisabled = true
			this.initialName = 'Wallets'
			this.mwcIcon = 'account_balance_wallet'
		} else if (theValue === 'trade-portal') {
			this.mwcIcon = ''
			this.initialName = ''
			this.textFieldDisabled = true
			this.initialName = 'Trade Portal'
			this.mwcIcon = 'format_list_bulleted'
		} else if (theValue === 'trade-bot-portal') {
			this.mwcIcon = ''
			this.initialName = ''
			this.textFieldDisabled = true
			this.initialName = 'Auto Buy'
			this.mwcIcon = 'shop'
		} else if (theValue === 'reward-share') {
			this.mwcIcon = ''
			this.initialName = ''
			this.textFieldDisabled = true
			this.initialName = 'Reward Share'
			this.mwcIcon = 'ios_share'
		} else if (theValue === 'q-chat') {
			this.mwcIcon = ''
			this.initialName = ''
			this.textFieldDisabled = true
			this.initialName = 'Q-Chat'
			this.mwcIcon = 'forum'
		} else if (theValue === 'name-registration') {
			this.mwcIcon = ''
			this.initialName = ''
			this.textFieldDisabled = true
			this.initialName = 'Name Registration'
			this.mwcIcon = 'manage_accounts'
		} else if (theValue === 'names-market') {
			this.mwcIcon = ''
			this.initialName = ''
			this.textFieldDisabled = true
			this.initialName = 'Names Market'
			this.mwcIcon = 'store'
		} else if (theValue === 'websites') {
			this.mwcIcon = ''
			this.initialName = ''
			this.textFieldDisabled = true
			this.initialName = 'Websites'
			this.mwcIcon = 'desktop_mac'
		} else if (theValue === 'qapps') {
			this.mwcIcon = ''
			this.initialName = ''
			this.textFieldDisabled = true
			this.initialName = 'Q-Apps'
			this.mwcIcon = 'apps'
		} else if (theValue === 'group-management') {
			this.mwcIcon = ''
			this.initialName = ''
			this.textFieldDisabled = true
			this.initialName = 'Group Management'
			this.mwcIcon = 'group'
		} else if (theValue === 'data-management') {
			this.mwcIcon = ''
			this.initialName = ''
			this.textFieldDisabled = true
			this.initialName = 'Data Management'
			this.mwcIcon = 'storage'
		} else if (theValue === 'puzzles') {
			this.mwcIcon = ''
			this.initialName = ''
			this.textFieldDisabled = true
			this.initialName = 'Puzzles'
			this.mwcIcon = 'extension'
		} else if (theValue === 'node-management') {
			this.mwcIcon = ''
			this.initialName = ''
			this.textFieldDisabled = true
			this.initialName = 'Node Management'
			this.mwcIcon = 'cloud'
		} else if (theValue === 'lottery') {
			this.mwcIcon = ''
			this.initialName = ''
			this.textFieldDisabled = true
			this.initialName = 'Qortal Lottery'
			this.mwcIcon = 'token'
		}
	}

	filterSelectMenu() {
		const addressInfoSelect = this.addressInfo
		const isMinterSelect = addressInfoSelect?.error !== 124 && +addressInfoSelect?.level > 0
		const isSponsorSelect = +addressInfoSelect?.level >= 5

		if (!isMinterSelect) {
			return html`
				<option value="overview-page">${translate('tabmenu.tm28')}</option>
				<option style="padding-top: 10px;" value="become-minter">${translate('tabmenu.tm2')}</option>
				<option style="padding-top: 10px;" value="wallet">${translate('tabmenu.tm4')}</option>
				<option style="padding-top: 10px;" value="trade-portal">${translate('tabmenu.tm5')}</option>
				<option style="padding-top: 10px;" value="trade-bot-portal">${translate('tabmenu.tm6')}</option>
				<option style="padding-top: 10px;" value="reward-share">${translate('tabmenu.tm7')}</option>
				<option style="padding-top: 10px;" value="q-chat">${translate('tabmenu.tm8')}</option>
				<option style="padding-top: 10px;" value="name-registration">${translate('tabmenu.tm9')}</option>
				<option style="padding-top: 10px;" value="names-market">${translate('tabmenu.tm10')}</option>
				<option style="padding-top: 10px;" value="websites">${translate('tabmenu.tm11')}</option>
				<option style="padding-top: 10px;" value="qapps">${translate('tabmenu.tm12')}</option>
				<option style="padding-top: 10px;" value="group-management">${translate('tabmenu.tm13')}</option>
				<option style="padding-top: 10px;" value="data-management">${translate('tabmenu.tm14')}</option>
				<option style="padding-top: 10px;" value="puzzles">${translate('tabmenu.tm15')}</option>
				<option style="padding-top: 10px;" value="node-management">${translate('tabmenu.tm16')}</option>
				<option style="padding-top: 10px;" value="lottery">${translate('tabmenu.tm42')}</option>
			`
		} else if (isMinterSelect && isSponsorSelect) {
			return html`
				<option value="overview-page">${translate('tabmenu.tm28')}</option>
				<option style="padding-top: 10px;" value="minting">${translate('tabmenu.tm1')}</option>
				<option style="padding-top: 10px;" value="sponsorship-list">${translate('tabmenu.tm3')}</option>
				<option style="padding-top: 10px;" value="wallet">${translate('tabmenu.tm4')}</option>
				<option style="padding-top: 10px;" value="trade-portal">${translate('tabmenu.tm5')}</option>
				<option style="padding-top: 10px;" value="trade-bot-portal">${translate('tabmenu.tm6')}</option>
				<option style="padding-top: 10px;" value="reward-share">${translate('tabmenu.tm7')}</option>
				<option style="padding-top: 10px;" value="q-chat">${translate('tabmenu.tm8')}</option>
				<option style="padding-top: 10px;" value="name-registration">${translate('tabmenu.tm9')}</option>
				<option style="padding-top: 10px;" value="names-market">${translate('tabmenu.tm10')}</option>
				<option style="padding-top: 10px;" value="websites">${translate('tabmenu.tm11')}</option>
				<option style="padding-top: 10px;" value="qapps">${translate('tabmenu.tm12')}</option>
				<option style="padding-top: 10px;" value="group-management">${translate('tabmenu.tm13')}</option>
				<option style="padding-top: 10px;" value="data-management">${translate('tabmenu.tm14')}</option>
				<option style="padding-top: 10px;" value="puzzles">${translate('tabmenu.tm15')}</option>
				<option style="padding-top: 10px;" value="node-management">${translate('tabmenu.tm16')}</option>
				<option style="padding-top: 10px;" value="lottery">${translate('tabmenu.tm42')}</option>
			`
		} else {
			return html`
				<option value="overview-page">${translate('tabmenu.tm28')}</option>
				<option style="padding-top: 10px;" value="minting">${translate('tabmenu.tm1')}</option>
				<option style="padding-top: 10px;" value="wallet">${translate('tabmenu.tm4')}</option>
				<option style="padding-top: 10px;" value="trade-portal">${translate('tabmenu.tm5')}</option>
				<option style="padding-top: 10px;" value="trade-bot-portal">${translate('tabmenu.tm6')}</option>
				<option style="padding-top: 10px;" value="reward-share">${translate('tabmenu.tm7')}</option>
				<option style="padding-top: 10px;" value="q-chat">${translate('tabmenu.tm8')}</option>
				<option style="padding-top: 10px;" value="name-registration">${translate('tabmenu.tm9')}</option>
				<option style="padding-top: 10px;" value="names-market">${translate('tabmenu.tm10')}</option>
				<option style="padding-top: 10px;" value="websites">${translate('tabmenu.tm11')}</option>
				<option style="padding-top: 10px;" value="qapps">${translate('tabmenu.tm12')}</option>
				<option style="padding-top: 10px;" value="group-management">${translate('tabmenu.tm13')}</option>
				<option style="padding-top: 10px;" value="data-management">${translate('tabmenu.tm14')}</option>
				<option style="padding-top: 10px;" value="puzzles">${translate('tabmenu.tm15')}</option>
				<option style="padding-top: 10px;" value="node-management">${translate('tabmenu.tm16')}</option>
				<option style="padding-top: 10px;" value="lottery">${translate('tabmenu.tm42')}</option>
            `
		}
	}

	openAddNewPlugin() {
		this.shadowRoot.getElementById('pluginTypeInput').value = 'reject'
		this.shadowRoot.getElementById('pluginNameInput').value = ''
		this.initialName = ''
		this.textFieldDisabled = false
		this.shadowRoot.querySelector('#addNewPlugin').show()
	}

	async addToMyMenuPlugins() {
		this.newId = ''

		const newUid = new ShortUniqueId({ length: 10 })

		this.newId = 'plugin-' + newUid.rnd()

		this.pluginType = this.shadowRoot.getElementById('pluginTypeInput').value

		if (this.pluginType === 'reject') {
			let myplugerr = get('tabmenu.tm25')
			parentEpml.request('showSnackBar', `${myplugerr}`)

			return false
		} else if (this.pluginType === '0') {
			this.mwcIcon = ''
			this.pluginName = this.shadowRoot.getElementById('pluginNameInput').value

			if (this.pluginName === 'Q-Blog') {
				this.mwcIcon = 'rss_feed'
			} else if (this.pluginName === 'Q-Mail') {
				this.mwcIcon = 'mail'
			} else {
				this.mwcIcon = 'apps'
			}

			var oldMenuPlugs = JSON.parse(localStorage.getItem('myMenuPlugs') || '[]')

			const newMenuPlugsItem = {
				'url': 'myapp',
				'domain': 'core',
				'page': `qdn/browser/index.html?name=${this.pluginName}&service=APP`,
				'title': this.pluginName,
				'icon': 'vaadin:external-browser',
				'mwcicon': this.mwcIcon,
				'pluginNumber': this.newId,
				'menus': [],
				'parent': false
			}

			const validatePluginName = async () => {
				if (this.pluginType === '0' && this.pluginName.length == 0) {
					let myplugstring1 = get('walletpage.wchange50')
					parentEpml.request('showSnackBar', `${myplugstring1}`)
					return false
				}

				let myPluginName = false

				this.myPluginNameRes = []

				await parentEpml.request('apiCall', {
					url: buildRequestUrl(
						`/arbitrary/resources/search?service=APP&query=${this.pluginName}&exactmatchnames=true&limit=1`,
						store.getState()
					)
				}).then(res => {
					this.myPluginNameRes = res
				})

				myPluginName = !(this.myPluginNameRes === undefined || this.myPluginNameRes.length == 0)

				return myPluginName
			}

			let myNameRes = await validatePluginName()

			if (myNameRes !== false) {
				oldMenuPlugs.push(newMenuPlugsItem)

				const copyPayload = [...oldMenuPlugs]

				localStorage.setItem('myMenuPlugs', JSON.stringify(oldMenuPlugs))

				this.saveSettingToTemp(copyPayload)

				let myplugstring2 = get('walletpage.wchange52')

				parentEpml.request('showSnackBar', `${myplugstring2}`)

				this.closeAddNewPlugin()
				this.myMenuPlugins = JSON.parse(localStorage.getItem('myMenuPlugs') || '[]')
				this.firstUpdated()
			} else {
				let myplugstring3 = get('websitespage.schange17')
				parentEpml.request('showSnackBar', `${myplugstring3}`)

				return false
			}
		} else if (this.pluginType === '1') {
			this.mwcIcon = ''

			this.pluginName = this.shadowRoot.getElementById('pluginNameInput').value

			this.mwcIcon = 'web'

			var oldMenuPlugs = JSON.parse(localStorage.getItem('myMenuPlugs') || '[]')

			const newMenuPlugsItem = {
				'url': 'myapp',
				'domain': 'core',
				'page': `qdn/browser/index.html?name=${this.pluginName}&service=WEBSITE`,
				'title': this.pluginName,
				'icon': 'vaadin:external-browser',
				'mwcicon': this.mwcIcon,
				'pluginNumber': this.newId,
				'menus': [],
				'parent': false
			}

			const validatePluginName = async () => {
				if (this.pluginType === '1' && this.pluginName.length == 0) {
					let myplugstring1 = get('walletpage.wchange50')
					parentEpml.request('showSnackBar', `${myplugstring1}`)

					return false
				}

				let myPluginName = false

				this.myPluginNameRes = []

				await parentEpml.request('apiCall', {
					url: buildRequestUrl(
						`/arbitrary/resources/search?service=WEBSITE&query=${this.pluginName}&exactmatchnames=true&limit=1`,
						store.getState()
					)
				}).then(res => {
					this.myPluginNameRes = res
				})

				myPluginName = !(this.myPluginNameRes === undefined || this.myPluginNameRes.length == 0)

				return myPluginName
			}

			let myNameRes = await validatePluginName()

			if (myNameRes !== false) {
				oldMenuPlugs.push(newMenuPlugsItem)

				const copyPayload = [...oldMenuPlugs]

				localStorage.setItem('myMenuPlugs', JSON.stringify(oldMenuPlugs))

				this.saveSettingToTemp(copyPayload)

				let myplugstring2 = get('walletpage.wchange52')

				parentEpml.request('showSnackBar', `${myplugstring2}`)

				this.closeAddNewPlugin()

				this.myMenuPlugins = JSON.parse(localStorage.getItem('myMenuPlugs') || '[]')
				this.firstUpdated()
			} else {
				let myplugstring3 = get('websitespage.schange17')
				parentEpml.request('showSnackBar', `${myplugstring3}`)

				return false
			}
		} else {
			this.pluginPage = ''

			if (this.pluginType === 'overview-page') {
				this.pluginPage = 'overview-page/index.html'
			} else if (this.pluginType === 'minting') {
				this.pluginPage = 'minting-info/index.html'
			} else if (this.pluginType === 'become-minter') {
				this.pluginPage = 'become-minter/index.html'
			} else if (this.pluginType === 'sponsorship-list') {
				this.pluginPage = 'sponsorship-list/index.html'
			} else if (this.pluginType === 'wallet') {
				this.pluginPage = 'wallet/index.html'
			} else if (this.pluginType === 'trade-portal') {
				this.pluginPage = 'trade-portal/index.html'
			} else if (this.pluginType === 'trade-bot-portal') {
				this.pluginPage = 'trade-bot/index.html'
			} else if (this.pluginType === 'reward-share') {
				this.pluginPage = 'reward-share/index.html'
			} else if (this.pluginType === 'q-chat') {
				this.pluginPage = 'q-chat/index.html'
			} else if (this.pluginType === 'name-registration') {
				this.pluginPage = 'name-registration/index.html'
			} else if (this.pluginType === 'names-market') {
				this.pluginPage = 'names-market/index.html'
			} else if (this.pluginType === 'websites') {
				this.pluginPage = 'q-website/index.html'
			} else if (this.pluginType === 'qapps') {
				this.pluginPage = 'q-app/index.html'
			} else if (this.pluginType === 'group-management') {
				this.pluginPage = 'group-management/index.html'
			} else if (this.pluginType === 'data-management') {
				this.pluginPage = 'data-management/index.html'
			} else if (this.pluginType === 'puzzles') {
				this.pluginPage = 'puzzles/index.html'
			} else if (this.pluginType === 'node-management') {
				this.pluginPage = 'node-management/index.html'
			} else if (this.pluginType === 'lottery') {
				this.pluginPage = 'qortal-lottery/index.html'
			}

			var oldMenuPlugs = JSON.parse(localStorage.getItem('myMenuPlugs') || '[]')

			const newMenuPlugsItem = {
				'url': this.pluginType,
				'domain': 'core',
				'page': this.pluginPage,
				'title': this.initialName,
				'icon': 'vaadin:external-browser',
				'mwcicon': this.mwcIcon,
				'pluginNumber': this.newId,
				'menus': [],
				'parent': false
			}

			oldMenuPlugs.push(newMenuPlugsItem)

			const copyPayload = [...oldMenuPlugs]

			localStorage.setItem('myMenuPlugs', JSON.stringify(oldMenuPlugs))

			this.saveSettingToTemp(copyPayload)

			let myplugstring2 = get('walletpage.wchange52')

			parentEpml.request('showSnackBar', `${myplugstring2}`)

			this.closeAddNewPlugin()
			this.myMenuPlugins = JSON.parse(localStorage.getItem('myMenuPlugs') || '[]')
			this.firstUpdated()
		}
	}

	closeAddNewPlugin() {
		this.shadowRoot.querySelector('#addNewPlugin').close()
		this.shadowRoot.getElementById('pluginTypeInput').value = 'reject'
		this.shadowRoot.getElementById('pluginNameInput').value = ''
		this.initialName = ''
		this.textFieldDisabled = false
	}

	renderTitle(plugin) {
		const theUrl = plugin.url
		const theName = plugin.title

		if (plugin.type === 'folder') {
			return html`<span class="text" title="${theName || 'New Folder'}">${theName || 'New Folder'}</span>`
		} else if (theUrl === 'overview-page') {
			return html`<span>${translate('tabmenu.tm28')}</span>`
		} else if (theUrl === 'minting') {
			return html`<span>${translate('tabmenu.tm1')}</span>`
		} else if (theUrl === 'become-minter') {
			return html`<span>${translate('tabmenu.tm2')}</span>`
		} else if (theUrl === 'sponsorship-list') {
			return html`<span>${translate('tabmenu.tm3')}</span>`
		} else if (theUrl === 'wallet') {
			return html`<span>${translate('tabmenu.tm4')}</span>`
		} else if (theUrl === 'trade-portal') {
			return html`<span>${translate('tabmenu.tm5')}</span>`
		} else if (theUrl === 'trade-bot-portal') {
			return html`<span>${translate('tabmenu.tm6')}</span>`
		} else if (theUrl === 'reward-share') {
			return html`<span>${translate('tabmenu.tm7')}</span>`
		} else if (theUrl === 'q-chat') {
			return html`<span>${translate('tabmenu.tm8')}</span>`
		} else if (theUrl === 'name-registration') {
			return html`<span>${translate('tabmenu.tm9')}</span>`
		} else if (theUrl === 'names-market') {
			return html`<span>${translate('tabmenu.tm10')}</span>`
		} else if (theUrl === 'websites') {
			return html`<span>${translate('tabmenu.tm11')}</span>`
		} else if (theUrl === 'qapps') {
			return html`<span>${translate('tabmenu.tm12')}</span>`
		} else if (theUrl === 'group-management') {
			return html`<span>${translate('tabmenu.tm13')}</span>`
		} else if (theUrl === 'data-management') {
			return html`<span>${translate('tabmenu.tm14')}</span>`
		} else if (theUrl === 'puzzles') {
			return html`<span>${translate('tabmenu.tm15')}</span>`
		} else if (theUrl === 'node-management') {
			return html`<span>${translate('tabmenu.tm16')}</span>`
		} else if (theUrl === 'lottery') {
			return html`<span>${translate('tabmenu.tm42')}</span>`
		} else {
			return html`<span>${theName}</span>`
		}
	}

	renderRemoveIcon(appplugin, clickHandler) {
		const appurl = appplugin.url
		const appicon = appplugin.mwcicon
		const appname = appplugin.title
		const appid = appplugin.pluginNumber

		if (this.isFolder(appplugin)) {
			return html`
				<div class="menuIconPos" @click="${() => clickHandler()}">
					<div
						class="removeIconPos"
						title="${translate('tabmenu.tm22')}"
						@click="${(event) => {
		event.stopPropagation()
		this.openRemoveApp(appname, appid, appurl)
	}}"
					>
						<mwc-icon class="removeIcon">backspace</mwc-icon>
					</div>
					<div class="folder-icon-stack">
						<div class="folder-preview">
							${(appplugin.children || []).slice(0, 4).map(child => this.renderFolderPreviewIcon(child))}
						</div>
					</div>
				</div>
			`
		}

		return html`
			<div class="menuIconPos" @click="${() => clickHandler()}">
				<div
					class="removeIconPos"
					title="${translate('tabmenu.tm22')}"
					@click="${(event) => {
		event.stopPropagation()
		this.openRemoveApp(appname, appid, appurl)
	}}"
				>
					<mwc-icon class="removeIcon">backspace</mwc-icon>
				</div>
				${appurl === 'myapp' ?
		html`
						<app-avatar appicon=${appicon} appname=${appname}></app-avatar>
					` : html`
						<mwc-icon class="menuIcon">${appicon}</mwc-icon>
					`
}
			</div>
		`
	}

	openRemoveApp(pluginNameTD, pluginNumberTD, pluginUrlTD) {
		this.pluginNameToDelete = ''
		this.pluginNameToDelete = pluginNameTD
		this.pluginNumberToDelete = ''
		this.pluginNumberToDelete = pluginNumberTD
		this.removeTitle = ''

		if (pluginUrlTD === 'overview-page') {
			this.removeTitle = html`<span>${translate('tabmenu.tm28')}</span>`
		} else if (pluginUrlTD === 'minting') {
			this.removeTitle = html`<span>${translate('tabmenu.tm1')}</span>`
		} else if (pluginUrlTD === 'become-minter') {
			this.removeTitle = html`<span>${translate('tabmenu.tm2')}</span>`
		} else if (pluginUrlTD === 'sponsorship-list') {
			this.removeTitle = html`<span>${translate('tabmenu.tm3')}</span>`
		} else if (pluginUrlTD === 'wallet') {
			this.removeTitle = html`<span>${translate('tabmenu.tm4')}</span>`
		} else if (pluginUrlTD === 'trade-portal') {
			this.removeTitle = html`<span>${translate('tabmenu.tm5')}</span>`
		} else if (pluginUrlTD === 'trade-bot-portal') {
			this.removeTitle = html`<span>${translate('tabmenu.tm6')}</span>`
		} else if (pluginUrlTD === 'reward-share') {
			this.removeTitle = html`<span>${translate('tabmenu.tm7')}</span>`
		} else if (pluginUrlTD === 'q-chat') {
			this.removeTitle = html`<span>${translate('tabmenu.tm8')}</span>`
		} else if (pluginUrlTD === 'name-registration') {
			this.removeTitle = html`<span>${translate('tabmenu.tm9')}</span>`
		} else if (pluginUrlTD === 'names-market') {
			this.removeTitle = html`<span>${translate('tabmenu.tm10')}</span>`
		} else if (pluginUrlTD === 'websites') {
			this.removeTitle = html`<span>${translate('tabmenu.tm11')}</span>`
		} else if (pluginUrlTD === 'qapps') {
			this.removeTitle = html`<span>${translate('tabmenu.tm12')}</span>`
		} else if (pluginUrlTD === 'group-management') {
			this.removeTitle = html`<span>${translate('tabmenu.tm13')}</span>`
		} else if (pluginUrlTD === 'data-management') {
			this.removeTitle = html`<span>${translate('tabmenu.tm14')}</span>`
		} else if (pluginUrlTD === 'puzzles') {
			this.removeTitle = html`<span>${translate('tabmenu.tm15')}</span>`
		} else if (pluginUrlTD === 'node-management') {
			this.removeTitle = html`<span>${translate('tabmenu.tm16')}</span>`
		} else if (pluginUrlTD === 'lottery') {
			this.removeTitle = html`<span>${translate('tabmenu.tm42')}</span>`
		} else {
			this.removeTitle = html`<span>${pluginNameTD}</span>`
		}

		this.shadowRoot.querySelector('#removePlugin').show()
	}

	removeAppFromArray() {
		const pluginToRemove = this.pluginNumberToDelete

		this.newMenuFilter = []
		this.newMenuFilter = this.myMenuList.filter((item) => item.pluginNumber !== pluginToRemove)

		const copyPayload = [...this.newMenuFilter]
		const myNewObj = JSON.stringify(this.newMenuFilter)

		localStorage.removeItem('myMenuPlugs')
		localStorage.setItem('myMenuPlugs', myNewObj)

		this.saveSettingToTemp(copyPayload)
		this.myMenuPlugins = JSON.parse(localStorage.getItem('myMenuPlugs') || '[]')
		this.firstUpdated()
		this.closeRemoveApp()
	}

	handleTileClick(plugin) {
		if (this._draggingId) {
			return
		}

		if (plugin.type === 'folder') {
			this.openFolder(plugin.pluginNumber)
		} else {
			this.changePage(plugin)
		}
	}

	openFolder(folderId) {
		const folder = this.getFolderById(folderId)

		if (!folder) return

		this.activeFolderId = folderId
		this.activeFolderName = folder.title || 'New Folder'
		this.folderDialogOpen = true
	}

	closeFolder() {
		this.folderDialogOpen = false
		this.activeFolderId = ''
		this.activeFolderName = 'New Folder'
	}

	getActiveFolder() {
		if (!this.activeFolderId) return null

		return this.getFolderById(this.activeFolderId)
	}

	getActiveFolderChildren() {
		const folder = this.getActiveFolder()
		return folder && Array.isArray(folder.children) ? folder.children : []
	}

	handleFolderNameInput(event) {
		const value = event.target.value
		this.activeFolderName = value

		const folder = this.getFolderById(this.activeFolderId)
		if (folder) {
			folder.title = value
			this.persistMenuPlugins()
		}
	}

	handleFolderChildClick(child) {
		this.changePage(child)
		this.closeFolder()
	}


	saveSettingToTemp(data) {
		const tempSettingsData = JSON.parse(localStorage.getItem('temp-settings-data') || '{}')

		const newTemp = {
			...tempSettingsData,
			myMenuPlugs: {
				data: data,
				timestamp: Date.now()
			}
		}

		localStorage.setItem('temp-settings-data', JSON.stringify(newTemp))

		this.dispatchEvent(
			new CustomEvent('temp-settings-data-event', {
				bubbles: true,
				composed: true
			})
		)
	}

	handleDragStart(event, pluginNumber) {
		if (!pluginNumber) return

		this._draggingId = pluginNumber
		this._lastHoverTarget = null
		this._hasDragged = false

		if (event.dataTransfer) {
			event.dataTransfer.effectAllowed = 'move'
			event.dataTransfer.setData('text/plain', pluginNumber)
		}

		event.currentTarget.classList.add('dragging')
	}

	handleDragOver(event, pluginNumber) {
		if (!this._draggingId || this._draggingId === pluginNumber) return

		event.preventDefault()
		event.dataTransfer.dropEffect = 'move'

		if (this._lastHoverTarget !== pluginNumber) {
			this.reorderMenuList(this._draggingId, pluginNumber, { persist: false })
			this._hasDragged = true
			this._lastHoverTarget = pluginNumber
		}

		event.currentTarget.classList.add('drag-over')
	}

	handleDragLeave(event) {
		event.currentTarget.classList.remove('drag-over')
	}

	handleDrop(event, targetPluginNumber) {
		event.preventDefault()

		const sourceId = this._draggingId

		this.clearDragStyles()

		if (!sourceId) {
			return
		}

		if (targetPluginNumber && sourceId !== targetPluginNumber) {
			const targetItem = this.getTopLevelItemById(targetPluginNumber)
			const sourceItem = this.getTopLevelItemById(sourceId)

			if (targetItem && this.isFolder(targetItem)) {
				this.moveIntoFolder(sourceId, targetPluginNumber)
				this.resetDragState()
				return
			}

			if (targetItem && sourceItem && !this.isFolder(sourceItem) && !this.isFolder(targetItem)) {
				this.createFolderFromPair(sourceId, targetPluginNumber)
				this.resetDragState()
				return
			}
		}

		if (this._hasDragged) {
			this.persistMenuPlugins()
		}

		this.resetDragState()
	}

	handleDragEnd() {
		this.clearDragStyles()
		if (this._hasDragged) {
			this.persistMenuPlugins()
		}

		this.resetDragState()
	}

	resetDragState() {
		this._draggingId = null
		this._lastHoverTarget = null
		this._hasDragged = false
	}

	clearDragStyles() {
		this.shadowRoot.querySelectorAll('.app-icon.drag-over, .app-icon.dragging').forEach((el) => {
			el.classList.remove('drag-over')
			el.classList.remove('dragging')
		})
	}

	reorderMenuList(sourceId, targetId, options = { persist: true }) {
		const { persist } = options

		if (!sourceId || !targetId || sourceId === targetId) return

		const topLevel = [...this.myMenuPlugins]

		const fromIndex = topLevel.findIndex((item) => item.pluginNumber === sourceId)
		const toIndex = topLevel.findIndex((item) => item.pluginNumber === targetId)

		if (fromIndex === -1 || toIndex === -1) return

		const [moved] = topLevel.splice(fromIndex, 1)
		topLevel.splice(toIndex, 0, moved)

		this.myMenuPlugins = topLevel

		if (persist) {
			this.persistMenuPlugins()
		} else {
			this.refreshMenuListsFromPlugins()
		}
	}

	persistMenuPlugins() {
		const copyPayload = [...this.myMenuPlugins]

		localStorage.setItem('myMenuPlugs', JSON.stringify(this.myMenuPlugins))
		this.saveSettingToTemp(copyPayload)
		this.refreshMenuListsFromPlugins()
	}

	detachPluginById(id) {
		if (!id) return null

		let removed = null
		const nextTopLevel = []

		this.myMenuPlugins.forEach((item) => {
			if (removed) {
				nextTopLevel.push(item)
				return
			}

			if (item.pluginNumber === id) {
				removed = item
				return
			}

			if (this.isFolder(item)) {
				const children = item.children || []
				const childIndex = children.findIndex((child) => child.pluginNumber === id)

				if (childIndex !== -1) {
					const [childRemoved] = children.splice(childIndex, 1)
					removed = childRemoved
				}
			}

			nextTopLevel.push(item)
		})

		if (removed) {
			this.myMenuPlugins = nextTopLevel
		}

		return removed
	}

	moveIntoFolder(sourceId, folderId) {
		const folder = this.getFolderById(folderId)
		if (!folder || sourceId === folderId) return

		const sourceItem = this.detachPluginById(sourceId)

		if (!sourceItem || this.isFolder(sourceItem)) return

		folder.children = folder.children || []

		if (!folder.children.find((child) => child.pluginNumber === sourceId)) {
			folder.children.push(sourceItem)
		}

		this.persistMenuPlugins()
	}

	createFolderFromPair(sourceId, targetId) {
		if (!sourceId || !targetId || sourceId === targetId) return

		const sourceItem = this.getTopLevelItemById(sourceId) || this.detachPluginById(sourceId)
		const targetItem = this.getTopLevelItemById(targetId)

		if (!sourceItem || !targetItem) return
		if (this.isFolder(targetItem) || this.isFolder(sourceItem)) return

		const currentOrder = [...this.myMenuPlugins]
		const targetIndex = currentOrder.findIndex((item) => item.pluginNumber === targetId)

		const cleaned = currentOrder.filter((item) => item.pluginNumber !== sourceId && item.pluginNumber !== targetId)

		const uid = new ShortUniqueId({ length: 10 })

		const folderItem = {
			type: 'folder',
			pluginNumber: `folder-${uid.rnd()}`,
			title: 'New Folder',
			url: 'folder',
			icon: 'folder',
			mwcicon: 'folder',
			children: [targetItem, sourceItem]
		}

		if (targetIndex === -1) {
			cleaned.push(folderItem)
		} else {
			cleaned.splice(targetIndex, 0, folderItem)
		}

		this.myMenuPlugins = cleaned
		this.persistMenuPlugins()
	}

	removeFromFolder(childId, folderId) {
		const folder = this.getFolderById(folderId)
		if (!folder) return

		folder.children = folder.children || []
		const idx = folder.children.findIndex((child) => child.pluginNumber === childId)
		if (idx === -1) return

		const [child] = folder.children.splice(idx, 1)

		const folderIndex = this.myMenuPlugins.findIndex((item) => item.pluginNumber === folderId)

		if (folderIndex === -1) {
			this.myMenuPlugins.push(child)
		} else {
			this.myMenuPlugins.splice(folderIndex + 1, 0, child)
		}

		this.persistMenuPlugins()
	}

	closeRemoveApp() {
		this.shadowRoot.querySelector('#removePlugin').close()
		this.pluginNameToDelete = ''
		this.pluginNumberToDelete = ''
	}

	isFolder(item) {
		return item && item.type === 'folder'
	}

	renderFolderPreviewIcon(child) {
		const isQapp = child?.url === 'myapp'

		if (isQapp) {
			return html`<app-avatar class="folder-preview-avatar" appicon=${child.mwcicon || 'apps'} appname=${child.title}></app-avatar>`
		}

		return html`<mwc-icon class="folder-preview-icon">${child?.mwcicon || 'apps'}</mwc-icon>`
	}

	getTopLevelItemById(id) {
		return this.myMenuPlugins.find((item) => item.pluginNumber === id)
	}

	getFolderById(id) {
		return this.myMenuPlugins.find((item) => this.isFolder(item) && item.pluginNumber === id)
	}

	async extractComponents(url) {
		if (!url.startsWith('qortal://')) {
			return null
		}

		url = url.replace(/^(qortal\:\/\/)/, '')

		if (url.includes('/')) {
			let parts = url.split('/')

			const service = parts[0].toUpperCase()

			parts.shift()

			const name = parts[0]

			parts.shift()

			let identifier

			if (parts.length > 0) {
				// Do not shift yet
				identifier = parts[0]

				// Check if a resource exists with this service, name and identifier combination
				const url = buildRequestUrl(`/arbitrary/resource/status/${service}/${name}/${identifier}`, store.getState())
				const res = await fetch(url)
				const data = await res.json()

				if (data.totalChunkCount > 0) {
					// Identifier exists, so don't include it in the path
					parts.shift()
				} else {
					identifier = null
				}
			}

			const path = parts.join('/')
			const components = {}
			components['service'] = service
			components['name'] = name
			components['identifier'] = identifier
			components['path'] = path

			return components
		}

		return null
	}

	async getQuery(value) {
		let newQuery = value

		if (newQuery.endsWith('/')) {
			newQuery = newQuery.slice(0, -1)
		}

		const res = await this.extractComponents(newQuery)

		if (!res) return

		const { service, name, identifier, path } = res

		let query = `?service=${service}`

		if (name) {
			query = query + `&name=${name}`
		}

		if (identifier) {
			query = query + `&identifier=${identifier}`
		}

		if (path) {
			query = query + `&path=${path}`
		}

		if (service === 'APP') {
			this.changePage({
				'url': 'myapp',
				'domain': 'core',
				'page': `qdn/browser/index.html${query}`,
				'title': name || 'Q-App',
				'icon': 'vaadin:external-browser',
				'mwcicon': 'open_in_browser',
				'menus': [],
				'parent': false
			})
		} else if (service === 'WEBSITE') {
			this.changePage({
				'url': 'myapp',
				'domain': 'core',
				'page': `qdn/browser/index.html${query}`,
				'title': name || 'Website',
				'icon': 'vaadin:desktop',
				'mwcicon': 'desktop_mac',
				'menus': [],
				'parent': false
			})
		}
	}

	async handlePasteLink(e) {
		try {
			const value = this.shadowRoot.getElementById('linkInput').value
			await this.getQuery(value)
		} catch (error) { }
	}

	async _handleKeyDown(e) {
		if (e.key === 'Enter') {
			try {
				const value = this.shadowRoot.getElementById('linkInput').value
				await this.getQuery(value)
			} catch (error) { }
		}
	}

	getApiKey() {
		const apiNode = store.getState().app.nodeConfig.knownNodes[store.getState().app.nodeConfig.node]
		return apiNode.apiKey
	}

	isEmptyArray(arr) {
		if (!arr) { return true }
		return arr.length === 0
	}

	stateChanged(state) {
		this.menuList = state.app.registeredUrls
		this.addressInfo = state.app.accountInfo.addressInfo
	}
}

window.customElements.define('nav-bar', NavBar)

class AppAvatar extends connect(store)(LitElement) {
	static get properties() {
		return {
			hasAvatar: { type: Boolean },
			isImageLoaded: { type: Boolean },
			appicon: { type: String },
			appname: { type: String }
		}
	}

	static get styles() {
		return [appAvatarStyles]
	}

	constructor() {
		super()
		this.hasAvatar = false
		this.isImageLoaded = false
		this.imageFetches = 0
	}

	render() {
		let appAvatarImg = ''

		if (this.appname) {
			const appAvatarNode = store.getState().app.nodeConfig.knownNodes[store.getState().app.nodeConfig.node]
			const appAvatarNodeUrl = appAvatarNode?.baseUrl
			const appAvatarUrl = `${appAvatarNodeUrl}/arbitrary/THUMBNAIL/${this.appname}/qortal_avatar?async=true`

			appAvatarImg = this.createImage(appAvatarUrl)
		}

		return html`
			${this.isImageLoaded ?
		html`
					${appAvatarImg}
				` : html`
					<mwc-icon class="menuIcon">${this.appicon}</mwc-icon>
				`
}
		`
	}

	firstUpdated() {
		// ...
	}

	createImage(imageUrl) {
		const imageHTMLRes = new Image()

		imageHTMLRes.src = imageUrl
		imageHTMLRes.style = 'border-radius:10px; font-size:14px; object-fit: fill;height:60px;width:60px;'

		imageHTMLRes.onload = () => {
			this.isImageLoaded = true
		}

		imageHTMLRes.onerror = () => {
			if (this.imageFetches < 1) {
				setTimeout(() => {
					this.imageFetches = this.imageFetches + 1
					imageHTMLRes.src = imageUrl
				}, 5000)
			} else {
				this.isImageLoaded = false
			}
		}

		return imageHTMLRes
	}
}

window.customElements.define('app-avatar', AppAvatar)

class TabAvatar extends connect(store)(LitElement) {
	static get properties() {
		return {
			hasAvatar: { type: Boolean },
			isImageLoaded: { type: Boolean },
			appicon: { type: String },
			appname: { type: String }
		}
	}

	constructor() {
		super()
		this.hasAvatar = false
		this.isImageLoaded = false
		this.imageFetches = 0
	}

	render() {
		let tabAvatarImg = ''

		if (this.appname) {
			const tabAvatarNode = store.getState().app.nodeConfig.knownNodes[store.getState().app.nodeConfig.node]
			const tabAvatarNodeUrl = tabAvatarNode?.baseUrl
			const tabAvatarUrl = `${tabAvatarNodeUrl}/arbitrary/THUMBNAIL/${this.appname}/qortal_avatar?async=true`

			tabAvatarImg = this.createImage(tabAvatarUrl)
		}

		return html`
			${this.isImageLoaded ?
		html`
					${tabAvatarImg}
				` : html`
					<mwc-icon>${this.appicon}</mwc-icon>
				`
}
		`
	}

	firstUpdated() {
		// ...
	}

	createImage(imageUrl) {
		const imageHTMLRes = new Image()

		imageHTMLRes.src = imageUrl
		imageHTMLRes.style = 'border-radius:4px; font-size:14px; object-fit: fill;height:24px;width:24px;'

		imageHTMLRes.onload = () => {
			this.isImageLoaded = true
		}

		imageHTMLRes.onerror = () => {
			if (this.imageFetches < 1) {
				setTimeout(() => {
					this.imageFetches = this.imageFetches + 1
					imageHTMLRes.src = imageUrl
				}, 5000)
			} else {
				this.isImageLoaded = false
			}
		}

		return imageHTMLRes
	}
}

window.customElements.define('tab-avatar', TabAvatar)
