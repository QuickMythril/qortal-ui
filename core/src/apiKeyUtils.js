import * as api from 'qortal-ui-crypto'
import mykey from './functional-components/mykey-page'
import { isPublicNode } from './constants/nodes'

const isLocalNode = (node = {}) => {
	const domain = (node.domain || '').toLowerCase()
	return domain === '127.0.0.1' || domain === 'localhost'
}

export const checkApiKey = async (nodeConfig) => {
	const selectedNode = nodeConfig?.knownNodes?.[nodeConfig?.node]
	if (!selectedNode) return false

	const managementEnabled = selectedNode.enableManagement !== false
	const localNode = isLocalNode(selectedNode)
	let apiKey = selectedNode.apiKey

	// Skip generation/testing on the public node; ensure apiKey is cleared.
	if (isPublicNode(selectedNode)) {
		selectedNode.apiKey = ''
		nodeConfig.knownNodes[nodeConfig.node] = selectedNode
		localStorage.setItem('myQortalNodes', JSON.stringify(nodeConfig.knownNodes))
		return true
	}

	// Only try to generate when management is enabled, no key exists, and the node is local.
	const shouldGenerate = managementEnabled && !apiKey && localNode

	if (shouldGenerate) {
		// Attempt to generate an API key
		const generateUrl = '/admin/apikey/generate'

		try {
			const generateRes = await api.request(generateUrl, {
				method: 'POST'
			})

			if (generateRes != null && generateRes.error == null && generateRes.length >= 8) {
				console.log('Generated API key')

				apiKey = generateRes

				// Store the generated API key
				selectedNode.apiKey = apiKey
				nodeConfig.knownNodes[nodeConfig.node] = selectedNode
				localStorage.setItem('myQortalNodes', JSON.stringify(nodeConfig.knownNodes))
			} else {
				console.log('Unable to generate API key')
			}
		} catch (error) {
			console.warn('Unable to generate API key', error)
		}
	} else if (!apiKey && !managementEnabled) {
		// Management disabled (likely remote node) – skip hitting admin endpoints.
		console.log('API key generation skipped; management disabled for this node')
	}

	// Now test the API key
	let testResult = apiKey ? await testApiKey(apiKey) : false

	if (testResult === true) {
		console.log('API key test passed')
	} else {
		console.log('API key test failed')

		if (managementEnabled) {
			mykey.show()
		}
	}

	return testResult
}

export const testApiKey = async (apiKey) => {
	const testUrl = '/admin/apikey/test?apiKey=' + apiKey

	let testRes = await api.request(testUrl, {
		method: 'GET'
	})

	return testRes === true
}
