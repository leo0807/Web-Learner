1. Patch

```
function patch (oldVnode, vnode) {
    // Some Codes
    if (sameVnode(oldVnode, vnode)) {
        patchVnode(oldVnode, vnode);
    } else {
        const oEl = oldVnode.el; //当前Vnode对应的真实元素节点
        const parentEle = api.parentNode(oEl); //父元素
        createEle(vnode); // 根据Vnode生成新元素
        if (parentEle !== null) {
            api.insertBefore(parentEle, vnode.el, api.nextSibling(oEl)); // 将新元素添加进父元素
            api.removeChild(parentEle, oldVnode.el) // 移除以前的旧元素节点
            oldVnode = null;
        }
    }
    // Some code
    return vnode;
}
```
2. isSame
- ```patch```函数接收两个参数```oldVnode```和```Vnode```分别代表新的节点和之前的旧节点；
- 判断两个节点是否值得比较，值得比较则执行```patchVnode```;

```
function sameVnode (a, b) {
    return (
        a.key === b.key && // key值
        a.tag === b.tag && // 标签名
        a.isComment === b.isComment && 是否为注释节点
        // 是否都定义了data, data包含了一些具体信息，例如onclick，style
        isDef(a.data) === isDef(b.data) && 
        sameInputType(a, b) // 当标签是 <input>的时候，type必须相同
    );
}
```
- 不值得比较则用```Vnode```替换```oldVnode```;
- 如果两个节点都是一样的，那么就深入检查他们的子节点。如果两个节点不一样那说明```Vnode```完全被改变了，则直接替换```oldVnode```，所以Vue的Diff算法是深度优先遍历；
3. patchVnode
```
patchVnode (oldVnode, vnode) {
    const el = vnode.el = oldVnode.el
    let i, oldCh = oldVnode.children, ch = vnode.children
    if (oldVnode === vnode) return
    if (oldVnode.text !== null && vnode.text !== null && oldVnode.text !== vnode.text) {
        api.setTextContent(el, vnode.text)
    }else {
        updateEle(el, vnode, oldVnode)
        if (oldCh && ch && oldCh !== ch) {
            updateChildren(el, oldCh, ch)
        }else if (ch){
            createEle(vnode) //create el's children dom
        }else if (oldCh){
            api.removeChildren(el)
        }
    }
}
```
- 找到对应的真实 dom，称为 el
- 判断 Vnode 和 oldVnode 是否指向同一个对象，如果是，那么直接 return
- 如果他们都有文本节点并且不相等，那么将 el 的文本节点设置为 Vnode 的文本节点。
- 如果 oldVnode 有子节点而 Vnode 没有，则删除 el 的子节点
- 如果 oldVnode 没有子节点而 Vnode 有，则将 Vnode 的子节点真实化之后添加到 el
- 如果两者都有子节点，则执行 updateChildren 函数比较子节点，这一步很重要

4. UpdateChildren
```
updateChildren (parentElm, oldCh, newCh) {
    let oldStartIdx = 0, newStartIdx = 0
    let oldEndIdx = oldCh.length - 1
    let oldStartVnode = oldCh[0]
    let oldEndVnode = oldCh[oldEndIdx]
    let newEndIdx = newCh.length - 1
    let newStartVnode = newCh[0]
    let newEndVnode = newCh[newEndIdx]
    let oldKeyToIdx
    let idxInOld
    let elmToMove
    let before
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (oldStartVnode == null) {   // 对于vnode.key的比较，会把oldVnode = null
            oldStartVnode = oldCh[++oldStartIdx] 
        }else if (oldEndVnode == null) {
            oldEndVnode = oldCh[--oldEndIdx]
        }else if (newStartVnode == null) {
            newStartVnode = newCh[++newStartIdx]
        }else if (newEndVnode == null) {
            newEndVnode = newCh[--newEndIdx]
        }else if (sameVnode(oldStartVnode, newStartVnode)) {
            patchVnode(oldStartVnode, newStartVnode)
            oldStartVnode = oldCh[++oldStartIdx]
            newStartVnode = newCh[++newStartIdx]
        }else if (sameVnode(oldEndVnode, newEndVnode)) {
            patchVnode(oldEndVnode, newEndVnode)
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]
        }else if (sameVnode(oldStartVnode, newEndVnode)) {
            patchVnode(oldStartVnode, newEndVnode)
            api.insertBefore(parentElm, oldStartVnode.el, api.nextSibling(oldEndVnode.el))
            oldStartVnode = oldCh[++oldStartIdx]
            newEndVnode = newCh[--newEndIdx]
        }else if (sameVnode(oldEndVnode, newStartVnode)) {
            patchVnode(oldEndVnode, newStartVnode)
            api.insertBefore(parentElm, oldEndVnode.el, oldStartVnode.el)
            oldEndVnode = oldCh[--oldEndIdx]
            newStartVnode = newCh[++newStartIdx]
        }else {
           // 使用key时的比较
            if (oldKeyToIdx === undefined) {
                oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx) // 有key生成index表
            }
            idxInOld = oldKeyToIdx[newStartVnode.key]
            if (!idxInOld) {
                api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el)
                newStartVnode = newCh[++newStartIdx]
            }
            else {
                elmToMove = oldCh[idxInOld]
                if (elmToMove.sel !== newStartVnode.sel) {
                    api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el)
                }else {
                    patchVnode(elmToMove, newStartVnode)
                    oldCh[idxInOld] = null
                    api.insertBefore(parentElm, elmToMove.el, oldStartVnode.el)
                }
                newStartVnode = newCh[++newStartIdx]
            }
        }
    }
    if (oldStartIdx > oldEndIdx) {
        before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].el
        addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx)
    }else if (newStartIdx > newEndIdx) {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
    }
}
```
- 将 Vnode 的子节点 Vch 和 oldVnode 的子节点 oldCh 提取出来
- oldCh 和 vCh 各有两个头尾的变量 StartIdx 和 EndIdx，它们的 2 个变量相互比较，一共有 4 种比较方式。如果 4 种比较都没匹配，如果设置了 key，就会用 key 进行比较，在比较的过程中，变量会往中间靠，一旦 StartIdx>EndIdx 表明 oldCh 和 vCh 至少有一个已经遍历完了，就会结束比较。

首先，我们拿到新旧节点的数组，然后初始化四个指针，分别指向新旧节点的开始位置和结束位置，进行两两对比，若是 新的开始节点和旧开始节点相同，则都向后面移动，若是结尾节点相匹配，则都前移指针。若是新开始节点和旧结尾节点匹配上了，则会将旧的结束节点移动到旧的开始节点前。若是旧开始节点和新的结束节点相匹配，则会将旧开始节点移动到旧结束节点的后面。若是上述节点都没配有匹配上，则会进行一个兜底逻辑的判断，判断开始节点是否在旧节点中，若是存在则复用，若是不存在则创建。最终跳出循环，进行裁剪或者新增，若是旧的开始节点小于旧的结束节点，则会删除之间的节点，反之则是新增新的开始节点到新的结束节点。

作者：张围也
链接：https://juejin.cn/post/7013193754349666335
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

4种情况的具体图例，
https://juejin.cn/post/7013193754349666335#heading-2
https://www.cnblogs.com/wind-lanyan/p/9061684.html
