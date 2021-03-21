class vDom {
    constructor(type, props, children) {
        this.type = type;
        this.props = props;
        this.children = children;
    }
}

// 创建一个节点
function createElement(type, props, children) {
    return new vDom(type, props, children);
}

// 给节点设置properties的方法
function setAttrs(node, prop, value) {
    switch (prop) {
        case 'value':
            if (node.type === 'INPUT' || node.type === 'TEXTAREA') {
                node.value = value;
            } else {
                node.setAttribute(prop, value);
            }
            break;
        case 'style':
            node.style.cssText = value;
            break;
        default:
            node.setAttribute(prop, value);
            break;
    }
}

// 虚拟DOM转换为真实DOM
function renderVDOM(vDom) {
    const { type, props, children } = vDom;
    const el = document.createElement(type);
    for (let key in props) {
        setAttrs(el, key, props[key]);
    }
    children.map(c => {
        if (c instanceof vDom) {
            c = renderVDOM(c);
        } else {
            c = document.createTextNode(c);
        }
        el.appendChild(c)
    });

    return el;
}

// 将一个节点添加到ROOT节点上
function renderDom(rDom, rootEl) {
    rootEl.appendChild(rDom);
}