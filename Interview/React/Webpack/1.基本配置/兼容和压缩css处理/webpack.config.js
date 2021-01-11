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
                    // 创建style标签，将样式放入
                    // 'style-loader',
                    // 将css文件整合到js中
                    // 作用：这个loader取代style-loader，提取JS中到css成单独文件
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    /**
                     * 开发环境-设置node环境变量： process
                     * 帮postcss找到package.json里面的配置，
                     * 通过配置加载指定的css兼容性样式
                     * 
                     *   "browserslist":{
                     * 开发环境变量-- 设置node环境变量:process.env.NODE_ENV = 'development'
                        "development": [
                        "last 1 chrome version",
                        "last 1 firefox version",
                        "last 1 safari version"
                        ],
                        运行browserslist兼容性时候，默认按照生产环境执行，
                        mode：“development”也无法改变
                        如果想要执行development环境
                        需要指定nodeJS的环境变量进行强制改变
                        "production": [
                        ">0.2%",
                        "not dead",
                        "not op_mini all"
                        ]
                    }
                     */
                    // 修改loader的配置
                    {
                        loader: 'postcss-loader',
                        // 优先执行此个loader
                        enforce: "pre",
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
        // 压缩CSS
        new OptimizeCssAssetsWebpackPlugin()
    ],
    mode: 'development'
}