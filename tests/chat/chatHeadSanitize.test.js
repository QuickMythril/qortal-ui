/** @jest-environment jsdom */

import './test-shim.js'
const { looksLikeReactionOrEdit, filterBaseEntries, mapByKey } = require('../../plugins/plugins/core/streams/streams')

describe('chat head sanitization', () => {
	test('filters reaction entries and retains previous base timestamps', () => {
		const prevDirect = [{ address: 'Q1', timestamp: 1000 }]
		const prevMap = mapByKey(prevDirect, 'address')
		const incoming = [
			{ address: 'Q1', timestamp: 2000, isReaction: true, chatReference: 'sig-base' },
			{ address: 'Q2', timestamp: 1500 }
		]
		const sanitized = filterBaseEntries(incoming, prevMap, 'address')
		expect(sanitized).toHaveLength(2)
		const q1 = sanitized.find(i => i.address === 'Q1')
		const q2 = sanitized.find(i => i.address === 'Q2')
		expect(q1.timestamp).toBe(1000) // kept previous
		expect(q2.timestamp).toBe(1500)
	})

	test('drops edits/reactions by decodedMessage markers', () => {
		const prev = [{ address: 'Q3', timestamp: 900 }]
		const prevMap = mapByKey(prev, 'address')
		const incoming = [
			{ address: 'Q3', timestamp: 999, decodedMessage: JSON.stringify({ isReaction: true }) },
			{ address: 'Q4', timestamp: 800, decodedMessage: JSON.stringify({ type: 'reaction' }) },
			{ address: 'Q5', timestamp: 700, decodedMessage: JSON.stringify({ isEdited: true }), chatReference: 'ref' }
		]
		const sanitized = filterBaseEntries(incoming, prevMap, 'address')
		expect(sanitized.find(i => i.address === 'Q3').timestamp).toBe(900)
		expect(sanitized.find(i => i.address === 'Q4')).toBeUndefined()
		expect(sanitized.find(i => i.address === 'Q5')).toBeUndefined()
	})

	test('helper detects reaction markers', () => {
		expect(looksLikeReactionOrEdit({ isReaction: true })).toBe(true)
		expect(looksLikeReactionOrEdit({ type: 'reaction' })).toBe(true)
		expect(looksLikeReactionOrEdit({ decodedMessage: JSON.stringify({ isReaction: true }) })).toBe(true)
		expect(looksLikeReactionOrEdit({ decodedMessage: JSON.stringify({ type: 'reaction' }) })).toBe(true)
		expect(looksLikeReactionOrEdit({})).toBe(false)
	})
})
