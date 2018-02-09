const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const YamlImporter = require('node-sass-yaml-importer')
const { getType, isString, isObject, isArray } = require('@beautiful-code/type-utils')

const paths = require('../paths')
const extractor = require('./extractor')

const sassFileList = [
	'admin', 'app', 'critical', 'header', { 
		pages: [
			'home'
		]
	}
]

const extractCSSFile = (filename, publicPath = paths.build_css, extension = {}) => {
    return new ExtractTextPlugin(Object.assign({}, {
        filename, publicPath
    }, extension))
}

const sassDefinition = (test, extractor) => {
    return {
        test: test,
        use: extractor.extract({
            use: [{
                loader: 'css-loader',
                options: {
                    importLoaders: 1
                }
            }, {
                loader: 'resolve-url-loader'
            }, {
                loader: 'sass-loader',
                options: {
					importer: YamlImporter,
					includePaths: [
						paths.sass,
						paths.node_modules,
						paths.config_tokens
					]
                }
            }],
            fallback: 'style-loader'
        })
    }
}

const generateSassDefinition = (root, parent = '') => {
	let result = root.reduce((list, name) => {
		if(isString(name)){
			let pattern = new RegExp(`${name}\\.scss`, 'g')
			let extract = extractCSSFile(`css/${parent}${name}.css`)

			list[parent + name] = sassDefinition(pattern, extract)
		} else if(isObject(name)){
			Object.keys(name).map((nextParent) => {
				let nextRoot = name[nextParent]
				list = {...list, ...generateSassDefinition(nextRoot, `${nextParent}/`)}
			})
		}
		return list
	}, {})
	return result
}

const definitions = {
	// sass: { ...generateSassDefinition(sassFileList) },

	sass: {
		admin: sassDefinition(/admin\.scss/, extractor.admin),
		app: sassDefinition(/app\.scss/, extractor.app),
		critical: sassDefinition(/critical\.scss/, extractor.critical),
        header: sassDefinition(/style\.scss/, extractor.header),
        
		home: sassDefinition(/home\.scss/, extractor.home)
    },

    js: {
        test: /\.js$/,
		exclude: /(node_modules)/,
        use: {
            loader: 'babel-loader',
        }
	},

	php: {
		test: /\.php$/,
		exclude: /(vendor)/
	},

	fonts: {
		test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
		loader: 'url-loader'
	}
}

const configToArray = (config) => {
	return Object.values(config)
}

let rules = configToArray(definitions)
let sassRules = configToArray(rules.shift())

let list = [
	...rules,
	...sassRules
]

module.exports = {
    definitions, 
    list
}