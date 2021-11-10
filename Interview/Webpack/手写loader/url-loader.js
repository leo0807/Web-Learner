let loaderUtils = require('loader-utils');
let mime = require('mime'); //获得文件后缀
function loader(source) {
    let { limit } = loaderUtils.getOptions(this);
    // 转化为base64
    if (limit && limit > source.length) {
        return `module.exports = "data:${mime.getType(this.resourcePath)};
        base64, ${source.toString('base64')}"`;
    }
    //转化为file-loader处理
    else {
        return require('./file-loader').call(this, source);
    }
}
loader.raw = true;
module.exports = loader;