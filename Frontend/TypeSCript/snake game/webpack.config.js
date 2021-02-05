const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 每次执行命令 先清除dist下文件
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        // 禁止webpack使用箭头函数
        enviroment: {
            arrowFunction: false,
            const: false
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        // 配置loader
                        loader: 'babel-loader',
                        options: {
                            preset: [
                                [
                                    // 指定环境插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 指定兼容浏览器版本
                                        targets: {
                                            "chrome": "88"
                                        },
                                        // 指定corejs版本
                                        "corejs": 3,
                                        // 使用corejs的方式 这里是按需加载
                                        "useBuiltOms": "usage"
                                    }
                                ]
                            ]
                        },
                        "ts-loader"
                    }
                ],
                exclude: /node_modules/,
            },
            {
                //  less
                test: /\.less$/,
                use: [
                    "sstyle-loader",
                    "css-loader",
                    // 引入postcss
                    {
                        loader: 'postcss-loader',
                        options: {
                            postOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            },
            {

            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin()
    ],
    // 用来设置引用模块
    resolve: {
        extensions: ['ts', 'js']
    }
}