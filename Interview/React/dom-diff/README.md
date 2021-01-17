# createElement : {type, props, children}

1. 创建VirtualDom
2. 将VirtualDom元素转化为真实Dom元素 （）

# 传统diff算法
1. 比较两个树的差异需要O(n^2)
2. 比较最小差异 O(n^3) 类似于Edit Distance

# React的diff算法
1. Tree Diff    
- **React**通过**updateDepth**对**Virtual DOM**树进行层级控制， 只会对相同层级的DOM节点进行比较，即同一个父节点的所有自节点。当一个
- 对于DOM跨层级的节点进行操作时候，举例，旧树的A节点的左子树被移动到其右子树的下一层节点的时候，不会做移动操作，而是直接销毁消失的节点，在移动的位置上创建新的节点
- 在开发组件时，保持稳定的 DOM 结构会有助于性能的提升。例如，可以通过 CSS 隐藏或显示节点，而不是真的移除或添加 DOM 节点

2. Component Diff
- 如果是同一类型的组件，按照原策略继续比较 virtual DOM tree。
- 如果不是，则将该组件判断为**dirty component**，从而**替换**整个组件下的所有子节点。
- 对于同一类型的组件，有可能其 Virtual DOM 没有任何变化，如果能够确切的知道这点那可以节省大量的 diff 运算时间，因此 React 允许用户通过 **shouldComponentUpdate()** 来判断该组件是否需要进行 diff。

3. Element Diff
当节点处于同一层级时，React diff 提供了三种节点操作，分别为：INSERT_MARKUP（插入）、MOVE_EXISTING（移动）和 REMOVE_NODE（删除）。

- INSERT_MARKUP，新的 component 类型不在老集合里， 即是全新的节点，需要对新节点执行插入操作。
- MOVE_EXISTING，在老集合有新 component 类型，且 element 是可更新的类型，generateComponentChildren 已调用 receiveComponent，这种情况下 prevChild=nextChild，就需要做移动操作，可以复用以前的 DOM 节点。
- REMOVE_NODE，老 component 类型，在新集合里也有，但对应的 element 不同则不能直接复用和更新，需要执行删除操作，或者老 component 不在新集合里的，也需要执行删除操作。


## 总结
- React 通过分层求异的策略，对 tree diff 进行算法优化；
- React 通过相同类生成相似树形结构，不同类生成不同树形结构的策略，对 component diff 进行算法优化；
- React 通过设置唯一 key 的策略，对 element diff 进行算法优化；
- 建议，在开发组件时，保持稳定的 DOM 结构会有助于性能的提升；
- 建议，在开发过程中，尽量减少类似将最后一个节点移动到列表首部的操作，当节点数量过大或更新操作过于频繁时，在一定程度上会影响 React 的渲染性能。
