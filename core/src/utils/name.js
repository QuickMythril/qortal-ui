export const pickDisplayName = (accountInfo = {}) => {
	return accountInfo?.activeName || accountInfo?.primaryName || accountInfo?.names?.[0]?.name || ''
}

export const pickDisplayNamePrimaryFirst = (accountInfo = {}) => {
	return accountInfo?.primaryName || accountInfo?.names?.[0]?.name || ''
}

export const pickAddress = (accountInfo = {}) => {
	return accountInfo?.addressInfo?.address || ''
}

export const avatarFallbackChar = (accountInfo = {}) => {
	const name = pickDisplayName(accountInfo)
	if (name) return name.charAt(0) || ''

	const addr = pickAddress(accountInfo)
	return addr ? addr.charAt(0) || '' : ''
}

export const pickDisplayNameOrAddress = (accountInfo = {}) => {
	return pickDisplayName(accountInfo) || pickAddress(accountInfo) || ''
}

export const pickNameOrNoName = (accountInfo = {}) => {
	return pickDisplayName(accountInfo) || 'No Registered Name'
}

export const pickPrimaryNameOrAddress = (accountInfo = {}) => {
	return accountInfo?.primaryName || accountInfo?.names?.[0]?.name || pickAddress(accountInfo) || ''
}
