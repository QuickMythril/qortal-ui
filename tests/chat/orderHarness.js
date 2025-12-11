// Minimal harness to exercise out-of-order base/update/reaction merging without full ChatPage
const reactionsByRef = new Map()

export const orderHarnessFactory = () => {
	const messageBySignature = new Map()
	const pendingUpdatesByRef = new Map()

	const getMessageKey = (msg) => msg.originalSignature || msg.signature
	const getMessageTimestamp = (msg) => msg.timestamp || 0
	const isReactionMessage = (msg) => msg && (msg.isReaction || (typeof msg.decodedMessage === 'string' && msg.decodedMessage.includes('"isReaction"')))
	const isUpdateOnlyMessage = (msg) => Boolean(msg.chatReference && !msg.decodedMessage && !msg.message && !msg.isReaction && msg.isUpdateOnly)

	const applyPendingUpdatesToMessage = (msg) => {
		const key = getMessageKey(msg)
		if (!key) return msg
		if (pendingUpdatesByRef.has(key)) {
			const updates = pendingUpdatesByRef.get(key)
			updates.forEach((u) => {
				msg = { ...msg, ...u }
			})
			pendingUpdatesByRef.delete(key)
		}
		return msg
	}

	const stashUpdateMessage = (update) => {
		if (isReactionMessage(update)) return
		const ref = update.originalSignature || update.chatReference || update.signature
		if (!ref) return
		if (messageBySignature.has(ref)) {
			const existing = messageBySignature.get(ref)
			const merged = { ...existing, ...update }
			messageBySignature.set(ref, merged)
			return
		}
		pendingUpdatesByRef.set(ref, [...(pendingUpdatesByRef.get(ref) || []), update])
	}

	const prepareRenderableChunk = (messages) => {
		const renderable = messages.filter((m) => !isReactionMessage(m) && !isUpdateOnlyMessage(m))
		const seen = new Set()
		const result = []
		renderable.forEach((msg) => {
			const key = getMessageKey(msg)
			if (!key || seen.has(key)) return
			const incoming = applyPendingUpdatesToMessage({ ...msg })
			const existing = messageBySignature.get(key)
			let chosen = incoming
			if (existing) {
				const existingTs = getMessageTimestamp(existing)
				const incomingTs = getMessageTimestamp(incoming)
				chosen = incomingTs > existingTs ? { ...existing, ...incoming } : existing
			}
			messageBySignature.set(key, chosen)
			seen.add(key)
			result.push(chosen)
		})
		return result
	}

	const ingestReactionMessage = (item) => {
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
		if (!content || !sender || !timestamp || !chatReference) return
		const key = chatReference
		const bucket = reactionsByRef.get(key) || {}
		const list = bucket[content] ? [...bucket[content]] : []
		const existingIdx = list.findIndex(r => r.sender === sender)
		if (existingIdx !== -1) list.splice(existingIdx, 1)
		list.push({ sender, timestamp })
		bucket[content] = list
		reactionsByRef.set(key, bucket)
	}

	return {
		stashUpdateMessage,
		prepareRenderableChunk,
		ingestReactionMessage,
		getReactionsSnapshot: () => Object.fromEntries(reactionsByRef),
		getPendingUpdates: () => new Map(pendingUpdatesByRef)
	}
}
