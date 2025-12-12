const STORAGE_KEY = 'qortalBackgroundPreference'
const DEFAULT_PREFERENCE = 'classic'

const getStorage = () => {
	return typeof window !== 'undefined' ? window.localStorage : null
}

export const getBackgroundPreference = () => {
	const saved = getStorage()?.getItem(STORAGE_KEY)

	if (saved === 'none' || saved === 'classic') {
		return saved
	}

	return DEFAULT_PREFERENCE
}

export const applyBackgroundPreference = (preference = getBackgroundPreference()) => {
	const root = typeof document !== 'undefined' ? document.documentElement : null

	if (!root) {
		return
	}

	if (preference === 'none') {
		root.style.setProperty('--background', 'none')
	} else {
		root.style.removeProperty('--background')
	}
}

export const setBackgroundPreference = preference => {
	const normalized = preference === 'none' ? 'none' : 'classic'

	getStorage()?.setItem(STORAGE_KEY, normalized)
	applyBackgroundPreference(normalized)
}
