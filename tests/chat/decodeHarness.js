// Simplified decode logic mirroring ChatPage.decodeMessage branches
export const decodeHarness = ({ isReceipient, _publicKey, symKeys }) => {
	const decodeMessage = async (encodedMessageObj) => {
		let decodedMessageObj = {}

		if (isReceipient === true) {
			// direct chat
			if (encodedMessageObj.isEncrypted === true && encodedMessageObj.data) {
				const senderPubKey = _publicKey && _publicKey.key
				if (senderPubKey) {
					const decodedMessage = window.parent.decryptChatMessageBase64(
						encodedMessageObj.data,
						window.parent.reduxStore.getState().app.selectedAddress.keyPair.privateKey,
						senderPubKey,
						encodedMessageObj.reference
					)
					decodedMessageObj = { ...encodedMessageObj, decodedMessage }
				} else {
					decodedMessageObj = { ...encodedMessageObj, decodedMessage: 'Cannot Decrypt Message!' }
				}
			} else if (encodedMessageObj.isEncrypted === false && encodedMessageObj.data) {
				const decodedMessage = window.parent.Base64Message.decode(encodedMessageObj.data, symKeys)
				decodedMessageObj = { ...encodedMessageObj, decodedMessage }
			} else {
				decodedMessageObj = { ...encodedMessageObj, decodedMessage: 'Cannot Decrypt Message!' }
			}
		} else {
			// group chat
			let decodedMessage
			const noRef = 'noref'

			if (encodedMessageObj.isEncrypted === true) {
				if (encodedMessageObj.chatReference) {
					decodedMessage = window.parent.Base64Message.decode(encodedMessageObj.data, symKeys, encodedMessageObj.chatReference)
				} else {
					decodedMessage = window.parent.Base64Message.decode(encodedMessageObj.data, symKeys, noRef)
				}
				if (!decodedMessage) {
					decodedMessage = 'Cannot Decrypt Message!'
				}
			} else if (encodedMessageObj.chatReference) {
				decodedMessage = window.parent.Base64Message.decode(encodedMessageObj.data, symKeys, encodedMessageObj.chatReference)
			} else {
				decodedMessage = window.parent.Base64Message.decode(encodedMessageObj.data, symKeys, noRef)
			}

			decodedMessageObj = { ...encodedMessageObj, decodedMessage }
		}

		return decodedMessageObj
	}

	return { decodeMessage }
}
