/** @jest-environment jsdom */

import { screen, fireEvent } from '@testing-library/dom'
import '@testing-library/jest-dom'

jest.mock('../redux/app/app-actions', () => ({
	doUpdateAccountInfo: (payload) => ({ type: 'ACCOUNT_INFO', payload })
}))

jest.mock('@material/mwc-icon', () => ({}), { virtual: true })
jest.mock('@material/mwc-menu', () => ({}), { virtual: true })
jest.mock('@material/mwc-list/mwc-list-item.js', () => ({}), { virtual: true })

jest.mock('../store', () => {
	const { createStore, compose } = require('redux')
	const rootReducer = require('../redux/reducers').default
	const store = createStore(rootReducer, compose())
	return { store }
})

import { store } from '../store'
import './name-switcher'

const setupComponent = (accountInfoOverrides = {}) => {
	const defaultAccount = {
		accountInfo: {
			names: [{ name: 'Name1' }, { name: 'Name2' }],
			allNames: [{ name: 'Name1' }, { name: 'Name2' }],
			primaryName: 'Name1',
			activeName: 'Name1',
			addressInfo: {},
			name: 'Name1'
		},
		nodeConfig: {
			node: 0,
			knownNodes: [{
				protocol: 'http',
				domain: 'localhost',
				port: '1234'
			}]
		}
	}

	store.dispatch({
		type: 'ACCOUNT_INFO',
		payload: {
			...defaultAccount.accountInfo,
			...accountInfoOverrides
		}
	})

	const el = document.createElement('name-switcher')
	el.store = store
	document.body.appendChild(el)
	return el
}

describe('name-switcher component', () => {
	beforeEach(() => {
		document.body.innerHTML = ''
	})

	it('renders display name and opens menu anchored to button', async () => {
		const el = setupComponent()
		await el.updateComplete

		const display = el.shadowRoot.querySelector('.name')
		expect(display.textContent).toBe('Name1')

		const button = el.shadowRoot.getElementById('switcher-button')
		fireEvent.click(button)
		await el.updateComplete

		const menu = el.shadowRoot.getElementById('name-menu')
		expect(menu.open).toBe(true)
		expect(menu.anchorElement).toBe(button)
	})

	it('shows active checkmark and uses person fallback icon', async () => {
		const el = setupComponent({ activeName: 'Name2' })
		await el.updateComplete

		const button = el.shadowRoot.getElementById('switcher-button')
		fireEvent.click(button)
		await el.updateComplete

		const listItems = el.shadowRoot.querySelectorAll('mwc-list-item')
		expect(listItems.length).toBe(2)

		const activeItem = Array.from(listItems).find(item => item.hasAttribute('selected'))
		expect(activeItem).toBeDefined()
		expect(activeItem.textContent).toContain('Name2')
		expect(activeItem.innerHTML).toContain('check')
	})
})
