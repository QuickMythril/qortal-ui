import {
	buildNodeRequestUrl,
	getNodeBaseUrl,
	isPublicNode,
	PUBLIC_NODE_TEMPLATE,
} from '../constants/nodes'

export const getSelectedNode = (state) =>
	state?.app?.nodeConfig?.knownNodes?.[state?.app?.nodeConfig?.node] || {}

export const getSelectedNodeBaseUrl = (state) =>
	getNodeBaseUrl(getSelectedNode(state))

export const getSelectedNodeApiKey = (state) =>
	getSelectedNode(state)?.apiKey || ''

export const getSelectedNodeInfo = (state) => {
	const node = getSelectedNode(state)
	return {
		...node,
		baseUrl: getNodeBaseUrl(node),
		isPublic: isPublicNode(node),
	}
}

export const resolveNodeForRequest = (state, options = {}) => {
	const { usePublicFallback = false, nodeOverride } = options
	const selectedNode = nodeOverride || getSelectedNode(state)

	if (selectedNode && getNodeBaseUrl(selectedNode)) {
		return selectedNode
	}

	if (usePublicFallback) {
		return PUBLIC_NODE_TEMPLATE
	}

	return null
}

export const buildRequestUrl = (path, state, options = {}) => {
	const node = resolveNodeForRequest(state, options)
	if (!node) {
		throw new Error('No node selected for request')
	}
	return buildNodeRequestUrl(path, node, {
		usePublicFallback: options.usePublicFallback,
	})
}

export const isSelectedNodePublic = (state) => isPublicNode(getSelectedNode(state))
