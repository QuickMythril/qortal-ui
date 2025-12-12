// Must be saved to localstorage. Will storage things such as saved addresses and themes (day/night mode) etc.
// Initial state needs to be loaded from either the getConfig url or localstorage...NOT set via this
import { loadStateFromLocalStorage } from '../../localStorageHelpers'
import { LOAD_CONFIG_FROM_API } from './config-actions'
import { loadConfigFromAPI } from './reducers/load-config-from-api'
import defaultCoinConfig from '../../../config/default.coin.config.js'

const pruneCachedConfig = cached => {
	if (!cached || typeof cached !== 'object') return undefined

	// Drop coin block so updated assets (e.g., logo paths) are refreshed from /getConfig
	const { coin, ...rest } = cached

	return rest
}

const DEFAULT_INITIAL_STATE = {
	styles: {
		breakpoints: {},
		theme: {
			color: 'green',
			colors: {}
		}
	},
	coin: defaultCoinConfig,
	user: {
		language: 'english',
		server: {},
		node: 0,
		knownNodes: [{}]
	},
	savedWallets: {},
	loaded: false
}

const cachedConfig = pruneCachedConfig(loadStateFromLocalStorage('config'))
const INITIAL_STATE = cachedConfig ? { ...DEFAULT_INITIAL_STATE, ...cachedConfig } : DEFAULT_INITIAL_STATE

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOAD_CONFIG_FROM_API:
			return loadConfigFromAPI(state, action)
		default:
			return state
	}
}
