/** @jest-environment jsdom */

import { createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import rootReducer from '../../reducers'
import { UPDATE_ACCOUNT_INFO } from '../user-action-types'

jest.mock('../../app/app-actions', () => {
	const { ACCOUNT_INFO } = require('../../app/app-action-types')
	return {
		doUpdateAccountInfo: (payload) => ({ type: ACCOUNT_INFO, payload })
	}
})

import { doUpdateAccountName } from './update-name'

const createBaseState = () => {
	const initialState = rootReducer(undefined, { type: '@@INIT' })
	const nodeConfig = {
		url: 'http://localhost/',
		tail: ''
	}

	return {
		...initialState,
		config: {
			...initialState.config,
			coin: {
				...(initialState.config.coin || {}),
				node: { api: nodeConfig }
			}
		}
	}
}

const setupPersistence = (store) => {
	jest.doMock('../../../store', () => ({ store }), { virtual: false })
	jest.isolateModules(() => {
		require('../../../persistState')
	})
}

describe('active name persistence', () => {
	beforeEach(() => {
		localStorage.clear()
		jest.resetModules()
	})

	afterEach(() => {
		jest.restoreAllMocks()
	})

	it('persists activeName and reapplies it to app account info after reload', async () => {
		const storeWithPersistence = createStore(rootReducer, createBaseState(), applyMiddleware(thunk))
		setupPersistence(storeWithPersistence)

		const namesPayload = {
			address: 'ADDR123',
			primaryName: 'Name1',
			allNames: [{ name: 'Name1' }, { name: 'Name2' }, { name: 'Name3' }],
			activeName: 'Name3',
			names: [{ name: 'Name1' }, { name: 'Name2' }, { name: 'Name3' }]
		}

		storeWithPersistence.dispatch({
			type: UPDATE_ACCOUNT_INFO,
			payload: namesPayload
		})

		const savedUser = JSON.parse(localStorage.getItem('user'))
		expect(savedUser.accountInfo.activeName).toBe('Name3')

		// Simulate a reload: new store should bootstrap user slice from localStorage
		const reloadedStore = createStore(rootReducer, createBaseState(), applyMiddleware(thunk))

		global.fetch = jest.fn((url) => {
			const body = url.includes('names/primary')
				? { name: 'Name1' }
				: [{ name: 'Name1' }, { name: 'Name2' }, { name: 'Name3' }]

			return Promise.resolve({
				json: () => Promise.resolve(body)
			})
		})

		await doUpdateAccountName('ADDR123', '', false)(reloadedStore.dispatch, reloadedStore.getState)

		const finalState = reloadedStore.getState()
		expect(finalState.user.accountInfo.activeName).toBe('Name3')
		expect(finalState.user.accountInfoByAddress['ADDR123'].activeName).toBe('Name3')
		expect(finalState.app.accountInfo.activeName).toBe('Name3')
		expect(global.fetch).toHaveBeenCalledTimes(2)
	})
})
