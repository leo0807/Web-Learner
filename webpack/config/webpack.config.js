const path = require('path');

module.exports = {
    //入口文件
    entry: './src/index.js',
    output: {
        // 输出的文件名称
        filename: "bundle.js",
        // 输出的路径
        // 绝对路径
        path: path.resolve(__dirname, 'dist')
    },
    // 生产模式 production
    mode: 'development'
}