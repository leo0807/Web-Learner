function getElements(n) {
    let num = 0;
    if (n.nodeType === 1) {
        num++;
        console.log(n.nodeName);
    }
    let son = n.childNodes;
    for (let i = 0; i < son.length; i++) {
        num += arguments.callee(son[i]);
    }
    return num;
}
window.onload = function () {
    console.log('文档总计元素个数: ' + getElements(document));
}