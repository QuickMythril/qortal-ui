import { isGroupMember } from '../chat-group-utils'

describe('isGroupMember', () => {
	test('matches group membership by id regardless of type', () => {
		const members = [{ groupId: 10 }, { groupId: '20' }]
		expect(isGroupMember(members, 10)).toBe(true)
		expect(isGroupMember(members, '20')).toBe(true)
		expect(isGroupMember(members, '30')).toBe(false)
	})

	test('handles invalid input safely', () => {
		expect(isGroupMember(null, 1)).toBe(false)
		expect(isGroupMember([], 1)).toBe(false)
		expect(isGroupMember([{ groupId: 5 }], null)).toBe(false)
	})
})
