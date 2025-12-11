/** @jest-environment jsdom */

import './test-shim.js'
import { decodeHarness } from './decodeHarness'

describe('hub-format payload parsing', () => {
	test('version 3 messageText payload is passed through unchanged', async () => {
		const hubPayload = { version: 3, messageText: 'hi from hub', type: 'text' }
		const decodeSpy = jest.fn().mockReturnValue(hubPayload)
		window.parent.Base64Message.decode = decodeSpy

		const h = decodeHarness({
			isReceipient: true,
			_publicKey: { key: 'pub' },
			symKeys: {}
		})

		const msg = {
			data: 'ZmFrZQ==',
			isEncrypted: false,
			txGroupId: 0
		}

		const res = await h.decodeMessage(msg)
		expect(decodeSpy).toHaveBeenCalledWith(msg.data, {})
		expect(res.decodedMessage).toEqual(hubPayload)
	})
})
