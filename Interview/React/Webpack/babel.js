// 通过preset转换代码
let babel = require('@babel/core');
let loaderUtils = require('loader-utils');
function loader(source) {
    console.log(Object.keys(this));
    let options = loaderUtils.getOptions(this)//获取loader中options的配置
    let cb = this.async();//等待回掉函数
    // 转化的选项
    babel.transform(source, {
        ...options,
        sourceMaps: true,
        filename: this.resourcePath.split('/').pop() //文件名
    }, function (err, res) {
        cb(err, res.code, res.map); //异步
    })
    return source;
}
module.exports = loader;