/** @jest-environment jsdom */

import './test-shim.js'
// Pull the embed utils directly to avoid running the full chat-embed test suite
import { extractEmbedFromMessage } from '../../plugins/plugins/core/components/qdn-action-constants'

describe('embed parsing on decoded chat message', () => {
	test('strips embed link and returns structured embed info', () => {
		const msg = 'Hello qortal://use-embed/IMAGE?name=alice&service=IMAGE&identifier=img123 rest'
		const { cleanText, embedData } = extractEmbedFromMessage(msg)

		expect(embedData).toEqual({
			type: 'IMAGE',
			name: 'alice',
			service: 'IMAGE',
			identifier: 'img123'
		})
		expect(cleanText).toBe('Hello  rest')
	})
})
