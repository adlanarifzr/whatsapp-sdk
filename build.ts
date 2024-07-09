import dts from 'bun-plugin-dts';

await Bun.build({
	entrypoints: [
		'./index.ts',
		'./webhook.ts',
	],
	outdir: './dist',
	plugins: [
		dts(),
	],
	minify: true,
})