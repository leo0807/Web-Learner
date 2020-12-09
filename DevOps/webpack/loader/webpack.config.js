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
    mode: 'development',
    // loader配置
    module: {
        // 对某个格式的文件进行转换处理
        rules: [
            {
                test: /\.css$/,
                use: [
                    // use数组里面中的执行顺序从下倒上,逆序执行
                    // 将js的样式内容插入到style标签里
                    "style-loader",
                    // 将css文件转换为js
                    "css-loader"
                ]
            }
        ]
    }
}