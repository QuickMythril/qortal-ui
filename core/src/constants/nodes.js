export const EXT_NODE_QORTAL_LINK = 'ext-node.qortal.link'
export const HTTPS_EXT_NODE_QORTAL_LINK = `https://${EXT_NODE_QORTAL_LINK}`
export const gateways = [EXT_NODE_QORTAL_LINK]

export const PUBLIC_NODE_TEMPLATE = {
	name: 'Public Node',
	protocol: 'https',
	domain: EXT_NODE_QORTAL_LINK,
	port: 443,
	enableManagement: false,
	apiKey: '',
}

const normalizeNodeUrl = (node) => {
	if (!node) return ''
	if (typeof node === 'string') return node

	const protocol = node.protocol || 'http'
	const domain = node.domain || ''
	const port = node.port ? `:${node.port}` : ''

	return `${protocol}://${domain}${port}`
}

export const isPublicNode = (node) => {
	const url = normalizeNodeUrl(node)
	return gateways.some((gateway) => url.includes(gateway))
}

export const getNodeBaseUrl = (node) => normalizeNodeUrl(node)

export const getNodeIdentifier = (node) => {
	if (!node) return ''
	return `${node?.protocol || 'http'}://${node?.domain || ''}${
		node?.port ? `:${node.port}` : ''
	}`
}

export const buildNodeRequestUrl = (path, node, options = {}) => {
	const { usePublicFallback = false } = options
	const targetNode =
		node && getNodeBaseUrl(node)
			? node
			: usePublicFallback
				? PUBLIC_NODE_TEMPLATE
				: null

	if (!targetNode || !getNodeBaseUrl(targetNode)) {
		throw new Error('No node selected for request')
	}

	const base = getNodeBaseUrl(targetNode).replace(/\/+$/, '')
	const normalizedPath = path.startsWith('/') ? path : `/${path}`
	const url = `${base}${normalizedPath}`
	const apiKey = targetNode.apiKey

	if (apiKey) {
		const sep = url.includes('?') ? '&' : '?'
		return `${url}${sep}apiKey=${apiKey}`
	}

	return url
}
