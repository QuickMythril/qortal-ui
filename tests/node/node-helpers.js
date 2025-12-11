const DEFAULT_NODE_URL = process.env.QORTAL_NODE_URL || 'http://127.0.0.1:12391'
const API_KEY_HEADER = 'X-API-KEY'

const buildUrl = (path) => {
	const base = DEFAULT_NODE_URL.replace(/\/+$/, '')
	const normalized = path.startsWith('/') ? path : `/${path}`
	return `${base}${normalized}`
}

const withHeaders = (headers = {}) => {
	const merged = { ...headers }
	if (process.env.QORTAL_API_KEY) {
		merged[API_KEY_HEADER] = process.env.QORTAL_API_KEY
	}
	return merged
}

const fetchJson = async (path, init = {}) => {
	const res = await fetch(buildUrl(path), {
		...init,
		headers: withHeaders(init.headers)
	})
	if (!res.ok) {
		const body = await res.text().catch(() => '')
		throw new Error(`Request failed ${res.status} for ${path}: ${body}`)
	}
	return res.json()
}

const fetchText = async (path, init = {}) => {
	const res = await fetch(buildUrl(path), {
		...init,
		headers: withHeaders(init.headers)
	})
	if (!res.ok) {
		const body = await res.text().catch(() => '')
		throw new Error(`Request failed ${res.status} for ${path}: ${body}`)
	}
	return res.text()
}

const checkNodeStatus = async () => {
	try {
		const status = await fetchJson('/admin/status')
		return { available: true, status }
	} catch (error) {
		return { available: false, error }
	}
}

module.exports = {
	getNodeUrl: () => DEFAULT_NODE_URL,
	fetchJson,
	fetchText,
	checkNodeStatus
}
