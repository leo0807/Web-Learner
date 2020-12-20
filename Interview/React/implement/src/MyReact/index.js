function createElement(type, props, ...children) {
    return {
        type,
        // children 也放到子元素里面，这样在组件里面就能通过this.props.children拿到子元素
        props: {
            ...props,
            children: children.map(child => {
                return typeof child === 'object'? child: createTextVDom(child)
            })
        }
    }
}

function createTextVDom(text) {
    return {
        type: "TEXT",
        props: {
            nodeValue: text,
            children:[]
        }
    }
}

// render 两个参数 虚拟DOM和要放置的容器
function render(vDom, container) {
    // workInProgressRoot = {
    //     dom: container,
    //     props: {
    //         children: [vDom]
    //     },
    //     alternate: currentRoot
    // }
    // deletions = [];
    // nextUnitOfWork = workInProgressRoot;
    // 生成dom并放置在同其中
    let dom; 
    // 检查当前对象是文本还是对象
    if ( vDom.type === 'TEXT') {
        dom = document.createTextNode(vDom.props.nodeValue);
    } else {
        dom = document.createElement(vDom.type);
    }
    // 将vDom的除了children外的属性都放在dom对象上
    if (vDom.props) {
        Object.keys(vDom.props).filter(key => key != "children")
            .forEach(item => {
                // 循环将剩余的属性挂载到真实的dom
                dom[item] = vDom.props[item];
            })
    }
    // 通过递归调用实现子元素渲染
    if (vDom.props && vDom.props.children && vDom.props.children.length) {
        vDom.props.children.forEach(child => render(child, dom));
    }
    // 完成挂载
    container.appendChild(dom);
}

// fiber架构
// 将大任务拆解为多个小任务
// 浏览器自带API
// requestIdleCallback, 在空闲时候自动调用执行
// 循环执行任务，如果在deadline时间内没有执行结束
// 则在下次空闲时间执行
function workLoop(deadline) {
    // 下一个任务是存在，且任务运行的执行时间没有结束
    while (nextUnitOfWork && deadline.timeReamaning() > 1) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)//下一个任务
    }

    // 任务结束之后，统一进行渲染
    if (nextUnitOfWork && workInProgressFiber) {
        commitRoot()
    }
    // 任务还没有完成，但是时间到了，注册一个空闲时间来运行任务
    requestIdleCallback(workLoop);
}
// 运行任务的函数，参数是当前的fiber函数
function performUnitOfWork(fiber) {
    // 每一个任务是一个对象
    // 跟节点是container，是有dom属性的
    // 如果当前的fiber没有这个属性
    // 说明fiber没有根根节点
    if (!fiber.dom) {
        // DOM还没有挂载在节点上
        fiber.dom = createDom(fiber);
    }
    // 如果有父节点，将当前节点挂载到父节点
    if (fiber.return) {
        fiber.return.dom.appendChild(fiber);
    }
    // 将当前的VDom结构欢欢为fiber结构
    const elements = fiber.children;
    let prevSibling = null;
    // fiber是链式的，而vDom是树结构的
    if (elements && elements.length) {
        for (let i = 0; i < elements.length; i++){
            const element = element[i];
            const newFiber = {
                type: element.type,
                props: elements.props,
                return: fiber,
                dom: null,
            }

            if (i === 0) {
                fiber.child = newFiber;
            } else {
                // 下一个子元素的指针
                prevSibling.sibling = newFiber;
            }
            prevSibling = newFiber;
        }
    }
    // 这个函数的返回值是下一个任务，这其实是一个深度优先遍历
// 先找子元素，没有子元素了就找兄弟元素
// 兄弟元素也没有就返回父亲
// 然后再找这个父亲的兄弟元素
// 最后到跟节点结束
// 这个遍历顺序其实是从上到下，从左到右
    if (fiber.child){
        return fiber.child;
    }
    let nextFiber = fiber;
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling;
        }
        nextFiber = nextFiber.return;
    }
}




requestIdleCallback(workLoop);
// 统一修改DOM操作
function commitRoot() {
    commitRootImpl(workInProgressFiber.child);
    // 提交之后重置
    workInProgressFiber = null
}
function commitRootImpl(fiber) {
    if (!fiber) {
        return;
    }
    const parentDom = fiber.return.dom;
    if (fiber.effecTag == "REPLACEMENT" && fiber.dom) {
        parentDom.appendChild(fiber.com);
    } else if (fiber.effecTag === "DELETION") {
        parentDom.removeChild(fiber.dom);
    } else if (fiber.effecTag === "UPDATE") {
        updateDom(fiber.dom, fiber.alternate.props, fiber.props);
    }
    // 递归操作子元素和兄弟元素
    commitRootImpl(fiber.child);
    commitRootImpl(fiber.sibling);
}

// reconcile 调和
// 新老节点，类型一样，复用老节点， 更新props即可
// 如果类型不一样，而且新的节点存在，则创建新节点替换老节点
// 如果类型不一样，而且没有新节点，则删除老节点
function updateDom(dom, prevProps, nextProps) {
    Object.keys(prevProps)
        .filter(name => name !== 'children')
        // 老的存在，新的不存在或为空
        .filter(name => (name in nextProps))
        .forEach(name => {
            if (name.indexOf('on') === 0) {
                dom.removeEventListener(name.substr(2).toLowerCase(), prevProps[name], false)
            } else {
                dom[name] = '';
            }
        })
    Object.keys(nextProps)
        .filter(name => name !== 'children')
        .forEach(name => {
            if (name.indexOf('on') === 0) {
                dom.removeEventListener(name.substr(2).toLowerCase(), nextProps[name], false)
            } else {
                dom[name] = nextProps[name];
            }
        })
}