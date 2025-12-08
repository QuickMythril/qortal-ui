import { doUpdateAccountName, UPDATE_NAME_STATUSES } from './update-name'
import { UPDATE_ACCOUNT_INFO } from '../user-action-types'
import { ACCOUNT_INFO } from '../../app/app-action-types'

jest.mock('../../app/app-actions', () => {
	const { ACCOUNT_INFO } = require('../../app/app-action-types')
	return {
		doUpdateAccountInfo: (payload) => ({ type: ACCOUNT_INFO, payload })
	}
})

const address = 'ADDR123'
const primaryRes = { name: 'Name1' }
const namesRes = [{ name: 'Name1' }, { name: 'Name2' }, { name: 'Name3' }]

const getState = () => ({
	config: {
		coin: {
			node: {
				api: {
					url: 'http://localhost/',
					tail: ''
				}
			}
		}
	},
	user: {
		accountInfo: { activeName: 'Name3' },
		storedWallets: {}
	},
	app: {
		accountInfo: { activeName: 'Name3' }
	}
})

const createDispatch = () => {
	const dispatched = []

	const dispatch = (action) => {
		if (typeof action === 'function') {
			return action(dispatch, getState)
		}
		dispatched.push(action)
		return action
	}

	return { dispatch, dispatched }
}

describe('doUpdateAccountName', () => {
	beforeEach(() => {
		global.fetch = jest.fn((url) => {
			const body = url.includes('names/primary') ? primaryRes : namesRes
			return Promise.resolve({
				json: () => Promise.resolve(body)
			})
		})
	})

	afterEach(() => {
		jest.resetAllMocks()
	})

	it('populates primaryName and allNames with reverse=false ordering', async () => {
		const { dispatch, dispatched } = createDispatch()

		await doUpdateAccountName(address, '', false)(dispatch, getState)

		expect(fetch).toHaveBeenCalledWith('http://localhost/names/primary/ADDR123')
		expect(fetch).toHaveBeenCalledWith('http://localhost/names/address/ADDR123?limit=0&reverse=false')

		const finalUserAction = dispatched.filter(action => action.type === UPDATE_ACCOUNT_INFO).pop()
		expect(finalUserAction).toBeDefined()
		expect(finalUserAction.payload).toEqual({
			nameStatus: UPDATE_NAME_STATUSES.LOADED,
			name: 'Name1',
			primaryName: 'Name1',
			allNames: namesRes,
			names: namesRes,
			activeName: 'Name3',
			address
		})

		const appAction = dispatched.find(action => action.type === ACCOUNT_INFO)
		expect(appAction?.payload).toEqual(finalUserAction.payload)
	})
})
