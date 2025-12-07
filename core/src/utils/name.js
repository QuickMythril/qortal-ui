import { get as translateGet } from '../../translate'

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
	const name = pickDisplayName(accountInfo)
	if (name) return name

	// Prefer i18n key; fall back to English if translations aren't loaded.
	try {
		const translated = translateGet('general.noRegisteredName')
		return translated && !translated.startsWith('[') ? translated : 'No Registered Name'
	} catch (_) {
		return 'No Registered Name'
	}
}

export const pickPrimaryNameOrAddress = (accountInfo = {}) => {
	return accountInfo?.primaryName || accountInfo?.names?.[0]?.name || pickAddress(accountInfo) || ''
}
