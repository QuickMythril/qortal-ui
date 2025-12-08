import { store } from './store'
import { doLoadConfigFromAPI } from './redux/config/config-actions'
import { doInitWorkers, doLoadNodeConfig, doUpdateAccountInfo } from './redux/app/app-actions'
import { doLoadNotificationConfig } from './redux/user/user-actions'
import { initApi } from 'qortal-ui-crypto'
import {
	getSelectedNodeApiKey,
	getSelectedNodeBaseUrl,
	getSelectedNodeInfo
} from './utils/node'
import './persistState'

initApi(store)

// Keep a simple global snapshot of the selected node for consumers that
// rely on window-scoped context (e.g., request builders).
const updateGlobalNodeContext = () => {
	const state = store.getState()
	const nodeInfo = getSelectedNodeInfo(state)
	window.qortalNodeContext = {
		baseUrl: getSelectedNodeBaseUrl(state),
		apiKey: getSelectedNodeApiKey(state),
		isPublic: (nodeInfo && nodeInfo.isPublic) || false,
		node: nodeInfo || {}
	}
}

updateGlobalNodeContext()
store.subscribe(updateGlobalNodeContext)

// Expose a helper to build full API URLs with the current node and apiKey.
window.buildApiUrl = (path, options = {}) => {
	const state = store.getState()
	const usePublicFallback = options.usePublicFallback || false
	const normalizedPath = typeof path === 'string' ? path : ''
	const base = getSelectedNodeBaseUrl(state)
	if (!base && !usePublicFallback) throw new Error('No node selected for request')

	const cleanedBase = (base || '').replace(/\/+$/, '')
	const url = normalizedPath.startsWith('/')
		? `${cleanedBase}${normalizedPath}`
		: `${cleanedBase}/${normalizedPath}`
	const apiKey = getSelectedNodeApiKey(state)
	if (apiKey) {
		const sep = url.includes('?') ? '&' : '?'
		return `${url}${sep}apiKey=${apiKey}`
	}
	return url
}

// Rehydrate app.accountInfo from persisted user slice for the selected address, if available.
(() => {
	const state = store.getState()
	const selectedAddr = state?.app?.selectedAddress?.address
	const userSlice = state?.user
	const perAddress = userSlice?.accountInfoByAddress || {}

	const infoForSelected = selectedAddr ? perAddress[selectedAddr] : undefined

	if (infoForSelected) {
		store.dispatch(doUpdateAccountInfo(infoForSelected))
	}
})()

const workerInitChecker = () => {
	const state = store.getState()

	if (store.getState().app.nodeConfig.knownNodes.length === 0) {
		store.dispatch(doLoadNodeConfig())
	}

	if (state.config.loaded) {
		store.dispatch(doLoadNodeConfig())

		if (state.app.workers.ready) {
			workerInitSubscription()
		} else {
			if (!state.app.workers.loading) store.dispatch(doInitWorkers(state.config.crypto.kdfThreads, state.config.user.constants.workerURL))
		}
	}
}

workerInitChecker()

const workerInitSubscription = store.subscribe(workerInitChecker)

if (!store.getState().config.loaded) {
	store.dispatch(doLoadConfigFromAPI())
	store.dispatch(doLoadNodeConfig())
}

if (!store.getState().user.loaded) {
	store.dispatch(doLoadNotificationConfig())
}
