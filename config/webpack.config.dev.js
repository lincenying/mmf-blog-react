var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var baseWebpackConfig = require('./webpack.config.base')
var config = merge(baseWebpackConfig, {
    devtool: 'eval',
    module: {
        rules: [{
            test: /\.css$/,
            loader: 'style!css!postcss'
        }, {
            test: /\.less/,
            loader: 'style!css!postcss!less'
        }, {
            test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
            loader: 'file'
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendor"]
        }),
        new HtmlWebpackPlugin({
            chunks: ['vendor', 'app'],
            filename: 'index.html',
            template: 'src/template/index.html',
            inject: true
        }),
        new HtmlWebpackPlugin({
            chunks: ['vendor', 'login'],
            filename: 'login.html',
            template: 'src/template/login.html',
            inject: true
        })
    ]
})

Object.keys(config.entry).forEach(function(name) {
    config.entry[name] = ['./config/dev-client'].concat(config.entry[name])
})

module.exports = config
