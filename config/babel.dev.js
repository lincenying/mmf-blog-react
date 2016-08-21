/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports = {
    cacheDirectory: true,
    presets: [
        'babel-preset-es2015',
        'babel-preset-es2016',
        'babel-preset-stage-2',
        'babel-preset-react'
    ].map(require.resolve),
    plugins: [
        'babel-plugin-transform-runtime',
        'babel-plugin-transform-decorators-legacy'
    ].map(require.resolve)
};
