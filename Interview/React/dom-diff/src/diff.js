function diff(oldTree, newTree) {
    let patches = {};
    let index = 0;
    // 递归树， 比较后的结果放入patches中
    walk(oldTree, newTree, index, patches);
    return patches;
}
function diffAttr(oldAttrs, newAttrs) {
    let patch = {};
    // 判断老的属性中和新的属性的关系
    for (let key in oldAttrs) {
        if (oldAttrs[key] !== newAttrs[key]) {
            patch[key] = newAttrs[key]; //有可能是undefined 增加或者删除新的属性
        }
    }
    // 新增的属性
    for (let key in newAttrs) {
        // 老的节点没有新的节点
        if (!oldAttrs.hasOwnProperty(key)) {
            patch[key] = newAttrs[key];
        }
    }
    return patch;
}
function diffChildren(oldChildren, newChildren, index, patches) {
    // 比较老的第一个和新的一个
    oldChildren.forEach((child, idx) => {
        // 索引不应该是index
        // index每次传递给walk时，index是递增的
        // 所有的人都基于一个序号实现
        walk(child, newChildren[idx], ++Index, patches)
    });
}
function isString(node) {
    return Object.prototype.toString.call(node) === '[object String]'
}
const ATTRS = 'ATTRS';
const TEXT = 'TEXT';
const REMOVE = 'REMOVE';
const REPLACE = 'REPLACE';
let Index = 0;

// index被私有化walk
function walk(oldNode, newNode, index, patches) {
    let currentPatch = []; //每一个元素都有一个补丁对象
    // 没有新节点的时候
    if (!newNode) {
        currentPatch.push({ type: REMOVE, index })
    } else if (isString(oldNode) && isString(newNode)) {
        if (oldNode !== newNode) { //判断文本是否一致
            currentPatch.push({ type: TEXT, text: newNode })
        }
    } else if (oldNode.type === newNode.type) {
        // 比较属性是否有更改
        let attrs = diffAttr(oldNode.props, newNode.props);
        //判断对象是否有变化，有值
        if (Object.keys(attrs).length > 0) {
            currentPatch.push({ type: ATTRS, attrs })
        }
        // 如果有儿子节点， 遍历儿子节点
        diffChildren(oldNode.children, newNode.children, index, patches)
    } else {
        // 说明节点被替换
        currentPatch.push({ type: REPLACE, newNode: newNode })
    }
    // 补丁包中有补丁
    if (currentPatch.length > 0) {
        // 将元素和补丁对应起来放到打补丁包中
        patches[index] = currentPatch;
        console.log(patches);
    }
}
export default diff;
// 规则 当节点类型相同时，去看一下属性是否相同，产生一个属性当补丁包 {type: "ATTRS", attrs: {class: 'list-group'}}
// 新的DOM节点不存在 {type: 'REMOVE', index: xxx}
// 节点类型不相同，直接采用替换模式{type: 'REPLACE', newNode: newNode}
// 文本当变换 {type:"TEXT", text: 1}

// JSX被babel编译为虚拟DOM
// JQ把整个DOM重绘