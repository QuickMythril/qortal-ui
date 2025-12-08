import { loadStateFromLocalStorage } from '../../localStorageHelpers'
import {
	CLAIM_AIRDROP,
	LOAD_NOTIFICATION_CONFIG,
	REMOVE_WALLET,
	SET_QCHAT_NOTIFICATION_CONFIG,
	STORE_WALLET,
	UPDATE_ACCOUNT_INFO
} from './user-action-types'

const DEFAULT_INITIAL_STATE = {
	storedWallets: {},
	hasClaimedAirdrop: false,
	accountInfo: {
		primaryName: '',
		allNames: [],
		activeName: ''
	},
	accountInfoByAddress: {},
	notifications: {
		q_chat: {}
	},
	loaded: false
}

const getInitialState = () => {
	const persistedState = loadStateFromLocalStorage('user') || {}
	return {
		...DEFAULT_INITIAL_STATE,
		...persistedState,
		accountInfo: {
			...DEFAULT_INITIAL_STATE.accountInfo,
			...(persistedState.accountInfo || {})
		},
		accountInfoByAddress: persistedState.accountInfoByAddress || {}
	}
}

export default (state = getInitialState(), action) => {
	switch (action.type) {
		case STORE_WALLET:
			return {
				...state,
				storedWallets: {
					...(state.storedWallets || {}),
					[action.payload.address0]: action.payload
				}
			}

		case REMOVE_WALLET:
			delete state.storedWallets[action.payload.address]
			return {
				...state,
				storedWallets: state.storedWallets
			}

		case CLAIM_AIRDROP:
			return {
				...state,
				hasClaimedAirdrop: true
			}

		case UPDATE_ACCOUNT_INFO: {
			const { address, ...info } = action.payload || {}
			const nextAccountInfo = {
				...state.accountInfo,
				...info
			}

			return {
				...state,
				accountInfo: nextAccountInfo,
				accountInfoByAddress: address
					? {
						...(state.accountInfoByAddress || {}),
						[address]: {
							...(state.accountInfoByAddress?.[address] || {}),
							...info
						}
					}
					: state.accountInfoByAddress || {}
			}
		}

		case LOAD_NOTIFICATION_CONFIG:
			return {
				...state,
				notifications: action.payload,
				loaded: true
			}

		case SET_QCHAT_NOTIFICATION_CONFIG:
			return {
				...state,
				notifications: {
					...state.notifications,
					q_chat: action.payload
				}
			}

		default:
			return state
	}
}
