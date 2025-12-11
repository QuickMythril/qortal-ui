/** @jest-environment jsdom */

import './test-shim.js'
import { orderHarnessFactory } from './orderHarness'

const makeBase = () => ({
	signature: 'sig-base',
	decodedMessage: { message: 'hello' },
	sender: 'QMU73pUQhrjojxn5ZEMsaZv2b25xxhvmJj',
	timestamp: Date.now(),
	txGroupId: 0,
	isReaction: false,
	isEncrypted: false
})

const makeUpdate = () => ({
	signature: 'sig-update',
	chatReference: 'sig-base',
	originalSignature: 'sig-base',
	decodedMessage: { message: 'updated' },
	sender: 'QMU73pUQhrjojxn5ZEMsaZv2b25xxhvmJj',
	timestamp: Date.now() + 1,
	txGroupId: 0
})

const makeReaction = () => ({
	signature: 'sig-reaction',
	chatReference: 'sig-base',
	decodedMessage: JSON.stringify({ type: 'reaction', content: '👍', repliedTo: 'sig-base' }),
	sender: 'QMU73pUQhrjojxn5ZEMsaZv2b25xxhvmJj',
	timestamp: Date.now() + 2,
	txGroupId: 0,
	isReaction: true
})

describe('out-of-order arrival handling', () => {
	test('update arrives before base then base merges update', () => {
		const h = orderHarnessFactory()
		const update = makeUpdate()
		const base = makeBase()

		h.stashUpdateMessage(update)
		const renderable = h.prepareRenderableChunk([base])

		expect(renderable).toHaveLength(1)
		expect(renderable[0].decodedMessage).toEqual(update.decodedMessage)
		expect(h.getPendingUpdates().size).toBe(0)
	})

	test('reaction before base is retained and base renders when it arrives', () => {
		const h = orderHarnessFactory()
		const reaction = makeReaction()
		const base = makeBase()

		h.ingestReactionMessage(reaction)
		const renderable = h.prepareRenderableChunk([base])

		expect(renderable).toHaveLength(1)
		const snapshot = h.getReactionsSnapshot()
		expect(Object.keys(snapshot)).toContain(base.signature)
		expect(snapshot[base.signature]['👍']).toBeDefined()
	})
})
