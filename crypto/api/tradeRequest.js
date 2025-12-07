// Trade Bot
import TradeBotCreateRequest from './transactions/trade-portal/tradebot/TradeBotCreateRequest'
import TradeBotRespondRequest from './transactions/trade-portal/tradebot/TradeBotRespondRequest'
import signTradeBotTransaction from './transactions/trade-portal/tradebot/signTradeBotTransaction'
import DeleteTradeOffer from './transactions/trade-portal/tradeoffer/DeleteTradeOffer'
import { request } from './fetch-request'
import TradeBotRespondMultipleRequest from "./transactions/trade-portal/tradebot/TradeBotRespondMultipleRequest";
import { isPublicNode } from '../../core/src/constants/nodes'

const getSelectedNode = () => window.parent.reduxStore.getState().app.nodeConfig.knownNodes[
	window.parent.reduxStore.getState().app.nodeConfig.node
]

const ensureSendAllowed = () => {
	const node = getSelectedNode()
	if (isPublicNode(node)) {
		throw new Error('Public node does not allow this action')
	}
	return node
}

const buildApiKeySuffix = (node) => node?.apiKey ? `?apiKey=${node.apiKey}` : ''

// TradeBotCreateRequest
export const tradeBotCreateRequest = (requestObject) => {
	const txn = new TradeBotCreateRequest().createTransaction(requestObject)
	const myNode = getSelectedNode()
	const apiKeySuffix = buildApiKeySuffix(myNode)

	return request(`/crosschain/tradebot/create${apiKeySuffix}`, {
		method: 'POST',
		headers: {
			'Accept': 'text/plain',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(txn)
	})
}

// TradeBotRespondRequest
export const tradeBotRespondRequest = (requestObject) => {
	const txn = new TradeBotRespondRequest().createTransaction(requestObject)
	const myNode = getSelectedNode()
	const apiKeySuffix = buildApiKeySuffix(myNode)

	return request(`/crosschain/tradebot/respond${apiKeySuffix}`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(txn)
	})
}

// TradeBotRespondRequest
export const tradeBotRespondMultipleRequest = (requestObject) => {
	const txn = new TradeBotRespondMultipleRequest().createTransaction(requestObject)
	const myNode = getSelectedNode()
	const apiKeySuffix = buildApiKeySuffix(myNode)

	return request(`/crosschain/tradebot/respondmultiple${apiKeySuffix}`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(txn)
	})
}

// Sign Trade Transactions
export const signTradeBotTxn = (unsignedTxn, keyPair) => {
	return signTradeBotTransaction(unsignedTxn, keyPair)
}

// Delete Trade Offer
export const deleteTradeOffer = (requestObject) => {
	const txn = new DeleteTradeOffer().createTransaction(requestObject)
	const myNode = getSelectedNode()
	const apiKeySuffix = buildApiKeySuffix(myNode)

	return request(`/crosschain/tradeoffer${apiKeySuffix}`, {
		method: 'DELETE',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(txn)
	})
}

// Send Coin
const sendCoin = (coin, requestObject) => {
	const myNode = ensureSendAllowed()
	const apiKeySuffix = buildApiKeySuffix(myNode)
	return request(`/crosschain/${coin}/send${apiKeySuffix}`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(requestObject)
	})
}

// Send BTC
export const sendBtc = (requestObject) => sendCoin('btc', requestObject)

// Send LTC
export const sendLtc = (requestObject) => sendCoin('ltc', requestObject)

// Send DOGE
export const sendDoge = (requestObject) => sendCoin('doge', requestObject)

// Send DGB
export const sendDgb = (requestObject) => sendCoin('dgb', requestObject)

// Send RVN
export const sendRvn = (requestObject) => sendCoin('rvn', requestObject)

// Send ARRR
export const sendArrr = (requestObject) => sendCoin('arrr', requestObject)
