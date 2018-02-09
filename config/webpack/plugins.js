const path = require('path')
const webpack = require('webpack')

// const CopyWebpackPlugin = 			require('copy-webpack-plugin')
// const BundleAnalyzerPlugin = 		require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const DashboardPlugin = 			require('webpack-dashboard/plugin');
const FileManagerPlugin = 			require('filemanager-webpack-plugin')
const FileWatcherPlugin = 			require("filewatcher-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const LiveReloadPlugin = 			require('webpack-livereload-plugin')
const StyleLintPlugin = 			require('stylelint-webpack-plugin')
const UglifyJSPlugin = 				require('uglifyjs-webpack-plugin')
const VisualizerPlugin =			require('./../../libs/webpack-visualizer/lib/plugin')

const paths = 		require('../paths')
const extractor = 	require('./extractor')

const commonChunks = new webpack.optimize.CommonsChunkPlugin({
	name: 'vendor',
	filename: 'js/vendor.js',
	chunks: ['app', 'admin'],
	minChunks: (module, count) => {
		var context = module.context;
		return context && context.indexOf('node_modules') >= 0;
	},
})

const configToArray = (config) => {
	return Object.values(config)
}

const fileManager = new FileManagerPlugin({
	onEnd: [{
		copy: configToArray({
			css: {
				source: paths.build_css,
				destination: paths.theme_css
			},
			js: {
				source: paths.build_js,
				destination: paths.theme_js
			}
		})
	// }, {
	// 	copy: {
	// 		theme: {
	// 			source: paths.server_theme,
	// 			destination: paths.theme
	// 		},

	// 		plugin: {
	// 			source: paths.server_plugin,
	// 			destination: paths.plugin
	// 		}
	// 	}
	}, {
		move: configToArray({
			header: {
				source: path.resolve(paths.theme_css, 'style.css'),
				destination: path.resolve(paths.theme, 'style.css')
			}
		})
	}]
})

const fileWatcher = new FileWatcherPlugin({
	watchFileRegex: [
		`${paths.config}/**/*.yml`,
		`${paths.server}/**/*.php`,
		`${paths.server}/**/*.twig`
	]
})

// const bundleAnalyzer = new BundleAnalyzerPlugin()
const dashboard = new DashboardPlugin()
const friendlyErrors = new FriendlyErrorsWebpackPlugin({
	clearConsole: false
})
const livereload = new LiveReloadPlugin({
	delay: 3000
})
const styleLint = new StyleLintPlugin({
    configFile: paths.stylelint_config,
    files: paths.build_css
})
const uglify = new UglifyJSPlugin()
const visualizer = new VisualizerPlugin()

let pluginList = [
	styleLint,  
	fileManager,
	livereload,
	
	// bundleAnalyzer,
	commonChunks,		
	dashboard,
	friendlyErrors,
	// uglify,
	// visualizer
]

const isWatching = process.argv.includes('--watch')

if(isWatching){
	pluginList = [...pluginList,
		fileWatcher
	]
}

let extractorList = Object.keys(extractor).reduce((arr, key) => {
	arr.push(extractor[key])
	return arr
}, [])

module.exports = {
	list: [...pluginList, ...extractorList]
}