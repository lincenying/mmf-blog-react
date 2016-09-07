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
        alias: {
            "alias-store": path.join(__dirname, "../src/store"),
            "alias-store-actions": path.join(__dirname, "../src/store/actions"),
            "alias-store-reducers": path.join(__dirname, "../src/store/reducers"),
            "alias-api": path.join(__dirname, "../src/api")
        },
        extensions: ['', '.js', '.jsx']
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
            loader: 'babel'
        }, {
            test: /\.json$/,
            loader: 'json'
        },{
            test: /\.(mp4|webm)$/,
            loader: 'url?limit=10000'
        }]
    },
    eslint: {
        useEslintrc: true
    },
    postcss: [
        autoprefixer({ browsers: browserslist('last 2 version, > 0.1%')})
    ],
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, "../src"),
            manifest: require("../static/vendor-manifest.json")
        })
    ]
};

module.exports = config;
