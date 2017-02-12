var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var baseWebpackConfig = require('./webpack.config.base')
var config = merge(baseWebpackConfig, {
    devtool: 'eval',
    module: {
        rules: [{
            test: /\.css$/,
            loader: 'style-loader!css-loader!postcss-loader'
        }, {
            test: /\.less/,
            loader: 'style-loader!css-loader!postcss-loader!less-loader'
        }, {
            test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
            loader: 'file-loader'
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            chunks: ['app'],
            filename: 'index.html',
            template: 'src/template/index.html',
            inject: true
        }),
        new HtmlWebpackPlugin({
            chunks: ['login'],
            filename: 'login.html',
            template: 'src/template/login.html',
            inject: true
        })
    ]
})

Object.keys(config.entry).forEach(function(name) {
    config.entry[name] = ['react-hot-loader/patch', 'webpack-hot-middleware/client?reload=true&noInfo=false'].concat(config.entry[name])
})

module.exports = config
