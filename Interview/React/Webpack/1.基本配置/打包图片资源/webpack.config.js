const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                // 处理图片资源
                test: /\.(jpg|png|gif)$/,
                //使用loader 和 file-loader
                // url-loader 依赖于 file-loader
                loader: 'url-loader',
                options: {
                    // 图片大小小于8kb，就会被base64处理
                    // 优点：减少请求数量（减少请求数量）
                    // 缺点：图片体积会更大，文件请求速度更慢
                    limit: 8 * 1024,
                },
                // 缺点 默认无法处理html中图片
                // 问题
                // 因为url-loader默认使用es6模块化解析，
                // 而html-loader引入图片是commonJS
                // 解析时会出问题：[object Module]
                // 解决：关闭url-loader的es6模块化，使用commonJS解析
                esModule: false,
                // 解决文件名称过长问题
                // [ext]取原文件拓展名
                name: '[hash:10].[ext]'
            },
            {
                test: '\.html$',
                // 处理html文件中的img图片（负责引入img，从而能被url-loader进行处理）
                loader: 'html-loader'
            },
            //打包其他资源
            // 除了HTML，JS，CSS以外的资源,如ICON
            {
                exclude: '/\.(css|js|html)$/',
                loader: 'file-loader',
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    mode: 'development'
}