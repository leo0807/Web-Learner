/**
 * 根据图片生成一个md5并发射到dist目录下
 * file-loader还会返回当前的图片路径
 */


// 
// import p from './cloud.png';
// let img = document.createElement('img');
// img.src = p;
// document.body.appendChild(img);

let loaderUtils = require('loader-utils');
function loader(source) {
    // file-loader 需要返回一个路径

    // 得到source的文件路径
    let filename = loaderUtils.interpolateName(this, '[hash].[ext]', { content: source });
    this.emitFile(filename, source); //发射文件
    return `module.exports = "${filename}"`;
}
loader.raw = true; //二进制
module.exports = loader;