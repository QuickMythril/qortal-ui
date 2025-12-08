import { get } from '../../translate'

// Returns a translated message for public-node blocks with a safe fallback
export const getPublicNodeBlockedMessage = () => {
    const msg = get('publicNode.actionBlocked')
    return msg === '[publicNode.actionBlocked]'
        ? 'Not available on the public node. Connect to your own node to continue.'
        : msg
}

