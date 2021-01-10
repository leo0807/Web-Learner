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
            /**
             * 语法检查 eslint eslint-loader 
             * 只检查用户写的源代码, 忽略第三方代码，如node modules
             * 在package。json中设置 eslint 规则
             * 如Airbnb风格 eslint-config-airbnb-base eslint-plugin-import eslint
             * 
             *  "eslintConfig":{
                    "extends": "airbnb-base"
                }
             */
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    // 自动修复
                    fix: true
                }
            }
        ]
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: './src/index.html'
        // }),
        new MiniCssExtractPlugin({
            // 对输出文件进行重命名
            filename: 'css/built.css'
        }),
        new OptimizeCssAssetsWebpackPlugin(),

    ],
    mode: 'development'
}