const fs = require('fs')
const path = require('path')

const themeDirectory = 'shorty-blog'
const pluginDirectory = 'portfolio-post-types'

const __APP__ = fs.realpathSync(process.cwd())
const __BUILD__ = path.resolve(__APP__, 'build')
const __CLIENT__ = path.resolve(__APP__, 'client')
const __CONFIG__ = path.resolve(__APP__, 'config')
const __LIBS__ = path.resolve(__APP__, 'libs')
const __NODE_MODULES__ = path.resolve(__APP__, 'node_modules')
const __SERVER__ = path.resolve(__APP__, 'server')
const __THEME__ = path.resolve(__APP__, `wp/wp-content/themes/${themeDirectory}`)
const __PLUGIN__ = path.resolve(__APP__, `wp/wp-content/plugins/${pluginDirectory}`)

const __WORDPRESS__ = path.resolve(__APP__, 'wp')

const getResolver = root => relativePath => path.resolve(root, relativePath)

const resolveApp = getResolver(__APP__)
const resolveBuild = getResolver(__BUILD__)
const resolveClient = getResolver(__CLIENT__)
const resolveConfig = getResolver(__CONFIG__)
const resolveLibs = getResolver(__LIBS__)
const resolveNodeModules = getResolver(__NODE_MODULES__)
const resolvePlugin = getResolver(__PLUGIN__)
const resolveServer = getResolver(__SERVER__)
const resolveTheme = getResolver(__THEME__)
const resolveWordpress = getResolver(__WORDPRESS__)

module.exports = {
    app: __APP__,
    build: __BUILD__,
    client: __CLIENT__,
	config: __CONFIG__,
	libs: __LIBS__,
	node_modules: __NODE_MODULES__,
	plugin: __PLUGIN__,	
    server: __SERVER__,    
	theme: __THEME__,
    wp: __WORDPRESS__,

	entries: {
		app: resolveClient('js/app/index.js'),
		admin: resolveClient('js/admin/index.js'),
		style: resolveClient('js/style/index.js')
	},

    stylelint_config: resolveConfig('stylelint.config'),
	theme_header: resolveTheme('style.css'),

    build_header: resolveBuild('style.css'),
	build_css: resolveBuild('css'),
	build_css_pages: resolveBuild('css/pages'),
	build_js: resolveBuild('js'),
	
	config_tokens: resolveConfig('tokens'),

    wp_content: resolveWordpress('wp-content'),
    wp_themes: resolveWordpress('wp-content/themes'),
	wp_plugins: resolveWordpress('wp-content/plugins'),

    theme_js: resolveTheme('js'),
	theme_css: resolveTheme('css'),
	theme_css_pages: resolveBuild('css/pages'),

    client_sass: resolveClient('sass'),
    client_js: resolveClient('js'),

	server_themes: resolveServer('themes'),
	server_theme: resolveServer(`themes/${themeDirectory}`),
	server_plugins: resolveServer('plugins'),
	server_plugin: resolveServer('plugins/portfolio-post-types'),

	server_theme_js: resolveServer(`themes/${themeDirectory}/js`),
	server_theme_css: resolveServer(`themes/${themeDirectory}/css`),
	server_theme_css_pages: resolveServer(`themes/${themeDirectory}/css/pages`),

    resolveApp,
	resolveBuild,
	resolveClient,
	resolveConfig,
	resolveLibs,
	resolveNodeModules,
	resolvePlugin,
	resolveServer,
	resolveTheme,
	resolveWordpress
}