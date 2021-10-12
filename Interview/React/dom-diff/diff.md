1. Virtual DOM 中的首个节点不执行移动操作（除非它要被移除），以该节点为原点，其它节点都去寻找自己的新位置; 一句话就是首位是老大,不移动; 
2. 在 Virtual DOM 的顺序中，每一个节点与前一个节点的先后顺序与在 Real DOM 中的顺序进行比较，如果顺序相同，则不必移动，否则就移动到前一个节点的前面或后面;
3. tree diff:
基于策略一，对树进行分层比较，两棵树只会对同一层次的节点进行比较。只会同级比较,如果是跨级的移动,会先删除节点 A,再创建对应的 A;将 O(n3) 复杂度的问题转换成 O(n) 复杂度;
4. component diff:
- 如果是同一类型的组件，按照原策略继续比较 virtual DOM tree。
- 如果不是，则将该组件判断为 dirty component，从而替换整个组件下的所有子节点。
- 对于同一类型的组件，有可能其 Virtual DOM 没有任何变化，如果能够确切的知道这点那可以节省大量的 diff 运算时间，因此 React 允许用户通过 shouldComponentUpdate() 来判断该组件是否需要进行 diff。

5. element differ:
tree differ 下面有三种节点操作:INSERT_MARKUP（插入）、MOVE_EXISTING（移动）和 REMOVE_NODE（删除

作者：火狼 1
链接：https://juejin.cn/post/6847009771355127822
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
