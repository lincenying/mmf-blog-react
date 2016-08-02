/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var path = require('path');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// TODO: hide this behind a flag and eliminate dead code on eject.
// This shouldn't be exposed to the user.
var isInNodeModules = 'node_modules' ===
    path.basename(path.resolve(path.join(__dirname, '..', '..')));
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
var buildPath = path.join(__dirname, isInNodeModules ? '../../..' : '..', 'build');

var config = {
    devtool: 'eval',
    entry: {
        app: [
            require.resolve('webpack/hot/dev-server'),
            path.join(srcPath, 'index.jsx')
        ],
        login: [
            require.resolve('webpack/hot/dev-server'),
            path.join(srcPath, 'login.jsx')
        ],
        vendor: ['react', 'react-dom', 'react-router', 'react-redux', 'redux', 'react-redux', 'react-router-redux']
    },
    output: {
        // Next line is not used in dev but WebpackDevServer crashes without it:
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
            loader: 'babel',
            query: require('./babel.dev')
        }, {
            test: /\.css$/,
            include: srcPath,
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
        configFile: path.join(__dirname, 'eslint.js'),
        useEslintrc: false
    },
    postcss: function() {
        return [autoprefixer];
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['vendor', 'polyfill', 'app'],
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new HtmlWebpackPlugin({
            chunks: ['vendor', 'login'],
            filename: 'login.html',
            template: 'index.html',
            inject: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        // Note: only CSS is currently hot reloaded
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
};

Object.keys(config.entry).forEach(function(name) {
    config.entry[name] = ['./config/dev-client'].concat(config.entry[name])
})

module.exports = config;
