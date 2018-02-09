const path = require('path')

const webpack = require('webpack')

const paths =   require('./paths')
const aliases = require('./webpack/aliases')
const plugins = require('./webpack/plugins')
const rules =   require('./webpack/rules')

module.exports = {
	entry: {
		'app': paths.entries.app,
		'admin': paths.entries.admin,
		'style': paths.entries.style
	},
	output: {
		filename: 'js/[name].js',
		path: paths.build
	},

	module: {
		rules: rules.list
	},
	stats: {
		chunks: false,
		chunkModules: false,
		chunkOrigins: false,
		depth: false,
		hash: true,		
		modules: false,
		performance: true,
	},
	resolve: {
		alias: aliases,
		modules: [
			paths.libs,
			paths.node_modules
		]
	},
	plugins: plugins.list
}