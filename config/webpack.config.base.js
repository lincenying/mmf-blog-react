var path = require('path');
var autoprefixer = require('autoprefixer')
var browserslist = require('browserslist')
var webpack = require('webpack')

var isInNodeModules = 'node_modules' === path.basename(path.resolve(path.join(__dirname, '..', '..')));
var relativePath = isInNodeModules ? '../../..' : '..';
var isInDebugMode = process.argv.some(arg =>
    arg.indexOf('--debug-template') > -1
);
if (isInDebugMode) {
    relativePath = '..';
}
var srcPath = path.resolve(__dirname, relativePath, 'src')
var nodeModulesPath = path.join(__dirname, '..', 'node_modules')
var buildPath = path.join(__dirname, isInNodeModules ? '../../..' : '..', 'dist')

var config = {
    entry: {
        app: [
            path.join(srcPath, 'index.jsx')
        ],
        login: [
            path.join(srcPath, 'login.jsx')
        ],
        vendor: [ 'react', 'react-addons-css-transition-group', 'react-dom', 'react-immutable-render-mixin', 'react-router-redux', 'react-redux', 'react-toastr', 'redux', 'redux-form', 'redux-immutablejs', 'immutable', './src/polyfill']
    },
    output: {
        path: buildPath,
        pathinfo: true,
        filename: '[name].js',
        publicPath: '/'
    },
    externals: {
        'jquery': 'jQuery'
    },
    resolve: {
        alias: {
            "alias-store": path.join(__dirname, "../src/store"),
            "alias-store-actions": path.join(__dirname, "../src/store/actions"),
            "alias-store-reducers": path.join(__dirname, "../src/store/reducers"),
            "alias-api": path.join(__dirname, "../src/api")
        },
        extensions: ['.js', '.jsx']
    },
    resolveLoader: {
        modules: [nodeModulesPath]
    },
    module: {
        rules: [{
            test: /\.js|\.jsx$/,
            loader: 'eslint',
            enforce: "pre",
            include: srcPath
        }, {
            test: /\.js|\.jsx$/,
            include: srcPath,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /\.json$/,
            loader: 'json'
        },{
            test: /\.(mp4|webm)$/,
            loader: 'url?limit=10000'
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                eslint: {
                    useEslintrc: true
                }
            }
        })
    ]
};

module.exports = config;
