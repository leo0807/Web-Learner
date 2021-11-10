const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 创建style标签，将样式放入
                    // 'style-loader',
                    // 将css文件整合到js中
                    // 作用：这个loader取代style-loader，提取JS中到css成单独文件
                    MiniCssExtractPlugin.loader,
                    // 使用loader的默认配置
                    'css-loader',
                ]
            }
        ]
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: './src/index.html'
        // }),
        new miniCssExtractPlugin({
            // 对输出文件进行重命名
            filename: 'css/built.css'
        })
    ],
    mode: 'development'
}