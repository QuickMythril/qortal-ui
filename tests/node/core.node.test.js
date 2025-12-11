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
const NAMED_ADDRESS = process.env.QORTAL_NAME_ADDRESS || 'QWvqcCDBUVeX7RZAgBqHHAQKR2i9qMXjKN'

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

		const info = await fetchJson(`/addresses/${NAMED_ADDRESS}`)
		expect(info).toHaveProperty('address', NAMED_ADDRESS)
		expect(info).toHaveProperty('publicKey')
	})

	test('returns primary name and names list for known address', async () => {
		if (!requireNode()) return

		const primary = await fetchJson(`/names/primary/${NAMED_ADDRESS}`)
		expect(primary).toHaveProperty('name')

		const names = await fetchJson(`/names/address/${NAMED_ADDRESS}?limit=0&reverse=false`)
		expect(Array.isArray(names)).toBe(true)
		if (names.length > 0) {
			expect(names[0]).toHaveProperty('name')
		}
	})
})
