// resolve 来拼接绝对路径
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    //webpack配置
    //入口起点
    entry: './src/index.js',
    //输出
    output: {
        //输出文件名
        filename: 'built.js',
        //输出路径
        //__dirname nodejs变量，代表当前文件的绝对路径
        path: resolve(__dirname, 'build')
    },
    //loader的配置
    module: {
        rules: [
            // 详细loader配置
            {
                // 匹配哪些文件
                test: /\.css$/,
                // use 使用哪些loader对这些文件进行处理
                use: [
                    // use数组中loader执行顺序，从右到左
                    // 创建style标签，将JS中的样式资源插入进行，添加到head中生效
                    'style-loader',
                    //将css文件变成commonJS模块加载到JS中，里面内容是样式字符串
                    'css-loader'
                ]
            },
            //less loader
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 将less文件编译成css文件 
                    // 此时需要下载less-loader和less
                    'less-loader',
                ]
            }
        ]
    },
    // plugins的配置
    // plugin 1.下载 2.引用 3.使用
    plugins: [
        // html-webpack-plugin
        // 作用；默认创建一个空的HTML文件，自动引入打包输出的所有资源（JS/CSS）
        new HtmlWebpackPlugin({
            //创建一个HTML文件
            template: './src/index.html'
        })
    ],
    // 模式
    mode: 'development',
    // mode: 'prodcution',
}