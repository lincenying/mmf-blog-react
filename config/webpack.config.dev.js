var path = require('path');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var isInNodeModules = 'node_modules' === path.basename(path.resolve(path.join(__dirname, '..', '..')));
var relativePath = isInNodeModules ? '../../..' : '..';
var isInDebugMode = process.argv.some(arg =>
    arg.indexOf('--debug-template') > -1
);
if (isInDebugMode) {
    relativePath = '..';
}
var srcPath = path.resolve(__dirname, relativePath, 'src');
var nodeModulesPath = path.join(__dirname, '..', 'node_modules');
var indexHtmlPath = path.resolve(__dirname, relativePath, 'index.html');
var faviconPath = path.resolve(__dirname, relativePath, 'favicon.ico');
var buildPath = path.join(__dirname, isInNodeModules ? '../../..' : '..', 'dist');

var config = {
    devtool: 'eval',
    entry: {
        app: [
            path.join(srcPath, 'index.jsx')
        ],
        login: [
            path.join(srcPath, 'login.jsx')
        ]
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
        extensions: ['', '.js', '.jsx'],
    },
    resolveLoader: {
        root: nodeModulesPath,
        moduleTemplates: ['*-loader']
    },
    module: {
        preLoaders: [{
            test: /\.js|\.jsx$/,
            loader: 'eslint',
            include: srcPath,
        }],
        loaders: [{
            test: /\.js|\.jsx$/,
            include: srcPath,
            exclude: /node_modules/,
            loader: 'babel',
            query: require('./babel.dev')
        }, {
            test: /\.css$/,
            loader: 'style!css!postcss'
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
            loader: 'file',
        }, {
            test: /\.(mp4|webm)$/,
            loader: 'url?limit=10000'
        }]
    },
    eslint: {
        useEslintrc: true
    },
    postcss: [
        autoprefixer({ browsers: [
            'ie >= 8',
            'ie_mob >= 10',
            'ff >= 26',
            'chrome >= 30',
            'safari >= 7',
            'ios >= 7',
            'android >= 2.3'
        ]})
    ],
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, "../src"),
            manifest: require("../static/vendor-manifest.json")
        }),
        new HtmlWebpackPlugin({
            chunks: ['app'],
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new HtmlWebpackPlugin({
            chunks: ['login'],
            filename: 'login.html',
            template: 'login.html',
            inject: true
        })
    ]
};

Object.keys(config.entry).forEach(function(name) {
    config.entry[name] = ['./config/dev-client'].concat(config.entry[name])
})

module.exports = config;
