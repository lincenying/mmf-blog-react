/* eslint-disable */

process.env.NODE_ENV = 'production';

require('shelljs/global')
var path = require('path');
var webpack = require('webpack');
var config = require('../config/webpack.config.dll');

var isInNodeModules = 'node_modules' === path.basename(path.resolve(path.join(__dirname, '..', '..')));
var relative = isInNodeModules ? '../..' : '.';
rm('-rf', relative + '/static/dll')

webpack(config).run(function(err, stats) {
    if (err) {
        console.error('Failed to create a production build. Reason:');
        console.error(err.message || err);
        process.exit(1);
    }

    console.log('Successfully generated a bundle in the static folder!');
});