function loader(source) {
    let reg = /url\((.+?)\)/g;
    let pos = 0;
    let current;
    let arr = ['let list = []'];
    while (current = reg.exec(source)) { //[matchUrl, g]
        let [matchUrl, g] = current;
        let last = reg.lastIndex - matchUrl.length;
        arr.push(`list.push(${JSON.stringify(source.slice(pos, last))})`);
        pos = reg.lastIndex;
        // 把g替换成require的写法 => url(require('xxx'))
        arr.push(`list.push('url('+require(${g})+')')`);
    }
    arr.push(`module.exports = list.join()`);
    return arr.join('\r\n'); //返回css
}
module.exports = loader; 