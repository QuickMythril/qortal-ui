const rollup = require('rollup')

const configs = require('./build-config.js')()

const build = async () => {
	await Promise.all(configs.map(async file => {
		const bundle = await rollup.rollup(file.inputOptions)
		const { output } = await bundle.generate(file.outputOptions)

		for (const chunkOrAsset of output) {
			if (chunkOrAsset.type === 'asset') {
				// ...
			} else {
				// ...
			}
		}

		await bundle.write(file.outputOptions)
	}))

	console.log('BUILD PLUGINS ==> Bundling Done 🎉')
}

module.exports = build
