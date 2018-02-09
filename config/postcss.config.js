const path = require('path')
const paths = require('./paths')

const resolveToken = relativePath => path.resolve(paths.config, 'tokens', relativePath)
const getToken = name => resolveToken(`${name}.yml`)

const tokens = [
    'breakpoints', 'space'
]

module.exports = {
    plugins: {
        'postcss-import': {},
        'postcss-map': {
            maps: tokens.map((name) => getToken(name))
        },
        'postcss-mixins': {},
        'postcss-conditionals': {},
        'postcss-custom-selectors': {}, 
        'postcss-at-rules-variables': {},    
        'postcss-for': {},
        'postcss-simple-vars': {},        
        'postcss-each': {},
        'postcss-nested': {},        
        'postcss-cssnext': {
            browsers: ['last 2 versions', '> 5%']
        }
    }  
}