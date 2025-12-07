export const shouldFetchMetadata = (lastFetchedName, selectedName) => {
	if (!selectedName) return false
	return selectedName !== lastFetchedName
}

export const pickPublishName = (namesList, activeName, primaryName) => {
	const owned = Array.isArray(namesList) ? namesList.filter(Boolean) : []
	const useIfOwned = (name) => (name && owned.includes(name) ? name : '')

	const active = useIfOwned(activeName)
	if (active) return active

	const primary = useIfOwned(primaryName)
	if (primary) return primary

	return owned[0] || ''
}
