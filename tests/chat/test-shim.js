// Minimal shims for ChatPage dependencies in JSDOM tests
window.parent = window.parent || window
global.CSSStyleSheet = class {
	replaceSync() { }
}
document.adoptedStyleSheets = []
const parentEpmlMock = {
	subscribe: () => {},
	request: () => Promise.resolve()
}
global.parentEpml = parentEpmlMock
window.parentEpml = parentEpmlMock
jest.mock('web-worker:./computePowWorker.js', () => {
	return class {
		postMessage() {}
		terminate() {}
	}
}, { virtual: true })
jest.mock('web-worker:./computePowWorkerFile.js', () => {
	return class {
		postMessage() {}
		terminate() {}
	}
}, { virtual: true })
jest.mock('web-worker:./webworkerSortMessages.js', () => {
	return class {
		postMessage() {}
		terminate() {}
	}
}, { virtual: true })
jest.mock('web-worker:./webworkerDecodeMessages.js', () => {
	return class {
		postMessage() {}
		terminate() {}
	}
}, { virtual: true })
window.parent.reduxStore = {
	getState: () => ({
		app: {
			selectedAddress: {
				address: 'QMU73pUQhrjojxn5ZEMsaZv2b25xxhvmJj',
				keyPair: { privateKey: new Uint8Array(32) }
			},
			nodeConfig: { knownNodes: [{ protocol: 'http', domain: 'localhost', port: 12391 }], node: 0 },
			accountInfo: {}
		}
	})
}
window.parent.Base58 = {
	encode: (b) => Buffer.from(b).toString('base64'), // not used in these tests
	decode: (s) => new Uint8Array(Buffer.from(s, 'base64'))
}
window.parent.Base64Message = {
	decode: () => ({})
}
window.parent.decryptChatMessageBase64 = () => ({})
window.parent.Epml = function () { return { request: () => Promise.resolve() } }
window.parent.parentEpml = {
	subscribe: () => {},
	request: () => Promise.resolve()
}
global.parentEpml = window.parent.parentEpml
