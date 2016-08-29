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
