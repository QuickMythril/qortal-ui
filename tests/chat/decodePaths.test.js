/** @jest-environment jsdom */

import './test-shim.js'
import { decodeHarness } from './decodeHarness'

describe('decode paths for private vs group', () => {
	test('direct chat (txGroupId 0) uses Base64Message.decode for unencrypted', async () => {
		const decodeSpy = jest.fn().mockReturnValue({ message: 'direct-decoded' })
		window.parent.Base64Message.decode = decodeSpy
		const decryptSpy = jest.fn()
		window.parent.decryptChatMessageBase64 = decryptSpy

		const h = decodeHarness({
			isReceipient: true,
			_publicKey: { key: 'pubkey-direct' },
			symKeys: { direct: true }
		})

		const msg = {
			data: 'ZmFrZQ==',
			isEncrypted: false,
			txGroupId: 0
		}

		const res = await h.decodeMessage(msg)
		expect(decodeSpy).toHaveBeenCalledWith(msg.data, { direct: true })
		expect(decryptSpy).not.toHaveBeenCalled()
		expect(res.decodedMessage).toEqual({ message: 'direct-decoded' })
	})

	test('group chat (txGroupId > 0) uses group symKeys and does not call decrypt', async () => {
		const decodeSpy = jest.fn().mockReturnValue({ message: 'group-decoded' })
		window.parent.Base64Message.decode = decodeSpy
		const decryptSpy = jest.fn()
		window.parent.decryptChatMessageBase64 = decryptSpy

		const symKeys = { '123': { key: 'group-sym' } }
		const h = decodeHarness({
			isReceipient: false,
			_publicKey: null,
			symKeys
		})

		const msg = {
			data: 'ZmFrZS1ncm91cA==',
			isEncrypted: false,
			txGroupId: 123,
			chatReference: 'ref-abc'
		}

		const res = await h.decodeMessage(msg)
		expect(decodeSpy).toHaveBeenCalledWith(msg.data, symKeys, msg.chatReference)
		expect(decryptSpy).not.toHaveBeenCalled()
		expect(res.decodedMessage).toEqual({ message: 'group-decoded' })
	})
})
