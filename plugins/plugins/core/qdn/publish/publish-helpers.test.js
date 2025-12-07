import { shouldFetchMetadata, pickPublishName } from './publish-helpers.src'

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

describe('pickPublishName', () => {
	it('prefers active when owned', () => {
		const result = pickPublishName(['Name1', 'Name2'], 'Name2', 'Name1')
		expect(result).toBe('Name2')
	})

	it('falls back to primary when active not owned', () => {
		const result = pickPublishName(['Name1', 'Name2'], 'Other', 'Name1')
		expect(result).toBe('Name1')
	})

	it('falls back to first name when neither active nor primary owned', () => {
		const result = pickPublishName(['Name3', 'Name4'], 'Other', 'Missing')
		expect(result).toBe('Name3')
	})

	it('returns empty when no owned names', () => {
		const result = pickPublishName([], 'Any', 'Any')
		expect(result).toBe('')
	})
})
