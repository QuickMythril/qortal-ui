/* global self */

import { decryptGroupData, uint8ArrayToBase64, validateSecretKey } from './GroupEncryption'

const fetchJson = async (url) => {
	const res = await fetch(url)
	if (!res.ok) {
		const err = new Error(`Failed fetch ${url} status ${res.status}`)
		err.status = res.status
		throw err
	}
	return res.json()
}

self.onmessage = async (event) => {
	const { groupId, nodeUrl, privateKeyBase58 } = event.data || {}

	if (!groupId || !nodeUrl || !privateKeyBase58) {
		self.postMessage({ error: 'Invalid worker params' })
		return
	}

	const symIdentifier = `symmetric-qchat-group-${groupId}`

	try {
		const resources = await fetchJson(
			`${nodeUrl}/arbitrary/resources/searchsimple?mode=ALL&service=DOCUMENT_PRIVATE&identifier=${symIdentifier}&exactmatchnames=true&limit=0&reverse=true&prefix=true`
		)

		if (!Array.isArray(resources) || resources.length === 0) {
			self.postMessage({ error: 'No group keys found' })
			return
		}

		const latest = [...resources].sort((a, b) => (b.updated || b.created) - (a.updated || a.created))[0]
		const gAdminName = latest.name
		if (!gAdminName) {
			self.postMessage({ error: 'No publisher name for group key' })
			return
		}
		const groupAdmins = await fetchJson(`${nodeUrl}/groups/members/${groupId}?onlyAdmins=true&limit=0`)
		const adminList = Array.isArray(groupAdmins.members) ? groupAdmins.members : []
		let publisherOwner = null
		try {
			const nameRes = await fetchJson(`${nodeUrl}/names/${gAdminName}`)
			publisherOwner = nameRes && nameRes.owner
		} catch (e) { /* ignore */ }

		const adminExists = publisherOwner && adminList.some((m) => m.member === publisherOwner)

		if (!adminExists) {
			self.postMessage({ error: 'No valid admin for group key' })
			return
		}

		const dataUrl = `${nodeUrl}/arbitrary/DOCUMENT_PRIVATE/${gAdminName}/${symIdentifier}?encoding=base64&rebuild=true`
		const res = await fetch(dataUrl)
		if (!res.ok) {
			self.postMessage({ error: 'Failed to download group key' })
			return
		}

		const encryptedData = await res.text()
		const decrypted = decryptGroupData(encryptedData, privateKeyBase58)
		const decryptedBase64 = uint8ArrayToBase64(decrypted.decryptedData)
		const secretKeyObject = JSON.parse(new TextDecoder().decode(decrypted.decryptedData))

		if (!validateSecretKey(secretKeyObject)) {
			self.postMessage({ error: 'SecretKey is not valid' })
			return
		}

		self.postMessage({
			secretKeyObject,
			decryptedBase64,
			count: decrypted.count
		})
	} catch (error) {
		self.postMessage({ error: error.message || 'Group key worker failed' })
	}
}
