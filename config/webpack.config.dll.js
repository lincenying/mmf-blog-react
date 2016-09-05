var path = require("path")
var webpack = require("webpack")
var HtmlWebpackPlugin = require('html-webpack-plugin')

var srcPath = path.join(__dirname, "../src")
var staticPath = path.join(__dirname, "../static")
var dllPath = '/static/dll/'

module.exports = {
    entry: {
        vendor: [path.join(srcPath, "vendors.js")]
    },
    output: {
        path: path.join(staticPath, "dll"),
        filename: "[name].[chunkhash].js",
        publicPath: dllPath,
        library: "[name]"
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.DllPlugin({
            path: path.join(staticPath, "[name]-manifest.json"),
            name: "[name]",
            context: srcPath
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new HtmlWebpackPlugin({
            filename: '../../index.html',
            template: 'template/index.html',
            inject: true
        }),
        new HtmlWebpackPlugin({
            filename: '../../login.html',
            template: 'template/login.html',
            inject: true
        })
    ],
    resolve: {
        root: path.resolve(__dirname, "../src"),
        modulesDirectories: ["node_modules"]
    }
}
