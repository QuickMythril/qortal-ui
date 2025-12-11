// Minimal harness for group decode using cached sym keys
export const groupDecodeHarness = ({ symKeys }) => {
	const decode = (msg) => {
		// Simulate group chat decode branch with isEncrypted=false
		const noRef = 'noref'
		const decoded = window.parent.Base64Message.decode(msg.data, symKeys, msg.chatReference || noRef)
		return { ...msg, decodedMessage: decoded }
	}
	return { decode }
}
