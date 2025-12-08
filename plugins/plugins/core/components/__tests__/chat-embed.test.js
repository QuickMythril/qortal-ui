import { parseQortalEmbedLink, embedToString } from '../qdn-action-constants'

describe('parseQortalEmbedLink', () => {
	test('parses IMAGE embed link with required params', () => {
		const link = 'qortal://use-embed/IMAGE?name=alice&service=IMAGE&identifier=abc123&mimeType=image%2Fpng'
		const parsed = parseQortalEmbedLink(link)
		expect(parsed).toEqual({
			type: 'IMAGE',
			name: 'alice',
			service: 'IMAGE',
			identifier: 'abc123',
			mimeType: 'image/png'
		})
	})

	test('decodes html entities and ignores empty params', () => {
		const link = 'qortal://use-embed/IMAGE?name=bob&amp;service=IMAGE&amp;identifier=id%2B123&amp;mimeType='
		const parsed = parseQortalEmbedLink(link)
		expect(parsed).toEqual({
			type: 'IMAGE',
			name: 'bob',
			service: 'IMAGE',
			identifier: 'id+123'
		})
	})

	test('throws on invalid prefix', () => {
		expect(() => parseQortalEmbedLink('http://example.com')).toThrow('Invalid embed link')
	})
})

describe('embedToString', () => {
	test('creates image embed payload string', () => {
		const str = embedToString({
			type: 'IMAGE',
			service: 'IMAGE',
			name: 'alice',
			identifier: 'abc123'
		})
		expect(str).toContain('"service":"IMAGE"')
		expect(str).toContain('"name":"alice"')
		expect(str).toContain('"identifier":"abc123"')
		expect(str).toContain('"images"')
	})

	test('creates attachment embed payload string', () => {
		const str = embedToString({
			type: 'ATTACHMENT',
			service: 'FILE',
			name: 'alice',
			identifier: 'file123',
			fileName: 'doc.pdf'
		})
		expect(str).toContain('"attachments"')
		expect(str).toContain('"attachmentName":"doc.pdf"')
		expect(str).toContain('"service":"FILE"')
	})
})

// Future: add integration-like tests for ChatScroller rendering once IMAGE embeds are reintroduced.
