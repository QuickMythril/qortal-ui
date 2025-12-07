export const getPrimaryNameResponse = async ({ address, selectedAddress, accountInfo = {}, apiCall }) => {
	if (!address) {
		throw new Error('address is required')
	}

	const selectedAddr = selectedAddress && selectedAddress.address ? selectedAddress.address : ''
	const activeName = accountInfo.activeName || ''
	const primaryFromState = accountInfo.primaryName || ''

	if (selectedAddr && address === selectedAddr && activeName) {
		return activeName
	}

	const res = await apiCall({
		type: 'api',
		url: `/names/primary/${address}`
	})

	const primaryName = (res && res.name) ? res.name : ((address === selectedAddr && primaryFromState) ? primaryFromState : '')
	return primaryName || ''
}

export const getAccountNamesResponse = async ({ address, selectedAddress, accountInfo = {}, apiCall }) => {
	if (!address) {
		throw new Error('address is required')
	}

	const selectedAddr = selectedAddress && selectedAddress.address ? selectedAddress.address : ''
	const activeName = accountInfo.activeName || ''

	let names = []

	if (selectedAddr && address === selectedAddr && Array.isArray(accountInfo.allNames) && accountInfo.allNames.length) {
		names = accountInfo.allNames
	} else {
		const res = await apiCall({
			type: 'api',
			url: `/names/address/${address}?limit=0&reverse=false`
		})
		if (Array.isArray(res)) {
			names = res
		}
	}

	const namesList = Array.isArray(names) ? names.map(item => (item && item.name) ? item.name : item) : []

	if (selectedAddr && address === selectedAddr && activeName) {
		const idx = namesList.findIndex(n => n === activeName)
		if (idx > 0) {
			const [activeEntry] = namesList.splice(idx, 1)
			namesList.unshift(activeEntry)
		}
	}

	return namesList
}
