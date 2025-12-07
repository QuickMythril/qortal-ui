// Node Config Actions here...
import { ADD_NODE, EDIT_NODE, LOAD_NODE_CONFIG, REMOVE_NODE, SET_NODE } from '../app-action-types'
import { UI_VERSION } from '../version'
import { EXT_NODE_QORTAL_LINK, getNodeBaseUrl } from '../../constants/nodes'

const nodeConfigUrl = '/getConfig'

export const doLoadNodeConfig = () => {
	return (dispatch, getState) => {
		fetch(nodeConfigUrl).then(res => {
				return res.json()
			}).then(data => {
				const nodeConfig = {
					node: 0,
					knownNodes: [],
					version: ''
				}

				const storedNodes = JSON.parse(localStorage.getItem('myQortalNodes') || '[]')
				const storedSelectedNode = localStorage.getItem('mySelectedNode')

				const defaultNodes = [obj1, objPublic, obj2]
				const hydratedDefaults = defaultNodes.map(hydrateNode)
				const hydrateNode = (node) => {
					const hydrated = {
						name: node?.name || '',
						protocol: node?.protocol || 'http',
						domain: node?.domain || '',
						port: node?.port ?? '',
						enableManagement:
							typeof node?.enableManagement === 'boolean'
								? node.enableManagement
								: true,
						apiKey: node?.apiKey || ''
					}
					hydrated.baseUrl = getNodeBaseUrl(hydrated)
					return hydrated
				}

				let knownNodes =
					storedNodes && storedNodes.length > 0
						? storedNodes.map(hydrateNode)
						: hydratedDefaults

				const hasPublicNode = knownNodes.some(
					(node) => node.domain === EXT_NODE_QORTAL_LINK
				)

				if (!hasPublicNode) {
					knownNodes = [...knownNodes, hydrateNode(objPublic)]
				}

				localStorage.setItem('myQortalNodes', JSON.stringify(knownNodes))

				let selectedIndex = parseInt(storedSelectedNode, 10)
				if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= knownNodes.length) {
					selectedIndex = 0
					localStorage.setItem('mySelectedNode', selectedIndex)
				}

				nodeConfig.node = selectedIndex
				nodeConfig.knownNodes = knownNodes

				nodeConfig.version = UI_VERSION

				return dispatch(loadNodeConfig(nodeConfig))
			}).catch(err => {
				console.error(err)
			})
	}
}

const loadNodeConfig = (payload) => {
	return {
		type: LOAD_NODE_CONFIG,
		payload
	}
}

export const doSetNode = (nodeIndex) => {
	return (dispatch, getState) => {
		return dispatch(setNode(nodeIndex))
	}
}

const setNode = (payload) => {
	return {
		type: SET_NODE,
		payload
	}
}

export const doAddNode = (nodeObject) => {
	return (dispatch, getState) => {
		return dispatch(addNode(nodeObject))
	}
}

export const doRemoveNode = (index) => {
	return (dispatch, getState) => {
		return dispatch(removeNode(index))
	}
}

export const doEditNode = (index, nodeObject) => {
	return (dispatch, getState) => {
		return dispatch(editNode({ index, nodeObject }))
	}
}

const addNode = (payload) => {
	return {
		type: ADD_NODE,
		payload
	}
}

const editNode = (payload) => {
	return {
		type: EDIT_NODE,
		payload
	}
}

const removeNode = (payload) => {
	return {
		type: REMOVE_NODE,
		payload
	}
}

const obj1 = {
	name: 'Local Node',
	protocol: 'http',
	domain: '127.0.0.1',
	port: 12391,
	enableManagement: true,
	apiKey: ''
}

const objPublic = {
	name: 'Public Node',
	protocol: 'https',
	domain: EXT_NODE_QORTAL_LINK,
	port: 443,
	enableManagement: false,
	apiKey: ''
}

const obj2 = {
	name: 'Local Testnet',
	protocol: 'http',
	domain: '127.0.0.1',
	port: 62391,
	enableManagement: true,
	apiKey: ''
}
