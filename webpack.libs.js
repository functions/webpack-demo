var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var path = require('path');

module.exports = {

    entry: {
        vendors: [
            'antd',
            'isomorphic-fetch',
            'react',
            'react-dom',
            'react-redux',
            'react-router',
            'redux',
            'redux-promise-middleware',
            'redux-thunk',
            'superagent',
            'jquery'
        ]
    },

    output: {
        path: path.resolve('./libs/'),
        filename: '[name]_[hash].js',
        library: '[name]_[hash]'
    },

    plugins: [
        new CleanWebpackPlugin(['libs']),
        new webpack.DllPlugin({
            path: path.resolve('./libs/manifest.json'),
            name: '[name]_[hash]',
            context: __dirname
        })
    ]
};
