module.exports = {
	testEnvironment: 'node',
	transform: {
		'^.+\\.js$': 'babel-jest'
	},
	testMatch: ['**/__tests__/**/*.test.js', '**/?(*.)+(test).js'],
	moduleFileExtensions: ['js', 'json']
}
