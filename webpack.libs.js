var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
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
        filename: '[name]_[chunkhash].js',
        library: '[name]_[chunkhash]'
    },

    plugins: [
        new CleanWebpackPlugin(['libs']),
        new webpack.DllPlugin({
            path: path.resolve('./libs/[name]_manifest.json'),
            name: '[name]_[chunkhash]',
            context: __dirname
        }),
        // 根据文件内容生成 MD5
        new WebpackMd5Hash()
    ]
};
