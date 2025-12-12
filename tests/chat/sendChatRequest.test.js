/**
 * @jest-environment jsdom
 */

const { sendChatMessageInternal } = require('../../plugins/plugins/core/qdn/chat-send-helper')

const createBaseDeps = ({ balance = 5, pubKey = 'PUBKEY', chatResponse = { chatBytes: new Uint8Array([1]) }, signResponse = { signature: 'sig' }, membershipOk = true } = {}) => {
	const calls = []
	const parentEpml = {
		request: jest.fn((channel, payload) => {
			calls.push({ channel, payload })
			if (channel === 'apiCall') {
				if (payload.url && payload.url.includes('/addresses/balance/')) return balance
				if (payload.url && payload.url.includes('/addresses/publickey/')) return pubKey
				if (payload.url && payload.url.includes('/groups/membership/')) return membershipOk ? {} : { error: 1 }
			}
			if (channel === 'chat') return chatResponse
			if (channel === 'sign_chat') return signResponse
			return null
		})
	}

	const computePow = jest.fn().mockResolvedValue({ nonce: 7, chatBytesArray: new Uint8Array([9]) })
	const showModalAndWait = jest.fn().mockResolvedValue({ action: 'accept' })
	const mapChatValidationError = (res) => (res && res.message) || (res && res.error) || 'error'

	return {
		parentEpml,
		computePow,
		showModalAndWait,
		mapChatValidationError,
		calls
	}
}

beforeEach(() => {
	global.crypto = {
		getRandomValues: (arr) => {
			for (let i = 0; i < arr.length; i++) arr[i] = 1
			return arr
		}
	}
	window.parent.Base58 = {
		encode: () => 'ref'
	}
})

test('low-balance direct chat prompts and proceeds on accept', async () => {
	const deps = createBaseDeps({ balance: 3 })
	const res = await sendChatMessageInternal(
		{ destinationAddress: 'Q123', message: 'hello', chatReference: 'ref-1' },
		{
			parentEpml: deps.parentEpml,
			selectedAddress: { address: 'QMY', nonce: 1 },
			mapChatValidationError: deps.mapChatValidationError,
			computePow: deps.computePow,
			showModalAndWait: deps.showModalAndWait
		}
	)

	expect(deps.showModalAndWait).toHaveBeenCalledWith('LOW_BALANCE_CHAT', expect.any(Object))
	expect(deps.computePow).toHaveBeenCalledWith(expect.anything(), 18)
	expect(deps.parentEpml.request).toHaveBeenCalledWith('sign_chat', expect.objectContaining({ chatNonce: 7 }))
	expect(res.signature).toBe('sig')
})

test('low-balance direct chat stops when declined', async () => {
	const deps = createBaseDeps({ balance: 2 })
	deps.showModalAndWait.mockResolvedValue({ action: 'decline' })

	const res = await sendChatMessageInternal(
		{ destinationAddress: 'Q123', message: 'hello' },
		{
			parentEpml: deps.parentEpml,
			selectedAddress: { address: 'QMY', nonce: 1 },
			mapChatValidationError: deps.mapChatValidationError,
			computePow: deps.computePow,
			showModalAndWait: deps.showModalAndWait
		}
	)

	expect(res).toContain('User declined request')
	// Chat/sign should not be hit after decline
	expect(deps.parentEpml.request).not.toHaveBeenCalledWith('chat', expect.anything())
	expect(deps.parentEpml.request).not.toHaveBeenCalledWith('sign_chat', expect.anything())
})

test('group chat uses hasChatReference and difficulty 18 for low balance', async () => {
	const deps = createBaseDeps({ balance: 1 })

	const res = await sendChatMessageInternal(
		{ groupId: 123, message: 'group msg', chatReference: 'ref-2' },
		{
			parentEpml: deps.parentEpml,
			selectedAddress: { address: 'QMY', nonce: 2 },
			mapChatValidationError: deps.mapChatValidationError,
			computePow: deps.computePow,
			showModalAndWait: deps.showModalAndWait
		}
	)

	const chatCall = deps.calls.find((c) => c.channel === 'chat')
	expect(chatCall.payload.params.hasChatReference).toBe(1)
	expect(deps.computePow).toHaveBeenCalledWith(expect.anything(), 18)
	expect(res.signature).toBe('sig')
})

test('rejects payloads over 4000 bytes', async () => {
	const deps = createBaseDeps()
	const longText = 'x'.repeat(4100)
	const res = await sendChatMessageInternal(
		{ destinationAddress: 'Q123', message: longText },
		{
			parentEpml: deps.parentEpml,
			selectedAddress: { address: 'QMY', nonce: 1 },
			mapChatValidationError: deps.mapChatValidationError,
			computePow: deps.computePow,
			showModalAndWait: deps.showModalAndWait
		}
	)

	expect(res).toContain('Chat payload exceeds 4000 bytes')
})
