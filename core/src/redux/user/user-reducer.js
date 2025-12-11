import { loadStateFromLocalStorage } from '../../localStorageHelpers'
import {
	CLAIM_AIRDROP,
	LOAD_NOTIFICATION_CONFIG,
	REMOVE_WALLET,
	SET_QCHAT_NOTIFICATION_CONFIG,
	SET_WALLET_ORDER,
	STORE_WALLET,
	UPDATE_ACCOUNT_INFO
} from './user-action-types'

const DEFAULT_INITIAL_STATE = {
	storedWallets: {},
	storedWalletOrder: [],
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
	const persistedWallets = persistedState.storedWallets || {}
	const persistedOrder = persistedState.storedWalletOrder || Object.keys(persistedWallets)
	const filteredOrder = (persistedOrder || []).filter(address => persistedWallets[address])
	const missingAddresses = Object.keys(persistedWallets).filter(address => !filteredOrder.includes(address))
	const normalizedOrder = [...filteredOrder, ...missingAddresses]

	return {
		...DEFAULT_INITIAL_STATE,
		...persistedState,
		storedWalletOrder: normalizedOrder,
		accountInfo: {
			...DEFAULT_INITIAL_STATE.accountInfo,
			...(persistedState.accountInfo || {})
		},
		accountInfoByAddress: persistedState.accountInfoByAddress || {}
	}
}

export default (state = getInitialState(), action) => {
	switch (action.type) {
		case STORE_WALLET: {
			const nextWallets = {
				...(state.storedWallets || {}),
				[action.payload.address0]: action.payload
			}
			const existingOrder = state.storedWalletOrder || Object.keys(state.storedWallets || {})
			const filteredOrder = existingOrder.filter(address => nextWallets[address])
			const hasAddress = filteredOrder.includes(action.payload.address0)
			const nextOrder = hasAddress ? filteredOrder : [...filteredOrder, action.payload.address0]

			return {
				...state,
				storedWallets: nextWallets,
				storedWalletOrder: nextOrder
			}
		}

		case REMOVE_WALLET: {
			const { [action.payload.address]: removed, ...remainingWallets } = state.storedWallets || {}
			const nextOrder = (state.storedWalletOrder || []).filter(address => address !== action.payload.address)

			return {
				...state,
				storedWallets: remainingWallets,
				storedWalletOrder: nextOrder
			}
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

		case SET_WALLET_ORDER: {
			const storedWallets = state.storedWallets || {}
			const requestedOrder = action.payload?.order || []
			const filteredOrder = requestedOrder.filter(address => storedWallets[address])
			const missing = Object.keys(storedWallets).filter(address => !filteredOrder.includes(address))
			return {
				...state,
				storedWalletOrder: [...filteredOrder, ...missing]
			}
		}

		default:
			return state
	}
}
