import { orderNamesWithPrimaryFirst } from './name-helpers.src'

describe('orderNamesWithPrimaryFirst', () => {
	it('returns empty array for no names', () => {
		expect(orderNamesWithPrimaryFirst('Name1', [])).toEqual([])
	})

	it('keeps original order when no primary provided', () => {
		const names = [{ name: 'B' }, { name: 'A' }]
		expect(orderNamesWithPrimaryFirst('', names)).toEqual(names)
	})

	it('moves primary to the front preserving the rest order', () => {
		const names = [{ name: 'Name2' }, { name: 'Name1' }, { name: 'Name3' }]
		const result = orderNamesWithPrimaryFirst('Name1', names)
		expect(result).toEqual([{ name: 'Name1' }, { name: 'Name2' }, { name: 'Name3' }])
	})

	it('does nothing when primary already first', () => {
		const names = [{ name: 'Name1' }, { name: 'Name2' }]
		expect(orderNamesWithPrimaryFirst('Name1', names)).toEqual(names)
	})
})
