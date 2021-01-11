const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    },
    devtool: 'source-map'
}

/**
 * source-map 一种提供源代码构建后代码映射机会（如果构建后代码出错了，通过映射可以追踪代码错误）
 * [inline-|hiden-|eval-] [nosources-][cheap-[module-]] source-map
 *
 * source-map： 外部
 * 错误代码提示准确信息 和源代码错误位置
 * inline-source-map 内联 只生成一个内联source-map
 * hidden-source-map 外部
 * 错误代码错误原因 但是没有错误位置
 * 不能追踪源代码错误，只能提示到构建代码信息
 *
 * eval-source-map 内部
 * 1 每一个文件都生成对应的source-map，都在eval
 * 2 错误代码提示准确信息 和源代码错误位置
 *
 *
 * 内敛和外部的区别：1 外部生成了文件， 内联没有
 *                2 内联构建素更快
 * nosources-source-map 生成外部
 * 错误代码提示准确信息 但是没有源代码错误位置
 * cheap-source-map 外部
 *错误代码提示准确信息 和源代码错误位置
    但是只能精确到行，而soucre-map能精确到列


 * cheap-source-map 外部
 *错误代码提示准确信息 和源代码错误位置

 开发环境： 速度快，调试更友好
速度块（eval > inline> cheap> ...）
    eval-cheap-source-map
    eval-source-map
调试更友好
source-map
cheap-module-source-map
cheap-source-map
--》eval-source-map
 生产环境： 源代码要不要隐藏，调试要不要更友好
 */