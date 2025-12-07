import { getAccountNamesResponse, getPrimaryNameResponse } from './name-handlers'

const apiCall = jest.fn()

beforeEach(() => {
	apiCall.mockReset()
})

describe('getPrimaryNameResponse', () => {
	it('returns active name for selected address', async () => {
		const result = await getPrimaryNameResponse({
			address: 'ADDR1',
			selectedAddress: { address: 'ADDR1' },
			accountInfo: { activeName: 'Name3', primaryName: 'Name1' },
			apiCall
		})

		expect(apiCall).not.toHaveBeenCalled()
		expect(result).toBe('Name3')
	})

	it('falls back to API for other address', async () => {
		apiCall.mockResolvedValue({ name: 'RemotePrimary' })

		const result = await getPrimaryNameResponse({
			address: 'ADDR2',
			selectedAddress: { address: 'ADDR1' },
			accountInfo: { activeName: 'Name3', primaryName: 'Name1' },
			apiCall
		})

		expect(apiCall).toHaveBeenCalledWith({
			type: 'api',
			url: '/names/primary/ADDR2'
		})
		expect(result).toBe('RemotePrimary')
	})

	it('returns empty string when no primary available', async () => {
		apiCall.mockResolvedValue({})

		const result = await getPrimaryNameResponse({
			address: 'ADDR2',
			selectedAddress: { address: 'ADDR1' },
			accountInfo: {},
			apiCall
		})

		expect(result).toBe('')
	})

	it('uses primary from state when API empty for selected address', async () => {
		apiCall.mockResolvedValue({})

		const result = await getPrimaryNameResponse({
			address: 'ADDR1',
			selectedAddress: { address: 'ADDR1' },
			accountInfo: { activeName: '', primaryName: 'Name1' },
			apiCall
		})

		expect(result).toBe('Name1')
	})
})

describe('getAccountNamesResponse', () => {
	it('uses state allNames for selected address and reorders active to first', async () => {
		const result = await getAccountNamesResponse({
			address: 'ADDR1',
			selectedAddress: { address: 'ADDR1' },
			accountInfo: {
				activeName: 'Name3',
				allNames: [{ name: 'Name1' }, { name: 'Name2' }, { name: 'Name3' }]
			},
			apiCall
		})

		expect(apiCall).not.toHaveBeenCalled()
		expect(result).toEqual(['Name3', 'Name1', 'Name2'])
	})

	it('maps API results for non-selected address without reordering', async () => {
		apiCall.mockResolvedValue([{ name: 'Other1' }, { name: 'Other2' }])

		const result = await getAccountNamesResponse({
			address: 'ADDR2',
			selectedAddress: { address: 'ADDR1' },
			accountInfo: { activeName: 'Name3', allNames: [] },
			apiCall
		})

		expect(apiCall).toHaveBeenCalledWith({
			type: 'api',
			url: '/names/address/ADDR2?limit=0&reverse=false'
		})
		expect(result).toEqual(['Other1', 'Other2'])
	})

	it('does not reorder when active not present', async () => {
		apiCall.mockResolvedValue([{ name: 'NameA' }, { name: 'NameB' }])

		const result = await getAccountNamesResponse({
			address: 'ADDR1',
			selectedAddress: { address: 'ADDR1' },
			accountInfo: {
				activeName: 'Missing',
				allNames: []
			},
			apiCall
		})

		expect(result).toEqual(['NameA', 'NameB'])
	})
})
