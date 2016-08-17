/**
 * at project root dir:
 *     webpack.config.js
 */
var Path = require('path');

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

    module: {
        // 首先执行的 loader; 这里可以引入一些语法检查工具等;
        preloaders: [],

        // 其次执行的 loader 
        loaders: [
            // 处理 css
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
                // loaders: ['style', 'css']    // 简写方式
                // loader: 'style-loader!css-loader'    // 简写方式
                // loader: 'style!css'      // 更简写方式
            },
            // 处理 js 
            {
                test: /\.js$/,
                loaders: ['babel-loader?presets[]=es2015,presets[]=stage-0']
            }
        ],

        // 最后执行的 loader, 这里可以执行一些单元测试, 覆盖率测试等;
        postloaders: []
    }
};