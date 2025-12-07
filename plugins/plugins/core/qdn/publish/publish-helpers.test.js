import { shouldFetchMetadata } from './publish-helpers.src'

describe('shouldFetchMetadata', () => {
	it('returns false when no selected name', () => {
		expect(shouldFetchMetadata('Prev', '')).toBe(false)
	})

	it('returns true when name changed', () => {
		expect(shouldFetchMetadata('Prev', 'NewName')).toBe(true)
	})

	it('returns false when name unchanged', () => {
		expect(shouldFetchMetadata('Same', 'Same')).toBe(false)
	})
})
