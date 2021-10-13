## 帧的生命周期
每个帧包括样式计算， 布局和绘制
JavaScript执行JavaScript引擎和页面渲染引擎在同一个渲染线程， GUI渲染和JavaScript执行两者是互斥的
    1 处理输入事件（优先级较高）
        - 组设
    2 JS定时器
    3 开始帧
    4 requestAnimationFrame
    5 Layout 布局
    6 绘制 Paint
    - 空闲时段 Idle period
## window.requestIdleCallback(callback, {timeout: 1000})
这是一个全局属性
作用：
    我作为用户，告诉浏览器，我现在执行callback函数，但是它的优先级比较低。
    告诉浏览器，可以在空闲的时候执行callback函数
    但是如果到了超时时间（即1000ms后），即使没有空余时间，也要执行这个callback
## Fiber之前
### 协调

- React会递归比对Virtual DOM树，找出需要变动的节点，然后**同步更新**它们，这个过程React称为 Reconcilation（协调）
- 在**协调**期间，React会一直占用着浏览器资源，
    - 一则会导致用户触发的事件得不到响应；
    - 二则会导致掉帧，用户可能会感觉到卡顿
    <!-- 一个虚拟DOM 就是一个链表的节点，相当于最小单元 -->
    递归调用，执行栈会越来越深，整个过程不能中断
## 为什么需要Fiber
<!-- 这种调度方式叫做合作式调度，需要浏览器相信用户写的代码，
但是如果用户或者说客户端写代码的时候或者执行时间超过给的剩余时间，浏览器没有办法
所以一个虚拟DOM的更新超过16ms，也会卡的
 -->
 - JavaScript 引擎和页面渲染引擎两个线程是互斥的，当其中一个线程执行时，另一个线程只能挂起等待。
  在这样的机制下，如果 JavaScript 线程长时间地占用了主线程，那么渲染层面的更新就不得不长时间地等待，界面长时间不更新，会导致页面响应度变差，用户可能会感觉到卡顿

## Fiber的核心架构
1. Scheduler 调度器 —— 调度任务的优先级，高优任务优先进入 Reconciler
2. Reconciler 协调器 —— 负责找出变化的组件
3. Renderer 渲染器 —— 负责将变化的组件渲染到页面上

### Fiber架构的核心是“可中断”，“可恢复”，“优先级”

在Fiber的架构模式下，react工作流如下
- 每个更新任务都会被赋予一个优先级。
- 当更新任务抵达调度器时，高优先级的更新任务（记为 A）会更快地被调度进 Reconciler 层；
- 此时若有新的更新任务（记为 B）抵达调度器，调度器会检查它的优先级，若发现 B 的优先级高于当前任务 A，那么当前处于 Reconciler 层的 A 任务就会被中断，调度器会将 B 任务推入 Reconciler 层。
- 当 B 任务完成渲染后，新一轮的调度开始，之前被中断的 A 任务将会被重新推入 Reconciler 层，继续它的渲染之旅，即“可恢复”。

### Reconciler 协调器
在React 15中是递归处理VDOM的，React16则是变成了可以中断的循环过程，每次循环都会调用```shouldYield```判断当前是否有剩余时间。
```
function workLoopConcurrent () {
    //Perform work until Scheduler asks us to yield;
    while(workInProgress !== null && !shouldYield()){
        // workInProgress 表示当前工作进度的树
        workInprogress = performUnitOfWork(workInProgress);
    }
}
```
- 在 React 16 中，Reconciler 与 Renderer 不再是交替工作。当 Scheduler 将任务交给 Reconciler 后，Reconciler 会为变化的虚拟 DOM 打上的标记。


### Renderer渲染器根据Reconfiler为VDOM打的标记，同步执行对应的DOM操作
- Placement 表示插入操作
- PlacementAndUpdate 表示替换操作
- Update 表示更新操作
- Deletion 表示删除操作


## Fiber
- Fiber是一个**执行单元**，每执行完一个执行单元，React会检查现在还剩多少时间，如果没有就会将控制权交出去
- 浏览器会先执行**高优先级任务**，如事件处理，Js执行，布局/绘制等
Fiber是把整个任务分成很多个小任务，每次执行一个任务，
执行完成后判断有没有剩余时间，如果有，继续执行下一个任务，如果没有则放弃执行

- React目前的做法是使用链表，每个VirtualDOM节点内部表示为一个Fiber
    - 每一个Fiber节点有三个指针，Child 大儿子，return 父亲， sibling兄弟节点
    ```
    this.return = null;
    this.child = null;
    this.sibling = null;
    ```
### Fiber 执行阶段
虚拟节点会转化为Fiber结构
- 每次渲染有两个阶段， **Reconciliation**（协调、Render阶段）和**Commit**（提交阶段）
- 协调阶段：可以认为是Diff阶段，这个阶段可以被中断，这个阶段会找出所有节点变更，
    例如节点新增，删除，属性变更等等，这些变更React称之为副作用
- 提交阶段：将上一个阶段计算出来的需要处理的副作用（Effects）一次性执行了，这个阶段必须同步执行，不能被打断
Render阶段会构建Fiber树，结果会构成一个 **Effect Lists**
遍历规则： - 下一个节点：先儿子， 后弟弟， 再叔叔
         - 自己所有节点完成后自己完成


# Fiber对于React生命周期的影响
1. render 阶段：纯净且没有副作用，可能会被 React 暂停、终止或重新启动。
2. pre-commit 阶段：可以读取 DOM。
3. commit 阶段：可以使用 DOM，运行副作用，安排更新

最主要的影响是在render这个阶段，这个影响是通过Scheduler层和改写Reconciler层来实现的。

在 render 阶段，一个庞大的任务被分解成为了一个个小的工作单元，这些工作单元有着不同的优先级，React可以根据优先级的高低去实现工作单元的打断和恢复。

而在Fiber的架构下，一些旧的生命周期被废除。其中包括了，```componentWillMount```, ```componentWillUpdate```,```componentWillReceiveProps```.

因为render阶段是允许暂停，终止和重启的，这导致了render阶段的生命周期可能会被重复执行，所以这也是要废弃这些生命周期的原因。

# Fiber更新过程
在Fiber架构下，VDOM的更新过程分为两个阶段：
- render/reconciliation 协调阶段(可中断/异步)：通过 Diff 算法找出所有节点变更，例如节点新增、删除、属性变更等等, 获得需要更新的节点信息，对应早期版本的 Diff 过程。
- commit 提交阶段(不可中断/同步)：将需要更新的节点一次过批量更新，对应早期版本的 patch 过程。

## 协调阶段
协调阶段会进行Diff计算，会生成一颗Fiber树。
取决于更新是同步的或者是异步的，Fiber的协调阶段会开始performSyncWorkOnRoot 或 performConcurrentWorkOnRoot 方法的调用
```
// performSyncWorkOnRoot会调用该方法
function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress)
  }
}

// performConcurrentWorkOnRoot会调用该方法
function workLoopConcurrent() {
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress)
  }
}

```
它们唯一的区别是是否调用 ```shouldYield```。如果当前浏览器帧没有剩余时间，```shouldYield``` 会中止循环，直到浏览器有空闲时间后再继续遍历。

```workInProgress``` 代表当前已创建的 ```workInProgress fiber```。
```performUnitOfWork``` 方法将触发对 ```beginWork``` 的调用，进而实现对新 Fiber 节点的创建。若 ```beginWork``` 所创建的 ```Fiber``` 节点不为空，则 ```performUniOfWork``` 会用这个新的 ```Fiber``` 节点来更新 ```workInProgress``` 的值，为下一次循环做准备。

通过循环调用 ```performUnitOfWork``` 来触发 ```beginWork```，新的 Fiber 节点就会被不断地创建。当 ```workInProgress``` 终于为空时，说明没有新的节点可以创建了，也就意味着已经完成对整棵 ```Fiber``` 树的构建。


### performUnitOfWork的递归过程
Fiber Reconciler 是从 Stack Reconciler 重构而来，通过遍历的方式实现可中断的递归

- "递阶段"
首先从 ```rootFiber``` 开始向下深度优先遍历。为遍历到的每个 ```Fiber``` 节点调用 ```beginWork``` 方法。
```
function beginWork(
  current: Fiber | null, // 当前组件对应的Fiber节点在上一次更新时的Fiber节点
  workInProgress: Fiber, // 当前组件对应的Fiber节点
  renderExpirationTime: ExpirationTime // 优先级相关
): Fiber | null {
  // ...省略函数体
}
```
该方法会根据传入的 ```Fiber``` 节点创建子 ```Fiber``` 节点，并将这两个 ```Fiber``` 节点连接起来。
当遍历到叶子节点（即没有子组件的组件）时就会进入"归"阶段。
- "归阶段"
在"归"阶段会调用 ```completeWork``` 处理 ```Fiber``` 节点。

```completeWork``` 将根据 ```workInProgress``` 节点的 ```tag``` 属性的不同，进入不同的 DOM 节点的创建、处理逻辑。

```completeWork``` 内部有 3 个关键动作：

1. 创建 DOM 节点（```CreateInstance```）
2. 将 DOM 节点插入到 DOM 树中（AppendAllChildren）
3. 为 DOM 节点设置属性（FinalizeInitialChildren）

当某个 Fiber 节点执行完 ```completeWork```，如果其存在兄弟 ```Fiber``` 节点（即 ```fiber.sibling !== null```），会进入其兄弟 ```Fiber``` 的"递"阶段。
如果不存在兄弟 Fiber，会进入父级 ```Fiber``` 的"归"阶段。
"递"和"归"阶段会交错执行直到"归"到 ```rootFiber```。至此，协调阶段的工作就结束了



## 提交阶段
commit 阶段的主要工作（即 Renderer 的工作流程）分为三部分：

- before mutation 阶段，这个阶段 DOM 节点还没有被渲染到界面上去，过程中会触发 getSnapshotBeforeUpdate，也会处理 useEffect 钩子相关的调度逻辑。
- mutation 阶段，这个阶段负责 DOM 节点的渲染。在渲染过程中，会遍历 effectList，根据 flags（effectTag）的不同，执行不同的 DOM 操作。
- layout 阶段，这个阶段处理 DOM 渲染完毕之后的收尾逻辑。比如调用 componentDidMount/componentDidUpdate，调用 useLayoutEffect 钩子函数的回调等。除了这些之外，它还会把 fiberRoot 的 current 指针指向 workInProgress Fiber 树。




部分来源：
作者：JackySummer
链接：https://juejin.cn/post/6926432527980691470
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
