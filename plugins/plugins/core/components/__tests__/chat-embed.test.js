import { parseQortalEmbedLink, embedToString, extractEmbedFromMessage } from '../qdn-action-constants'
import { processText } from '../chat-link-utils'

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

	test('parses VIDEO embed link with mimeType', () => {
		const link = 'qortal://use-embed/VIDEO?name=bob&service=VIDEO&identifier=vid123&mimeType=video%2Fmp4'
		const parsed = parseQortalEmbedLink(link)
		expect(parsed).toEqual({
			type: 'VIDEO',
			name: 'bob',
			service: 'VIDEO',
			identifier: 'vid123',
			mimeType: 'video/mp4'
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

	test('creates video embed payload string', () => {
		const str = embedToString({
			type: 'VIDEO',
			service: 'VIDEO',
			name: 'alice',
			identifier: 'vid123',
			mimeType: 'video/mp4'
		})
		expect(str).toContain('"videos"')
		expect(str).toContain('"service":"VIDEO"')
		expect(str).toContain('"identifier":"vid123"')
		expect(str).toContain('"mimeType":"video/mp4"')
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

describe('extractEmbedFromMessage', () => {
	test('detects image embed and keeps normal qortal links', () => {
		const msg = 'Check link qortal://APP/Q-Assets/trade/28 and embed qortal://use-embed/IMAGE?name=alice&service=IMAGE&identifier=abc123'
		const { cleanText, embedData } = extractEmbedFromMessage(msg)

		expect(embedData).toEqual({
			type: 'IMAGE',
			name: 'alice',
			service: 'IMAGE',
			identifier: 'abc123'
		})
		expect(cleanText).toContain('qortal://APP/Q-Assets/trade/28')
		expect(cleanText).not.toContain('qortal://use-embed/IMAGE')
	})

	test('detects video embed and keeps normal qortal links', () => {
		const msg = 'Here is vid qortal://use-embed/VIDEO?name=bob&service=VIDEO&identifier=vid123 and link qortal://APP/Q-Shop/item'
		const { cleanText, embedData } = extractEmbedFromMessage(msg)
		expect(embedData).toEqual({
			type: 'VIDEO',
			name: 'bob',
			service: 'VIDEO',
			identifier: 'vid123'
		})
		expect(cleanText).toContain('qortal://APP/Q-Shop/item')
		expect(cleanText).not.toContain('qortal://use-embed/VIDEO')
	})

	test('returns original text when no valid embed is present', () => {
		const msg = 'No embeds here, just text'
		const result = extractEmbedFromMessage(msg)
		expect(result.embedData).toBeNull()
		expect(result.cleanText).toBe(msg)
	})
})

describe('processText', () => {
	let originalDocument
	let originalNode
	let dom

	beforeAll(() => {
		const { JSDOM } = require('jsdom')
		dom = new JSDOM('<!doctype html><html><body></body></html>')
		originalDocument = global.document
		originalNode = global.Node
		global.document = dom.window.document
		global.Node = dom.window.Node
	})

	afterAll(() => {
		global.document = originalDocument
		global.Node = originalNode
	})

	test('wraps qortal links in clickable spans', () => {
		const clicks = []
		const wrapper = processText('See qortal://APP/Q-Assets/trade/28 now', (url) => clicks.push(url))
		const spans = wrapper.querySelectorAll('span[data-url]')

		expect(spans.length).toBe(1)
		expect(spans[0].getAttribute('data-url')).toBe('qortal://APP/Q-Assets/trade/28')
		expect(spans[0].style.textDecoration).toBe('underline')
		expect(spans[0].style.cursor).toBe('pointer')

		// Simulate click
		spans[0].dispatchEvent(new dom.window.Event('click'))
		expect(clicks).toEqual(['qortal://APP/Q-Assets/trade/28'])
	})
})
