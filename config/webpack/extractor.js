const ExtractTextPlugin = require('extract-text-webpack-plugin')

const paths = require('../paths')

const extractCSSFile = (filename, publicPath = paths.build_css, extension = {}) => {
    return new ExtractTextPlugin(Object.assign({}, {
        filename, publicPath,
    }, extension))
}

const makeFileExtractors = (files) => {
    return Object.keys(files).reduce((map, name) => {
        map[name] = files[name]
        return map
    }, {})
}

const extractor = makeFileExtractors({
	admin: extractCSSFile('css/admin.css'),
	app: extractCSSFile('css/app.css'),
	critical: extractCSSFile('css/critical.css'),
    header: extractCSSFile('css/style.css'),
	
	home: extractCSSFile('css/pages/home.css')
})

module.exports = extractor