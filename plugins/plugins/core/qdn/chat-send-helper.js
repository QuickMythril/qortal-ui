export const MIN_QORT_FOR_CHAT = 4
export const MAX_CHAT_BYTES = 4000

/**
 * Extracted helper to drive SEND_CHAT_MESSAGE logic with dependency injection for testing.
 * deps: { parentEpml, selectedAddress, mapChatValidationError, computePow, showModalAndWait, showErrorAndWait }
 */
export const sendChatMessageInternal = async (data, deps) => {
	const {
		parentEpml,
		selectedAddress,
		mapChatValidationError,
		computePow,
		showModalAndWait
	} = deps

	const recipient = data.destinationAddress
	const groupId = data.groupId
	const chatReference = data.chatReference
	const isRecipient = !groupId

	if (!isRecipient && groupId && Number(groupId) !== 0) {
		const membership = await parentEpml.request('apiCall', {
			type: 'api',
			url: `/groups/membership/${groupId}/${selectedAddress.address}`
		})
		if (!membership || membership.error) {
			return '{"error": "Join this group to send messages."}'
		}
	}

	const fullMessageObject = data.fullMessageObject || data.fullContent
	let stringifyMessageObject = ''
	if (fullMessageObject) {
		if (typeof fullMessageObject === 'string') {
			stringifyMessageObject = fullMessageObject
		} else {
			stringifyMessageObject = JSON.stringify(fullMessageObject)
		}
	} else {
		const tiptapJson = {
			type: 'doc',
			content: [{
				type: 'paragraph',
				content: [{
					type: 'text',
					text: data.message
				}]
			}]
		}
		const messageObject = {
			messageText: tiptapJson,
			images: [],
			repliedTo: '',
			version: 3
		}
		stringifyMessageObject = JSON.stringify(messageObject)
	}

	const sizeBytes = new Blob([stringifyMessageObject]).size
	if (sizeBytes > MAX_CHAT_BYTES) {
		return '{"error": "Chat payload exceeds 4000 bytes."}'
	}

	let balance = 0
	try {
		balance = await parentEpml.request('apiCall', {
			type: 'api',
			url: `/addresses/balance/${selectedAddress.address}`
		})
	} catch (error) { /* ignore */ }

	const lowBalance = typeof balance === 'number' && balance < MIN_QORT_FOR_CHAT

	if (lowBalance) {
		const confirm = await showModalAndWait('LOW_BALANCE_CHAT', { balance })
		if (!confirm || confirm.action !== 'accept') {
			return '{"error": "User declined request"}'
		}
	}

	const difficulty = lowBalance ? 18 : 8
	const sendTimestamp = Date.now()

	const _reference = new Uint8Array(64)
	window.crypto.getRandomValues(_reference)
	const reference = window.parent.Base58.encode(_reference)

	let recipientPublicKey = ''
	if (isRecipient) {
		const res = await parentEpml.request('apiCall', {
			type: 'api',
			url: `/addresses/publickey/${recipient}`
		})
		if (res && res.error === 102) {
			return '{"error": "Cannot send an encrypted message to this user since they do not have their publickey on chain."}'
		} else if (res !== false) {
			recipientPublicKey = res
		} else {
			return '{"error": "Cannot send an encrypted message to this user since they do not have their publickey on chain."}'
		}
	}

	const buildChatRequest = () => {
		if (isRecipient) {
			return parentEpml.request('chat', {
				type: 18,
				nonce: selectedAddress.nonce,
				params: {
					timestamp: sendTimestamp,
					recipient,
					recipientPublicKey,
					hasChatReference: chatReference ? 1 : 0,
					chatReference: chatReference,
					message: stringifyMessageObject,
					lastReference: reference,
					proofOfWorkNonce: 0,
					isEncrypted: 1,
					isText: 1
				}
			})
		}
		return parentEpml.request('chat', {
			type: 181,
			nonce: selectedAddress.nonce,
			params: {
				timestamp: sendTimestamp,
				groupID: Number(groupId),
				hasReceipient: 0,
				hasChatReference: chatReference ? 1 : 0,
				chatReference: chatReference,
				message: stringifyMessageObject,
				lastReference: reference,
				proofOfWorkNonce: 0,
				isEncrypted: 0,
				isText: 1
			}
		})
	}

	const chatResponse = await buildChatRequest()
	if (chatResponse && chatResponse.error) {
		return JSON.stringify({ error: mapChatValidationError(chatResponse) })
	}

	const { nonce, chatBytesArray } = await computePow(chatResponse, difficulty)

	const signResponse = await parentEpml.request('sign_chat', {
		nonce: selectedAddress.nonce,
		chatBytesArray,
		chatNonce: nonce,
		apiVersion: 2
	})

	if (signResponse && signResponse.signature) {
		return signResponse
	}
	if (signResponse && signResponse.error) {
		return JSON.stringify({ error: mapChatValidationError(signResponse) })
	}
	return '{"error": "ERROR: Could not send message."}'
}
