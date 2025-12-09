#!/usr/bin/env node
/**
 * Record a Chrome DevTools Protocol trace (and optional heap snapshot) from an Electron instance
 * started with a remote debugging port (e.g., npm run start-electron -- --remote-debugging-port=9222).
 *
 * Usage examples:
 *   node scripts/record-cdp-trace.js --trace ./trace.json
 *   node scripts/record-cdp-trace.js --trace ./trace.json --heap ./heap.heapsnapshot --duration 30000
 *
 * Requires chrome-remote-interface:
 *   npm install --no-save chrome-remote-interface
 */

const fs = require('fs')
const path = require('path')

let CDP
try {
	CDP = require('chrome-remote-interface')
} catch (err) {
	console.error('chrome-remote-interface is required. Install with:')
	console.error('  npm install --no-save chrome-remote-interface')
	process.exit(1)
}

const args = process.argv.slice(2)
const getArg = (flag, fallback) => {
	const idx = args.indexOf(flag)
	if (idx !== -1 && args[idx + 1]) return args[idx + 1]
	return fallback
}

const host = getArg('--host', 'localhost')
const port = Number(getArg('--port', '9222'))
const tracePath = getArg('--trace', path.join(process.cwd(), 'trace.json'))
const heapPath = getArg('--heap', null)
const durationMs = Number(getArg('--duration', '20000')) // auto-stop in ms
const waitForEnter = args.includes('--wait')

const log = (...msg) => console.log('[cdp-trace]', ...msg)

async function selectTarget() {
	const targets = await CDP.List({ host, port })
	// Prefer a page whose URL contains "app" or "q-chat", otherwise first page
	const preferred = targets.find(t => t.type === 'page' && /app|q-chat/i.test(t.url))
	const page = preferred || targets.find(t => t.type === 'page')
	if (!page) {
		throw new Error('No page targets found. Is the app running with --remote-debugging-port?')
	}
	return page
}

async function takeHeapSnapshot(client, outfile) {
	const { HeapProfiler } = client
	await HeapProfiler.enable()
	const chunks = []
	HeapProfiler.addHeapSnapshotChunk(({ chunk }) => chunks.push(chunk))
	log('Taking heap snapshot...')
	await HeapProfiler.takeHeapSnapshot({ reportProgress: false })
	fs.writeFileSync(outfile, chunks.join(''))
	log(`Heap snapshot saved to ${outfile}`)
	await HeapProfiler.disable()
}

async function recordTrace() {
	const target = await selectTarget()
	log(`Attaching to target: ${target.url}`)
	const client = await CDP({
		host,
		port,
		target: target.id || target
	})
	const { Tracing } = client

	const traceEvents = []

	Tracing.dataCollected(({ value }) => {
		traceEvents.push(...value)
	})

	Tracing.tracingComplete(async () => {
		fs.writeFileSync(tracePath, JSON.stringify({ traceEvents }, null, 2))
		log(`Trace saved to ${tracePath}`)

		if (heapPath) {
			await takeHeapSnapshot(client, heapPath)
		}

		await client.close()
		process.exit(0)
	})

	const categories = [
		'devtools.timeline',
		'blink.user_timing',
		'disabled-by-default-v8.cpu_profiler',
		'disabled-by-default-devtools.screenshot'
	].join(',')

	await Tracing.start({
		categories,
		options: 'record-as-much-as-possible',
		transferMode: 'ReportEvents'
	})

	const startTracing = async () => {
		let stopCalled = false
		const stop = async () => {
			if (stopCalled) return
			stopCalled = true
			await Tracing.end()
		}

		log(`Tracing... will auto-stop after ${durationMs / 1000}s. Press Enter to stop sooner.`)
		process.stdin.setEncoding('utf8')
		process.stdin.resume()
		process.stdin.on('data', () => stop())

		setTimeout(stop, durationMs).unref()
	}

	if (waitForEnter) {
		log('Press Enter to start tracing...')
		process.stdin.setEncoding('utf8')
		process.stdin.resume()
		process.stdin.once('data', () => {
			startTracing().catch(err => {
				console.error('[cdp-trace] Error after start:', err && err.message ? err.message : err)
				process.exit(1)
			})
		})
	} else {
		await startTracing()
	}
}

recordTrace().catch(err => {
	console.error('[cdp-trace] Error:', err && err.message ? err.message : err)
	process.exit(1)
})
