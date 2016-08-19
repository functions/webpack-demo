/**
 * at project root dir:
 *     webpack.config.js
 */
var Path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('[name]@[chunkhash].css');
var ProgressPlugin = require('webpack/lib/ProgressPlugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');

var libsManifestJSON = require('./libs/vendors_manifest.json');


module.exports = {
    // 多入口文件的配置
    entry: {
        index: './src/scripts/index.js'
    },

    output: {
        path: './prd/',
        filename: '[name]@[chunkhash].js',
            // 这里的 [name] 对应 entry 的 key 
        chunkFilename: "[id].chunk@[chunkhash].js"
    },

    resolve: {
        // 配置路径的别名
        alias: {    // 别名的路径都必须使用绝对路径
            Styles: Path.resolve('./src/styles')
        }
    },

    devtool: '#source-map',

    module: {
        // 不扫描的文件或目录，正则匹配
        noParse: [
            /prd/
        ],
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
                exclude: /node_modules/,
                loaders: ['babel-loader?presets[]=es2015,presets[]=stage-0']
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ],

        // 最后执行的 loader, 这里可以执行一些单元测试, 覆盖率测试等;
        postloaders: []
    },

    plugins: [
        // 清空编译后的目录
        new CleanWebpackPlugin(['prd']),
        // 引用打包好的第三方库
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: libsManifestJSON
        }),
        // 第三方库的引用设置为全局变量
        new webpack.ProvidePlugin({
            $: "jquery"
        }),
        // 自动生成 html 
        new HtmlWebpackPlugin({
            template: './html/index.html',
            vendorFileName: '../libs/' + libsManifestJSON.name + '.js'
        }),
        // 导出 css 文件
        extractCSS,
        // 压缩 js
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // 根据文件内容生成 MD5
        new WebpackMd5Hash(),
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