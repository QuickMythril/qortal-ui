export const QORTAL_LINK_REGEX = /(qortal:\/\/\S+)/g

/**
 * Convert qortal:// links in the provided HTML string into clickable spans.
 * A custom click handler can be provided to control navigation behavior.
 */
export function processText(input, handleLinkClick) {
	if (typeof document === 'undefined' || typeof Node === 'undefined') {
		throw new Error('processText requires a DOM-like environment')
	}

	function processNode(node) {
		if (node.nodeType === Node.TEXT_NODE) {
			const parts = node.textContent.split(QORTAL_LINK_REGEX)
			if (parts.length > 0) {
				const fragment = document.createDocumentFragment()
				parts.forEach((part) => {
					if (part.startsWith('qortal://')) {
						const link = document.createElement('span')

						link.setAttribute('data-url', part)
						link.textContent = part
						link.style.color = 'var(--code-block-text-color)'
						link.style.textDecoration = 'underline'
						link.style.cursor = 'pointer'

						if (typeof handleLinkClick === 'function') {
							link.addEventListener('click', (e) => {
								e.preventDefault()
								handleLinkClick(part, e)
							})
						}

						fragment.appendChild(link)
					} else {
						const textNode = document.createTextNode(part)
						fragment.appendChild(textNode)
					}
				})

				node.replaceWith(fragment)
			}
		} else {
			for (const childNode of Array.from(node.childNodes)) {
				processNode(childNode)
			}
		}
	}

	const wrapper = document.createElement('div')
	wrapper.innerHTML = input
	processNode(wrapper)
	return wrapper
}
