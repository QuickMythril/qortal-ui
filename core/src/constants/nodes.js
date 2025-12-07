export const EXT_NODE_QORTAL_LINK = 'ext-node.qortal.link';
export const HTTPS_EXT_NODE_QORTAL_LINK = `https://${EXT_NODE_QORTAL_LINK}`;
export const gateways = [EXT_NODE_QORTAL_LINK];

const normalizeNodeUrl = (node) => {
	if (!node) return '';
	if (typeof node === 'string') return node;

	const protocol = node.protocol || 'http';
	const domain = node.domain || '';
	const port = node.port ? `:${node.port}` : '';

	return `${protocol}://${domain}${port}`;
};

export const isPublicNode = (node) => {
	const url = normalizeNodeUrl(node);
	return gateways.some((gateway) => url.includes(gateway));
};
