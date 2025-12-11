/** @jest-environment jsdom */

import './test-shim.js'
const { replaceMessagesEdited } = require('../../plugins/plugins/utils/functions')

describe('replaceMessagesEdited - reply to missing base', () => {
	test('sets missing repliedToData when original is absent', async () => {
		const replyMsg = {
			signature: 'sig-reply',
			decodedMessage: JSON.stringify({ repliedTo: 'missing-sig', message: 'reply content' }),
			sender: 'QMU73pUQhrjojxn5ZEMsaZv2b25xxhvmJj',
			senderName: 'Test Sender',
			timestamp: Date.now(),
			isText: true,
			isEncrypted: false,
			txGroupId: 0
		}

		const parentEpml = {
			request: jest.fn().mockResolvedValue([])
		}
		const addToUpdateMessageHashmap = jest.fn()
		const decodeMessageFunc = async (msg) => msg

		const result = await replaceMessagesEdited({
			decodedMessages: [replyMsg],
			parentEpml,
			isReceipient: false,
			decodeMessageFunc,
			_publicKey: null,
			symKeys: {},
			addToUpdateMessageHashmap
		})

		expect(parentEpml.request).toHaveBeenCalled()
		expect(result).toHaveLength(1)
		const processed = result[0]
		expect(processed.repliedToData).toBeDefined()
		expect(processed.repliedToData.missing).toBe(true)
		expect(processed.repliedToData.sender).toBe(replyMsg.sender)
		expect(processed.repliedToData.senderName).toBe(replyMsg.senderName)
		expect(processed.repliedToData.decodedMessage).toEqual({})
	})
})
