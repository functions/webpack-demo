/**
 * at project root dir:
 *     webpack.config.js
 */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('[name]@[chunkhash].css');
var ProgressPlugin = require('webpack/lib/ProgressPlugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var libsManifestJSON = require('./libs/vendors_manifest.json');


module.exports = {
    // 多入口文件的配置
    entry: {
        index: [
            'webpack-dev-server/client?http://127.0.0.1:3000',
            'webpack/hot/only-dev-server',
            './src/scripts/index.js'
        ]
    },

    output: {
        path: path.resolve('./prd/'),
        publicPath: '/',
        filename: '[name].js',
            // 这里的 [name] 对应 entry 的 key 
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        // 指定解析的路径
        root: path.resolve('src'),
        extensions: ['', '.js', '.jsx', '.css'],
        // 配置路径的别名
        alias: {    // 别名的路径都必须使用绝对路径
            Styles: path.resolve('./src/styles')
        }
    },

    devtool: '#cheap-source-map',

    module: {
        // 其次执行的 loader 
        loaders: [
            // 处理 css
            {
                test: /\.css$/,
                // loader: extractCSS.extract(['css?sourceMap', 'postcss?parser=postcss-scss'])
                loaders: ['style', 'css?sourceMap', 'postcss?parser=postcss-scss']
            },
            // 处理 js 
            {
                test: /\.jsx?$/,
                include: /src\/scripts/,
                loaders: ['babel-loader?presets[]=es2015&presets[]=stage-0']
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
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
            vendorFileName: '../libs/' + libsManifestJSON.name.replace('_', '@') + '.js'
        }),
        // 导出 css 文件
        // extractCSS,
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