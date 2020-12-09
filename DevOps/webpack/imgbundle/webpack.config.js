const path = require('path');
// 安装html-webpack-plugin, 
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
            },
            // 匹配图片文件
            {
                test: /\.(jpg|png|gif|jpeg)$/,
                loader: 'url-loader',
                // 图片小于8k，base64处理(解析成url-base)，减少请求数量，会使得体积更大
                options: {
                    limit: 8 * 1024,
                    esModule: false, //防止url-loader的es6模块化解析
                    // [hash:10] 取图片的hash前10位
                    // [ext]' 取图片的拓展名
                    name:'[hash:10].[ext]'
                }
            },
            // 对html的loader处理
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    // plugin配置
    plugins: [
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ]
}