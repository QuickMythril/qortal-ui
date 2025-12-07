import { getNodeBaseUrl, isPublicNode } from '../constants/nodes';

export const getSelectedNode = (state) =>
	state?.app?.nodeConfig?.knownNodes?.[state?.app?.nodeConfig?.node] || {};

export const getSelectedNodeBaseUrl = (state) =>
	getNodeBaseUrl(getSelectedNode(state));

export const getSelectedNodeApiKey = (state) =>
	getSelectedNode(state)?.apiKey || '';

export const getSelectedNodeInfo = (state) => {
	const node = getSelectedNode(state);
	return {
		...node,
		baseUrl: getNodeBaseUrl(node),
		isPublic: isPublicNode(node),
	};
};
