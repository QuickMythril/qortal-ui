/** @jest-environment jsdom */

import './test-shim.js'
import { decodeHarness } from './decodeHarness'

describe('cannot decrypt fallback', () => {
	test('direct encrypted message without sender pubkey returns fallback', async () => {
		const decodeSpy = jest.fn()
		window.parent.Base64Message.decode = decodeSpy
		const decryptSpy = jest.fn()
		window.parent.decryptChatMessageBase64 = decryptSpy

		const h = decodeHarness({
			isReceipient: true,
			_publicKey: null,
			symKeys: {}
		})

		const msg = {
			data: 'ZmFrZQ==',
			isEncrypted: true,
			txGroupId: 0,
			sender: 'Qfake',
			reference: 'ref123'
		}

		const res = await h.decodeMessage(msg)

		expect(decryptSpy).not.toHaveBeenCalled()
		expect(res.decodedMessage).toBe('Cannot Decrypt Message!')
	})

	test('group encrypted message with decode failure returns fallback', async () => {
		const decodeSpy = jest.fn().mockReturnValue(null)
		window.parent.Base64Message.decode = decodeSpy
		const decryptSpy = jest.fn()
		window.parent.decryptChatMessageBase64 = decryptSpy

		const h = decodeHarness({
			isReceipient: false,
			_publicKey: null,
			symKeys: { key: 'group-sym' }
		})

		const msg = {
			data: 'ZmFrZS1ncm91cA==',
			isEncrypted: true,
			txGroupId: 123,
			chatReference: 'ref-abc'
		}

		const res = await h.decodeMessage(msg)
		expect(decodeSpy).toHaveBeenCalled()
		expect(decryptSpy).not.toHaveBeenCalled()
		expect(res.decodedMessage).toBe('Cannot Decrypt Message!')
	})
})
