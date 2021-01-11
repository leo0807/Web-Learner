const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    // 高收益webpack哪些库不参与打包，同时使用的名称也需要改变
    new webpack.DllReferencePlugin({
      // 不同打包 直接 找manifest文件
      manifest: resolve(__dirname, 'dll/manifest.json')
    })
    // 将某个文件打包输出出去，并在html中自动引入该资源
    ,
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, 'dll/jquery.js')
    })
  ],
  mode: 'production',
  externals: {
    // 有些包需要CDN引入，如Jquery， 不会被打包
    // 拒绝jQuery被打包进来
    jquery: 'jQuery'
  }
};
/**
 * 与external不同
 * external也是需要外部资源打包，但是直接通过CDN方式引进来， 避免打包
 * dll则单独一次性将某些第三方的包一次打包引进来，之后就不再需要重新打包
 */