module.exports = {
	testEnvironment: 'node',
	transform: {
		'^.+\\.js$': 'babel-jest'
	},
	transformIgnorePatterns: [
		'/node_modules/(?!(lit|@lit|@lit-labs|lit-html|lit-element|pwa-helpers|emoji-picker-js|@material|tslib)/)'
	],
	testMatch: ['**/__tests__/**/*.test.js', '**/?(*.)+(test).js'],
	moduleFileExtensions: ['js', 'json']
}
