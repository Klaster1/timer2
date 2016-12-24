module.exports = {
	cacheId: 'timer',
	staticFileGlobs: [
		'dist/*.bundle.js',
		'src/**/*.svg',
		'index.html',
		'src/*.ico',
		'jspm_packages/system.js',
		'jspm.config.js',
		'jspm_packages/npm/systemjs-plugin-babel@0.0.16.json',
		'jspm_packages/npm/material-design-icons-iconfont@3.0.2/dist/fonts/MaterialIcons-Regular.woff2'
	],
	maximumFileSizeToCacheInBytes: 10485760,
	navigateFallback: '/index.html'
}