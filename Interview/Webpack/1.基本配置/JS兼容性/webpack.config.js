const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// 设置nodejs环境变量
process.env.NODE_ENV = 'development';

// optimize-css-assets-webpack-plugin
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
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                ident: 'postcss',
                                plugins: () => [
                                    // postcss的插件
                                    require('postcss-preset-env')()
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    // 自动修复
                    fix: true
                }
            },
            {
                // 1. JS babel-loader @babel/preset-env @babel/core
                // 问题： 但是只能转换基本语法，如promise则无法转换
                // 2。 全部兼容性处理 @babel/polyfill
                // 问题 我只需要解决部分兼容性问题，但是将所有兼容性代码全部引入，代码体积太大了
                // 3。 需要做兼容性处理就做：按需加载 -corejs
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    // 预设：指示babel做怎么样子的兼容性处理
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                // 按需加载
                                useBuiltIns: 'usage',
                                // 指定corejs版本
                                corejs: 3,
                                // 指定兼容性做到哪个版本浏览器
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17'
                                }
                            }
                        ]
                    ]
                }
            }
        ]
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: './src/index.html'
        //      Html压缩
        //      minify:{
        //          移除空格
        //          collapseWhitespace: true.,
        //          移除注释
        //          removeComments: true
        //      }
        // }),
        new MiniCssExtractPlugin({
            // 对输出文件进行重命名
            filename: 'css/built.css'
        }),
        new OptimizeCssAssetsWebpackPlugin(),

    ],
    mode: 'development'
    // 生成环境 自动压缩JS
    // mode: 'production'
}