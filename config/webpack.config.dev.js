var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var baseWebpackConfig = require('./webpack.config.base')
var config = merge(baseWebpackConfig, {
    devtool: 'eval',
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style!css?-autoprefixer!postcss'
        }, {
            test: /\.less/,
            loader: 'style!css?-autoprefixer!postcss!less'
        }, {
            test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
            loader: 'file',
        }, ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin(),
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
})

Object.keys(config.entry).forEach(function(name) {
    config.entry[name] = ['./config/dev-client'].concat(config.entry[name])
})

module.exports = config
