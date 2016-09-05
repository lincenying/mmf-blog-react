var path = require("path")
var webpack = require('webpack')
var merge = require('webpack-merge')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var baseWebpackConfig = require('./webpack.config.base')
var srcPath = path.resolve(__dirname, '../src')
var buildPath = path.join(__dirname, '../dist')
var config = merge(baseWebpackConfig, {
    bail: true,
    devtool: false,
    output: {
        path: buildPath,
        filename: 'static/js/[name].[chunkhash].js',
        chunkFilename: 'static/js/[name].[chunkhash].chunk.js',
        publicPath: '/'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            include: srcPath,
            loader: ExtractTextPlugin.extract(['css?-autoprefixer', 'postcss'])
        },  {
            test: /\.less/,
            include: srcPath,
            loader: ExtractTextPlugin.extract(['css?-autoprefixer', 'postcss', 'less'])
        }, {
            test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
            loader: 'file',
            query: {
                limit: 10000,
                name: 'static/img/[name].[hash:7].[ext]'
            }
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new ExtractTextPlugin('static/css/[name].[contenthash].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            chunks: ["app", "login"]
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new HtmlWebpackPlugin({
            inject: true,
            chunks: ['commons', 'app'],
            filename: 'index.html',
            template: 'index.html',
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
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true
            }
        })
    ]
})

module.exports = config
