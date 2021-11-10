let loaderUtils = require('loader-utils');
function loader(source) {
    let str = `
        let style = document.createElement('style');
        style.innerHTML = ${JSON.stringify(source)};
        document.head.appendChild(style);
    `;
    return str;
}
// 在style-loader上写了pitch， 相当于其后面的loader全部停下
// style-loader less-loader!css-loader!./index.less
loader.pitch = function (remainingRequest) { //剩余的请求
    //让style-loader去处理less-loader!css-loader!./index.less
    // require路径 返回的就是css-loader处理好的结果 require('less-loader!css-loader!./index.less')
    let str = `
        let style = document.createElement('style');
        style.innerHTML = require(${JSON.stringify(loaderUtils.stringifyRequest(this,
        '!!' + remainingRequest))});
        document.head.appendChild(style);
    `;
    return str;
}
module.exports = loader;