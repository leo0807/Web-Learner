/**
 * 从根节点开始渲染和调度
 * 两个阶段
 * diff = render
 * diff阶段对比新旧的虚拟DOM，进行增量，更新或创建，render阶段
 * 这个阶段比较花时间，需要对任务进行拆分，拆分的唯独是虚拟DOM，此阶段可以暂停
 * render阶段成果是effect list知道那些节点更新，哪些节点删除了，哪些节点增加了
 * render阶段有两个任务，1根据DOM生成fiber树，2收集effectlist
 * commit阶段，进行DOM更新创建阶段，此阶段不能暂停，需要一气呵成
 */
import { setProps } from './utils';
const { TAG_ROOT, ELEMENT_TEXT, TAG_TEXT, TAG_HOST, PLACEMENT, UPDATE, DELETION } = require("./constants");

//  根子节点虚拟DOMelement，将其插入stateNode中真实DOM
let nextUnitOfWork = null; //下一个工作单元
let workInProgressRoot = null; //RootFiber应用的根
export function scheduleRoot(rootFiber) {//{tag:TAG_ROOT, stateNode: container, props:{children:[element]}}
    nextUnitOfWork = rootFiber;
    workInProgressRoot = rootFiber;
}
function performUnitOfWork(currentFiber) {
    beginWork(currentFiber); //开始
    if (currentFiber.child) {
        return currentFiber.child;
    }
    // 没有儿子 找弟弟
    while (currentFiber) {
        completeUnitWork(currentFiber); // 没有儿子 让自己完成
        if (currentFiber.sibling) {     // 寻找是否有弟弟
            return currentFiber.sibling;// 有弟弟返回弟弟
        }
        currentFiber = currentFiber.return;//找父亲然后让父亲完成

    }
    // 没有儿子，弟弟，找叔叔
}
// 在完成时候要收集有副作用的fiber，组成effect list
// 每个fiber有两个属性，firstEffect指向第一个有副作用的子fiber，
// lastEffect指向最后一个有副作用的fiber
// 中间用一个nextEffect做成一个单链表 firstEffect
function completeUnitWork(currentFiber) {
    let returnFiber = currentFiber.return;
    if (returnFiber) {
        // 把自己儿子挂载到父亲fiber上
        if (!returnFiber) {
            returnFiber.firstEffect = currentFiber.firstEffect;
        }
        if (currentFiber.lastEffect) {
            if (returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = currentFiber.firstEffect;
            }
            returnFiber.lastEffect = currentFiber.lastEffect;
        }
        // 把自己挂载父亲上
        const effectTag = currentFiber.effectTag;
        if (effectTag) {
            if (returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = currentFiber;
            } else {
                returnFiber.firstEffect = currentFiber;
            }
            returnFiber.lastEffect = currentFiber;
        }
    }
}
/**
 * beginWork 开始收下线的钱
 * completeUnionOfWork把下线的钱收完了
 * 1. 创建真实DOM元素
 * 2. 创建子fiber
 */
function beginWork(currentFiber) {
    // 
    if (currentFiber.tag === TAG_ROOT) {
        UpdateHostRoot(currentFiber);
    } else if (currentFiber.tag === TAG_TEXT) {
        updateHostText(currentFiber);
    } else if (currentFiber.tag === TAG_HOST) {
        updateHost(currentFiber);
    }
}
function updateHost(currentFiber) {
    // 如果此fiber没有创建DOM节点
    if (!currentFiber.stateNode) {
        currentFiber.stateNode = createDOM(currentFiber)
    }
    const newChildren = currentFiber.props.children;
    reconcileChildren(currentFiber, newChildren);
}
function createDOM(currentFiber) {
    if (currentFiber.tag === TAG_TEXT) {
        return document.createTextNode(currentFiber.porps.text);
    } else if (currentFiber.tag === TAG_HOST) { //span div
        let stateNode = document.createElement(currentFiber.type);
        // 处理DOM属性
        updateDOM(stateNode, {}, currentFiber);
        return stateNode;
    }
}
function updateDOM(stateNode, oldProps, newProps) {
    setProps(stateNode, oldProps, newProps);
}
function updateHostText(currentFiber) {
    // 如果此fiber没有创建DOM节点
    if (!currentFiber.stateNode) {
        currentFiber.stateNode = createDOM(currentFiber)
    }
}

function UpdateHostRoot(currentFiber) {
    // 先处理自己，如果是一个原生节点，创建真实DOM 2/创建子fiber
    let newChildren = currentFiber.props.children; //[element]
    reconcileChildren(currentFiber, newChildren);
}
//newCHildren 是一个虚拟DOM元素数组，为每个虚拟DOM创建子Fiberz
function reconcileChildren(currentFiber, newChildren) {
    let newChildIndex = 0; //新的子节点的索引
    let preSibling; //上一个新的子fiber
    // 遍历子虚拟DOM节点， 为每个虚拟DOM元素创建子fiber
    while (newChildIndex < newChildren.length) {
        let tag;
        let newChild = newChildren[newChildIndex]; //取出虚拟DOM节点
        if (newChild.type === ELEMENT_TEXT) {
            tag = TAG_TEXT;
        } else if (typeof newChild.type === 'string') {
            tag = TAG_HOST;
        } // beginWork 创建fiber
        // 在completeUnitOfWork手机effect
        let newFiber = {
            tag, //TAG_HOST
            type: newChild.type, //div
            props: newChild.props,
            stateNode: null, //div还没有创建DOM元素
            return: currentFiber, //父Fiber return Fiber
            effectTag: PLACEMENT, //副作用标识
            nextEffect: null, //effectlist也是一个单链表
            // effect list顺序和完成循序是一样的，但是节点只放哪些出钱的人
        }
        //最小的儿子是没有弟弟的
        if (newFiber) {
            if (newChildIndex === 0) {
                currentFiber.child = newFiber;//如果当前索引为0， 说明这是太子
            } else {
                preSibling.sbiling = newFiber; //让太子的sibling弟弟指向二皇子
            }
            preSibling = newFiber;
        }
        newChildIndex++;
    }
}
// workflow
// 循环执行工作 nextUnitOfWork
function workLoop() {
    let shouldYield = false;//是否要让出时间片
    while (nextUnitOfWork && !shouldYield) {
        //返回下一个UnitOfWork
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork); //执行完一个任务后
        // shouldYield = deadline.timeRemaining() < 1; //没有时间的话就要让出控制权
    }
    if (!nextUnitOfWork && workInProgressRoot) { //如果时间片到期后还有任务没有完成，就需要再次请求浏览器再次调用
        console.log("render阶段结束");
        commitRoot();
    }
    requestIdleCallback(workLoop, { timeout: 500 });
}
function commitRoot() {
    let currentFiber = workInProgressRoot.firstEffect;
    while (currentFiber) {
        commitWork(currentFiber);
        currentFiber = currentFiber.nextEffect;
    }
    workInProgressRoot = null;
}
function commitWork(currentFiber) {
    if (!currentFiber) return;
    let returnFiber = currentFiber.return;
    let returnDOM = returnFiber.stateNode;
    if (currentFiber.effectTag === PLACEMENT) {
        returnDOM.appendChild(currentFiber.stateNode);
    }
    currentFiber.effectTag = null;
}
// 有优先级的概念，expirationTime
requestIdleCallback(workLoop, { timeout: 500 });

