const {
	checkNodeStatus,
	fetchJson,
	fetchText,
	getNodeUrl
} = require('./node-helpers')

let nodeAvailable = true
let chatGroupId = 0

const requireNode = () => {
	if (!nodeAvailable) {
		// eslint-disable-next-line no-console
		console.warn(`Chat tests skipped: node not reachable at ${getNodeUrl()}`)
		return false
	}
	return true
}

beforeAll(async () => {
	const result = await checkNodeStatus()
	nodeAvailable = result.available
})

describe('chat read-only queries', () => {
	test('chat messages query returns results for group 0', async () => {
		if (!requireNode()) return

		const messages = await fetchJson(`/chat/messages?txGroupId=${chatGroupId}&limit=5&reverse=true`)
		expect(Array.isArray(messages)).toBe(true)
		expect(messages.length).toBeGreaterThan(0)
		expect(messages[0]).toHaveProperty('timestamp')
		expect(messages[0]).toHaveProperty('sender')
		expect(messages[0]).toHaveProperty('txGroupId', 0)
	})

	test('chat message count endpoint responds for group 0', async () => {
		if (!requireNode()) return

		const countText = await fetchText(`/chat/messages/count?txGroupId=${chatGroupId}`)
		const count = parseInt(countText, 10)
		expect(Number.isInteger(count)).toBe(true)
		expect(count).toBeGreaterThan(0)
	})
})
