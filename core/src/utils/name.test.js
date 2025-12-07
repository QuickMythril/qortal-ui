import {
	pickDisplayName,
	pickDisplayNameOrAddress,
	pickNameOrNoName,
	avatarFallbackChar,
	pickPrimaryNameOrAddress
} from './name'

describe('name utils', () => {
	const account = {
		activeName: 'Active',
		primaryName: 'Primary',
		names: [{ name: 'First' }],
		addressInfo: { address: 'QAddress' }
	}

	it('prefers activeName, then primary, then first name', () => {
		expect(pickDisplayName(account)).toBe('Active')
		expect(pickDisplayName({ ...account, activeName: '' })).toBe('Primary')
		expect(pickDisplayName({ activeName: '', primaryName: '', names: [{ name: 'First' }] })).toBe('First')
	})

	it('fallbacks to address when no names for display', () => {
		expect(pickDisplayNameOrAddress({ addressInfo: { address: 'Addr1' } })).toBe('Addr1')
	})

	it('returns No Registered Name when no names and address present in name-only contexts', () => {
		expect(pickNameOrNoName({})).toBe('No Registered Name')
	})

	it('avatar fallback uses first letter of name then address', () => {
		expect(avatarFallbackChar(account)).toBe('A')
		expect(avatarFallbackChar({ activeName: '', primaryName: '', names: [{ name: 'First' }] })).toBe('F')
		expect(avatarFallbackChar({ addressInfo: { address: 'Q123' } })).toBe('Q')
	})

	it('pickPrimaryNameOrAddress prefers primary then first name then address', () => {
		expect(pickPrimaryNameOrAddress(account)).toBe('Primary')
		expect(pickPrimaryNameOrAddress({ primaryName: '', names: [{ name: 'First' }], addressInfo: { address: 'Q' } })).toBe('First')
		expect(pickPrimaryNameOrAddress({ primaryName: '', names: [], addressInfo: { address: 'Q' } })).toBe('Q')
	})
})
