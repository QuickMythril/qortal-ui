const {
	checkNodeStatus,
	fetchJson,
	fetchText,
	getNodeUrl
} = require('./node-helpers')

const TEST_ENTROPY = '1111111111111111'
const TEST_PRIVATE_KEY = '4inFLgHhbhcTkGgXJTy5rH9a5z31G3S2BZZuUgPSf2Ee'
const TEST_PUBLIC_KEY = 'DuQKTVP4HYvCLaAnFEp7rTf1UFR3Zu4ccyxGEVNraYNt'
const TEST_ADDRESS = 'QMU73pUQhrjojxn5ZEMsaZv2b25xxhvmJj'
const TEST_NAME = 'qortal-ui-test'

let nodeAvailable = true
let cachedStatus = null

const requireNode = () => {
	if (!nodeAvailable) {
		pending(`Qortal node not reachable at ${getNodeUrl()}`)
		return false
	}
	return true
}

beforeAll(async () => {
	const result = await checkNodeStatus()
	nodeAvailable = result.available
	cachedStatus = result.status || null
})

describe('node availability', () => {
	test('admin status is reachable', () => {
		if (!requireNode()) return
		expect(cachedStatus).toBeTruthy()
		expect(cachedStatus).toHaveProperty('height')
		expect(cachedStatus).toHaveProperty('numberOfConnections')
		expect(typeof cachedStatus.height).toBe('number')
	})
})

describe('key derivation utilities', () => {
	test('deterministic entropy derives expected keypair and address', async () => {
		if (!requireNode()) return

		const derivedPrivate = await fetchText('/utils/privatekey', {
			method: 'POST',
			body: TEST_ENTROPY
		})
		expect(derivedPrivate).toBe(TEST_PRIVATE_KEY)

		const derivedPublic = await fetchText('/utils/publickey', {
			method: 'POST',
			body: derivedPrivate
		})
		expect(derivedPublic).toBe(TEST_PUBLIC_KEY)

		const address = await fetchText(`/addresses/convert/${derivedPublic}`)
		expect(address).toBe(TEST_ADDRESS)

		const isValid = await fetchText(`/addresses/validate/${address}`)
		expect(['true', 'false']).toContain(isValid)
		expect(isValid).toBe('true')
	})
})

describe('address and name reads', () => {
	test('returns account info for known address', async () => {
		if (!requireNode()) return

		const info = await fetchJson(`/addresses/${TEST_ADDRESS}`)
		expect(info).toHaveProperty('address', TEST_ADDRESS)
		expect(info).toHaveProperty('publicKey')
	})

	test('returns primary name and names list for known address', async () => {
		if (!requireNode()) return

		const primary = await fetchJson(`/names/primary/${TEST_ADDRESS}`)
		expect(primary).toHaveProperty('name', TEST_NAME)

		const names = await fetchJson(`/names/address/${TEST_ADDRESS}?limit=0&reverse=false`)
		expect(Array.isArray(names)).toBe(true)
		expect(names.map(n => n.name)).toContain(TEST_NAME)
	})

	test('public key and balance available for test address', async () => {
		if (!requireNode()) return

		const pk = await fetchText(`/addresses/publickey/${TEST_ADDRESS}`)
		expect(pk).toBe(TEST_PUBLIC_KEY)

		const balance = await fetchText(`/addresses/balance/${TEST_ADDRESS}`)
		const bal = parseFloat(balance)
		expect(isNaN(bal)).toBe(false)
		expect(bal).toBeGreaterThan(0)

		const lastRef = await fetchText(`/addresses/lastreference/${TEST_ADDRESS}`)
		expect(lastRef).not.toBe('false')
	})
})
