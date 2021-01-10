const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 问题：当梗一个模块时候，其他模块也被更行，
// 举例：更更新一个css样式的时候，其他JS文件也被重新执行了
// 解决办法HMR hot module replacement 热模块替换
// 作用： 一个模块发生变化，只会重新打包这一个模块
// 样式文件 可以使用HMR功能， style-loader内部实现
// JS文件 默认没有使用HMR文件
// HTML文件 默认不能使用HMR功能， 同时会导致问题，html文件不能热更新，
// 解决： 修改entry入口，将html文件引入
module.exports = {
    entry: ['./src/js/index.js', './src/index.html'],
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            // loader的配置
            {
                //less
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                // 处理css资源
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                // 处理图片资源
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
                    //  关闭es6模块化
                    esModule: false,
                    outputPath: 'imgs'
                }
            },
            {
                // 处理html中的img资源
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                // 处理其他资源
                exclude: /.\(html|js|css|less|jpg|png|gif)/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: 'media'
                }
            }
        ]
    },
    plugins: [
        // plugins的配置
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
    ],
    mode: 'development',
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
        open: true,
        // 开启HMR
        // 当更新配置时候需要重启服务
        hot: true
    }
}