export const shouldFetchMetadata = (lastFetchedName, selectedName) => {
	if (!selectedName) return false
	return selectedName !== lastFetchedName
}
