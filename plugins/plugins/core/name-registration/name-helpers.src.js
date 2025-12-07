export const orderNamesWithPrimaryFirst = (primaryName, names = []) => {
	if (!Array.isArray(names) || names.length === 0) return []
	if (!primaryName) return names

	const idx = names.findIndex(n => n && n.name === primaryName)
	if (idx <= 0) return names

	const primaryEntry = names[idx]
	const remaining = names.slice(0, idx).concat(names.slice(idx + 1))
	return [primaryEntry, ...remaining]
}
