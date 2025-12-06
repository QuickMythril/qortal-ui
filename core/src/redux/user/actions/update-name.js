import { updateAccountInfo } from './update-account-info'
import { doUpdateStoredWalletName } from './store-wallet'
import { doUpdateAccountInfo as doUpdateAppAccountInfo } from '../../app/app-actions'

const GET_NAME_URL = 'names/address/'
const GET_PRIMARY_NAME_URL = 'names/primary/'
const CHECK_NAME_INTERVAL = 1000 * 10 // Every 10 seconds

export const UPDATE_NAME_STATUSES = {
	LOADING: 'LOADING',
	LOADED: 'LOADED',
	DOES_NOT_EXIST: 'DOES_NOT_EXIST',
	WAITING_FOR_CONFIRM: 'WAITING_FOR_CONFIRM'
}

export const doUpdateAccountName = (address, expectedName, awaitingConfirm) => {
	return (dispatch, getState) => {
		dispatch(updateAccountInfo({
			nameStatus: UPDATE_NAME_STATUSES.LOADING,
			name: expectedName
		}))

		const state = getState()
		const config = state.config
		const node = config.coin.node.api
		const primaryUrl = `${node.url + node.tail + GET_PRIMARY_NAME_URL}${address}`
		const namesUrl = `${node.url + node.tail + GET_NAME_URL}${address}?limit=0&reverse=true`

		return Promise.all([fetch(primaryUrl), fetch(namesUrl)])
			.then(responses => Promise.all(responses.map(res => res.json())))
			.then(([primaryRes, namesRes]) => {
				const allNames = Array.isArray(namesRes) ? namesRes : []
				const primaryName = primaryRes?.name || ''
				const displayName = primaryName || (allNames[0]?.name || expectedName || '')
				const isLoaded = Boolean(primaryName || allNames.length > 0)
				const status = isLoaded ? UPDATE_NAME_STATUSES.LOADED : (awaitingConfirm ? UPDATE_NAME_STATUSES.DOES_NOT_EXIST : UPDATE_NAME_STATUSES.WAITING_FOR_CONFIRM)

				const nextAccountInfo = {
					nameStatus: status,
					name: displayName,
					primaryName,
					allNames,
					names: allNames
				}

				dispatch(updateAccountInfo(nextAccountInfo))
				dispatch(doUpdateAppAccountInfo(nextAccountInfo))

				if (state.user.storedWallets[address] && displayName) {
					dispatch(doUpdateStoredWalletName(address, displayName))
				}

				if (!isLoaded && awaitingConfirm) {
					setTimeout(() => dispatch(doUpdateAccountName(address, expectedName, awaitingConfirm)), CHECK_NAME_INTERVAL)
				}
			})
	}
}
