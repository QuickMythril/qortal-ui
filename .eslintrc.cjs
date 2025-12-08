module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true
	},
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	extends: ['eslint:recommended'],
	rules: {
		indent: ['error', 'tab', { SwitchCase: 1 }],
		quotes: ['error', 'single', { avoidEscape: true }],
		semi: ['error', 'never'],
		'no-unused-vars': ['warn', { argsIgnorePattern: '^_', ignoreRestSiblings: true }]
	},
	overrides: [
		{
			files: [
				'*.cjs',
				'*.config.js',
				'*.config.cjs',
				'*.conf.js',
				'build*.js',
				'watch*.js',
				'electron.js',
				'server.js',
				'build-setup.js',
				'scripts/**/*.js',
				'plugins/*.js',
				'config/**/*.js',
				'core/config/**/*.js',
				'core/server/**/*.js',
				'lib/**/*.js'
			],
			env: {
				node: true,
				es2021: true
			},
			parserOptions: {
				sourceType: 'script'
			}
		},
		{
			files: ['**/*.test.js'],
			env: {
				jest: true,
				node: true
			}
		}
	]
}
