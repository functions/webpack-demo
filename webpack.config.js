/**
 * at project root dir:
 *     webpack.config.js
 */
var Path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('[name].css');
var ProgressPlugin = require('webpack/lib/ProgressPlugin');

module.exports = {
    // 多入口文件的配置
    entry: {
        index: './src/scripts/index.js',
        list: './src/scripts/list.js'
    },

    output: {
        path: './prd/',
        filename: '[name].js'
            // 这里的 [name] 对应 entry 的 key 
    },

    resolve: {
        // 配置路径的别名
        alias: {    // 别名的路径都必须使用绝对路径
            Styles: Path.resolve('./src/styles')
        }
    },

    devtool: '#source-map',

    module: {
        // 首先执行的 loader; 这里可以引入一些语法检查工具等;
        preloaders: [],

        // 其次执行的 loader 
        loaders: [
            // 处理 css
            {
                test: /\.css$/,
                loader: extractCSS.extract(['css?sourceMap&minimize', 'postcss?parser=postcss-scss'])
            },
            // 处理 js 
            {
                test: /\.js$/,
                loaders: ['babel-loader?presets[]=es2015,presets[]=stage-0']
            }
        ],

        // 最后执行的 loader, 这里可以执行一些单元测试, 覆盖率测试等;
        postloaders: []
    },

    plugins: [
        // 导出 css 文件
        extractCSS,
        // 压缩 js
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // 显示加载进度
        new ProgressPlugin(function(percentage, msg) {
            console.log(parseInt(percentage * 100) + '%', msg);
        })
    ],

    // postcss 处理器
    postcss: function() {
        return [
            require('precss'),
            require('postcss-cssnext')()
        ]
    }

};