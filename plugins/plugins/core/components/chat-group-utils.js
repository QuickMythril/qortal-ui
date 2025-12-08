export const isGroupMember = (members, groupId) => {
	if (!groupId) return false
	if (!Array.isArray(members)) return false
	const target = String(groupId)
	return members.some((m) => m && String(m.groupId) === target)
}
