module.exports = {
	testEnvironment: 'node',
	transform: {
		'^.+\\.js$': 'babel-jest'
	},
	transformIgnorePatterns: [
		'/node_modules/(?!(lit|@lit|lit-html|lit-element|pwa-helpers)/)'
	],
	testMatch: ['**/__tests__/**/*.test.js', '**/?(*.)+(test).js'],
	moduleFileExtensions: ['js', 'json']
}
