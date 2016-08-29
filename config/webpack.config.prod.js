var path = require('path');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var isInNodeModules = 'node_modules' === path.basename(path.resolve(path.join(__dirname, '..', '..')));
var relativePath = isInNodeModules ? '../../..' : '..';
if (process.argv[2] === '--debug-template') {
    relativePath = '..';
}
var srcPath = path.resolve(__dirname, relativePath, 'src');
var nodeModulesPath = path.join(__dirname, '..', 'node_modules');
var indexHtmlPath = path.resolve(__dirname, relativePath, 'index.html');
var faviconPath = path.resolve(__dirname, relativePath, 'favicon.ico');
var buildPath = path.join(__dirname, isInNodeModules ? '../../..' : '..', 'dist');

module.exports = {
    bail: true,
    devtool: false,
    entry: {
        app: path.join(srcPath, 'index'),
        login: path.join(srcPath, 'login')
    },
    output: {
        path: buildPath,
        filename: 'static/js/[name].[chunkhash].js',
        chunkFilename: 'static/js/[name].[chunkhash].chunk.js',
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
            include: srcPath
        }],
        loaders: [{
            test: /\.js|\.jsx$/,
            include: srcPath,
            exclude: /node_modules/,
            loader: 'babel',
            query: require('./babel.prod')
        }, {
            test: /\.css$/,
            include: srcPath,
            loader: ExtractTextPlugin.extract('style', 'css?-autoprefixer!postcss')
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
            loader: 'file',
            query: {
                limit: 10000,
                name: 'static/img/[name].[hash:7].[ext]'
            }
        }, {
            test: /\.(mp4|webm)$/,
            loader: 'url?limit=10000'
        }]
    },
    eslint: {
        configFile: path.join(__dirname, 'eslint.js'),
        useEslintrc: false
    },
    postcss: function() {
        return [autoprefixer];
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new ExtractTextPlugin('static/css/[name].[contenthash].css'),
        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, "../src"),
            manifest: require("../static/vendor-manifest.json")
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            chunks: ["app", "login"]
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                //screw_ie8: true,
                warnings: false
            },
            mangle: {
                //screw_ie8: true
            },
            output: {
                comments: false,
                //screw_ie8: true
            }
        }),
        new HtmlWebpackPlugin({
            inject: true,
            chunks: ['commons', 'app'],
            filename: 'index.html',
            template: 'index.html',
            favicon: faviconPath,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true
            }
        }),
        new HtmlWebpackPlugin({
            inject: true,
            chunks: ['commons', 'login'],
            filename: 'login.html',
            template: 'login.html',
            favicon: faviconPath,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true
            }
        })
    ]
};
