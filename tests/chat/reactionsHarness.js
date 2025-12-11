// Minimal harness for ingestReactionMessage logic without full ChatPage deps
let reactionsByRef = new Map()

export const ingestReactionMessageFactory = () => {
	const harness = {
		reactionsMapSnapshot: {},
		requestUpdate: () => {},
		messageQueue: [],
		ingestReactionMessage(item) {
			let parsed
			try {
				parsed = typeof item.decodedMessage === 'string' ? JSON.parse(item.decodedMessage) : item.decodedMessage
			} catch (e) {
				return
			}

			const content = parsed.content || parsed.message
			const sender = item.sender || parsed.sender
			const timestamp = item.timestamp || parsed.timestamp
			const chatReference = item.chatReference || item.repliedTo || parsed.repliedTo

			if (!content || !sender || !timestamp || !chatReference) {
				return
			}

			const contentState = parsed.contentState !== false
			const specialId = parsed.specialId || item.specialId
			const senderName = parsed.senderName || item.senderName

			const key = chatReference
			const bucket = reactionsByRef.get(key) || {}
			const list = bucket[content] ? [...bucket[content]] : []

			const existingIdx = list.findIndex(r => r.sender === sender)
			if (existingIdx !== -1) {
				if (timestamp < (list[existingIdx].timestamp || 0)) {
					reactionsByRef.set(key, bucket)
					return
				}
				list.splice(existingIdx, 1)
			}

			if (contentState) {
				list.push({ sender, senderName, timestamp, specialId })
				bucket[content] = list
			} else {
				const filtered = list.filter(r => r.sender !== sender)
				if (filtered.length > 0) {
					bucket[content] = filtered
				} else {
					delete bucket[content]
				}
			}

			if (Object.keys(bucket).length > 0) {
				reactionsByRef.set(key, bucket)
			} else {
				reactionsByRef.delete(key)
			}

			this.reactionsMapSnapshot = Object.fromEntries(reactionsByRef)

			if (specialId) {
				this.messageQueue = this.messageQueue.filter(msg => msg.specialId !== specialId)
			}

			this.requestUpdate()
		},
		getSnapshot() {
			return this.reactionsMapSnapshot
		}
	}

	return harness
}
