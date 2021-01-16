// 虚拟DOM元素
class Element {
    constructor(type, props, children) {
        this.type = type;
        this.props = props;
        this.children = children;
    }
}
// 设置属性
function serAttr(node, key, value) {
    switch (key) {
        case 'value': // node是一个input或textarea
            if (node.tagName.toUpperCase() === 'INPUT'
                || node.tagName.toUpperCase() === 'TEXTAREA') {
                node.value = value;
            } else {
                node.setAttribute(key, value);
            }
            break;
        case 'style':
            node.style.cssText = value;
            break;
        default:
            node.setAttribute(key, value);
            break;
    }
}
// 返回虚拟节点的Object
function createElement(type, props, children) {
    return new Element(type, props, children);
}
// render方法可以将vNode转化为真实dom
function render(elObj) {
    let el = document.createElement(elObj.type);
    // 遍历children，如果是虚拟DOM继续渲染，不是就代表是文本节点
    for (let key in elObj.props) {
        // 设置属性的方法
        serAttr(el, key, elObj.props[key]);
    }
    elObj.children.forEach(child => {
        // 判断是React元素 还是普通字符串
        child = (child instanceof Element) ? render(child) : document.createTextNode(child);
        // 递归
        el.appendChild(child);
    })
    return el;
}
function renderDom(el, target) {
    target.appendChild(el);
}
export { createElement, render, Element, renderDom };