/** @jest-environment jsdom */

import './test-shim.js'

// Minimal wrapper to reuse ingestReactionMessage logic without pulling ChatPage imports
import { ingestReactionMessageFactory } from './reactionsHarness'

describe('ingestReactionMessage (isolated)', () => {
	test('stores reaction without requiring base', () => {
		const harness = ingestReactionMessageFactory()
		const reaction = {
			signature: 'sig-reaction',
			chatReference: 'sig-base',
			repliedTo: 'sig-base',
			decodedMessage: JSON.stringify({ type: 'reaction', content: '👍', repliedTo: 'sig-base' }),
			sender: 'QMU73pUQhrjojxn5ZEMsaZv2b25xxhvmJj',
			timestamp: Date.now(),
			txGroupId: 0,
			isReaction: true,
			isEncrypted: false
		}

		harness.ingestReactionMessage(reaction)

		const snapshot = harness.getSnapshot()
		expect(Object.keys(snapshot)).toContain('sig-base')
		expect(snapshot['sig-base']['👍']).toBeDefined()
		expect(snapshot['sig-base']['👍'][0].sender).toBe(reaction.sender)
	})
})
