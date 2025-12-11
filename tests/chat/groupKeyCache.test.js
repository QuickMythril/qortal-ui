/** @jest-environment jsdom */

import './test-shim.js'
import { groupDecodeHarness } from './groupKeyHarness'

describe('group key cache hydrate', () => {
	test('uses symKeys from localStorage cache without network', () => {
		const groupId = 123
		const symKeyObject = { [groupId]: { key: 'cached-sym-key' } }
		localStorage.setItem('symKeysCurrent', JSON.stringify(symKeyObject))

		const decodeSpy = jest.fn().mockReturnValue({ message: 'ok' })
		window.parent.Base64Message.decode = decodeSpy

		const harness = groupDecodeHarness({ symKeys: symKeyObject[groupId] })
		const msg = {
			signature: 'sig-group',
			chatReference: 'ref-1',
			data: 'ZmFrZS1iYXNlNjQ=',
			txGroupId: groupId,
			isEncrypted: false
		}

		const result = harness.decode(msg)

		expect(decodeSpy).toHaveBeenCalledWith(msg.data, symKeyObject[groupId], msg.chatReference)
		expect(result.decodedMessage).toEqual({ message: 'ok' })
	})
})
