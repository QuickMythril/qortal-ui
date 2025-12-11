const path = require('path')
const uiCore = require('./core/ui-core.js')
const config = require('./config/config.js')
const pluginsController = require('./plugins/default-plugins.js')
const generateBuildConfig = uiCore('generate_build_config')
const build = uiCore('build')
const buildDefalutPlugins = pluginsController('build')
const startTime = process.hrtime.bigint()
const lifecycleEvent = process.env.npm_lifecycle_event
const isDevBuild = lifecycleEvent === 'build-dev' || process.env.BUILD_DEV === '1'

if (isDevBuild) {
	process.env.BUILD_DEV = '1'
}

const srcConfig = {
	...config.build,
	minify: !isDevBuild,
	options: {
		...config.build.options,
		outputDir: path.join(__dirname, '/builtWWW'),
		sassOutputDir: path.join(__dirname, '/builtWWW/styles.bundle.css')
	}
}

const { buildConfig, inlineConfigs } = generateBuildConfig(srcConfig)

const formatDuration = (start) => {
	const ms = Number(process.hrtime.bigint() - start) / 1e6
	const totalSeconds = ms / 1000
	const hours = Math.floor(totalSeconds / 3600)
	const minutes = Math.floor((totalSeconds % 3600) / 60)
	const seconds = (totalSeconds % 60).toFixed(2)
	const parts = []

	if (hours) parts.push(`${hours}h`)
	if (minutes) parts.push(`${minutes}m`)
	parts.push(`${seconds}s`)

	return `${parts.join(' ')} (${ms.toFixed(2)} ms)`
}

async function runBuild() {
	if (isDevBuild) {
		console.log('Dev build: minification disabled for faster builds')
	}

	const coreStart = process.hrtime.bigint()

	await build(
		buildConfig.options,
		buildConfig.outputs,
		buildConfig.outputOptions,
		buildConfig.inputOptions,
			inlineConfigs
		)

	console.log(`Core build completed in ${formatDuration(coreStart)}`)
	console.log('Building and Bundling Plugins')

	const pluginsStart = process.hrtime.bigint()
	await buildDefalutPlugins()

	console.log(`Plugins build completed in ${formatDuration(pluginsStart)}`)
	console.log(`Total build completed in ${formatDuration(startTime)}`)
}

runBuild().catch(err => {
	console.error(err)
	process.exit(1)
})
