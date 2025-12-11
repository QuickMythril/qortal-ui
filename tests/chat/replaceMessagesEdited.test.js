/** @jest-environment jsdom */

const { replaceMessagesEdited } = require('../../plugins/plugins/utils/functions')

describe('replaceMessagesEdited - orphan edit synthesis', () => {
	test('creates synthetic base when only edit exists', async () => {
		const editMsg = {
			signature: 'sig-edit',
			chatReference: 'sig-base',
			decodedMessage: { message: 'edited content' },
			sender: 'QMU73pUQhrjojxn5ZEMsaZv2b25xxhvmJj',
			senderName: 'Test Sender',
			timestamp: 123456,
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
			decodedMessages: [editMsg],
			parentEpml,
			isReceipient: false,
			decodeMessageFunc,
			_publicKey: null,
			symKeys: {},
			addToUpdateMessageHashmap
		})

		expect(parentEpml.request).toHaveBeenCalled()
		expect(result).toHaveLength(1)
		const synthetic = result[0]
		expect(synthetic.signature).toBe('sig-base')
		expect(synthetic.syntheticBase).toBe(true)
		expect(synthetic.originalSignature).toBe('sig-base')
		expect(synthetic.editSignature).toBe('sig-edit')
		expect(synthetic.decodedMessage).toEqual(editMsg.decodedMessage)
		expect(addToUpdateMessageHashmap).toHaveBeenCalledWith(result)
	})
})
