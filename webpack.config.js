/**
 * at project root dir:
 *     webpack.config.js
 */
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
    }
};