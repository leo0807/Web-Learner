# setState的第二个参数
setState的的第二个参数是回调函数，setState是异步的;
加入回调的作用是保证state被更新以后再调用回调函数，这样就能保证回调里获取到的state是更新后的。setstate的执行仍然是异步的


在React中，如果是由React引发的**事件处理**（比如通过onClick引发的事件处理），调用setState不会**同步更新**this.state，除此之外的setState调用会同步执行this.state 。所谓“除此之外”，指的是绕过React通过addEventListener直接添加的事件处理函数，还有通过setTimeout/setInterval产生的异步调用。

原因： 在React的setState函数实现中，会根据一个变量**isBatchingUpdates**判断是直接更新this.state还是放到队列中回头再说，而isBatchingUpdates默认是**false**，也就表示setState会同步更新this.state，但是，有一个函数**batchedUpdates**，这个函数会把isBatchingUpdates修改为true，而当React在调用事件处理函数之前就会调用这个batchedUpdates，造成的后果，就是由React控制的事件处理过程setState不会同步更新this.state。

注意： setState的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是**合成事件**和**钩子函数**的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。

在legacy模式下命中batchedUpdates时异步，没有命中（setTimeout）时候同步
在concurrent模式下都是异步  

* 合成事件都会进入合成时间queue中
# setState 原理
https://www.jianshu.com/p/e09cbecca1d1
# 生命周期
https://www.jianshu.com/p/514fe21b9914

调用setState时候，会计算出状态变化，这个阶段是render阶段
之后将EFFECT或者说状态变化渲染在视图的阶段则是commit阶段，两个阶段通过Effect传递。
Effect有四个属性分别是插入DOM（PLACEMENT），更新DOM（UPDATE），删除（DELETION）和更新REF（REF）；
对于包含useEffect回掉函数的Fiber，它还有PASSIVE属性

useEffect没有第二个参数的时候会在MOUNT和UPDATE时候创建PASSIVE；
当第二个参数为空数组时候，则是在MOUNT创建PASSIVE；
当第二个参数有值的时候，则是在MOUNT创建PASSIVE

commit包含三个阶段：
- beforeMutation阶段
- Mutation阶段
- layout阶段

useEffect在commit阶段完成后异步调用
componentDidMount在commit阶段完成视图更新（mutation阶段）后在layout阶段同步完成
useEffectLayout在layout阶段同步完成


# React 的 setState 本身并不是异步的，是因为其批处理机制给人一种异步的假象。
**React 的更新机制**

1. 生命周期函数和合成事件中：
无论调用多少次 setState，都不会立即执行更新。而是将要更新的 state 存入'\_pendingStateQuene',将要更新的组件存入'dirtyComponent';
当根组件 didMount 后，批处理机制更新为 false。此时再取出'\_pendingStateQuene'和'dirtyComponent'中的 state 和组件进行合并更新；
原生事件和异步代码中：

2. 原生事件不会触发 react 的批处理机制，因而调用 setState 会直接更新；
异步代码中调用 setState，由于 js 的异步处理机制，异步代码会暂存，等待同步代码执行完毕再执行，此时 react 的批处理机制已经结束，因而直接更新。
总结：
react 会表现出同步和异步的现象，但本质上是同步的，是其批处理机制造成了一种异步的假象。（其实完全可以在开发过程中，在合成事件和生命周期函数里，完全可以将其视为异步）
