# React 和 Vue 
## 相同点
1. 都使用了Virtual DOM；
2. 都提供了相应是和组件化的视图组件；
3. 都将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关库；

## Diff算法相同点
1. 虚拟 DOM 在比较时只比较同一层级节点，复杂度都为 O(n)，降低了算法复杂度；
2. 都使用 key 比较是否是相同节点，都是为了尽可能的复用节点
3. 都是操作虚拟 DOM，最小化操作真实 DOM，提高性能（其实虚拟 DOM 的优势 并不是在于它操作 DOM 快）
4. 都是不要用 index 作为 key

- (作者：hannie76327)[https://juejin.cn/post/6878892606307172365]
## Diff 不同点
1. 维护变量不同
- Vue 维护4个变量：
    - oldStartIdx => 旧头索引
    - oldEndIdx => 旧尾索引
    - newStartIdx => 新头索引
    - newEndIdx => 新尾索引
    - 两边方向同时比较，由新的位置来获取真实 DOM；如果老的先走完，就添加；如果新的先走完，就删除

- react 维护三个变量：
    - nextIndex => 遍历nextChildren的时候的index，每遍历一个元素加1（遍历新节点）
    - lastPlacedIndex => 上一次从prevChildren中取出来元素时，这个元素在prevChildren中的index（新节点对应）
    - oldIndex => 元素在数组中的位置（旧节点对应的位置）
    节点移动前提是：oldIndex < lastPlacedIndex
2. Diff算法对比方式不同
- Vue的列表对比，采用两端到中间的比对方是，而React则采用从左到右一次对比的方式。当一个集合，只是把最后一个节点移动到了第一个，react会把前面的节点一次移动，而Vue只会把最后一个节点移动到第一个。
- Vue对比节点元素类型，当节点类型相同，但是className不同，认为是不同类型元素，删除重建，而React会认为是同类型节点，只是修改节点属性
3. Diff算法遍历原理
- React是除首位删除外是固定不动的，然后依次遍历对比；
- Vue的Compile阶段的Optimize标记了static点，可以减少differ次数，并且采用的双向遍历法；
4. diff 算法跟新 DOM 逻辑
- Vue 基于 snabbdom 库，它有较好的速度以及模块机制。Vue Diff 使用双向链表，边对比，边更新 DOM。

- React 主要使用 diff 队列保存需要更新哪些 DOM，得到 patch 树，再统一操作批量更新 DOM。

## 不同点
1. - React中，当某组件的状态发生改变时候，它会以该组件为根，渲染整个组件子树；
    - 在Vue中，组件的依赖是在渲染的过程中自动跟踪的，所以系统能准确知晓哪个组件确实需要被重新渲染；
2. 
### 监听数据变化的实现原理不同
1. Vue通过```getter/setter```以及一些函数的劫持，能精确知道数据变化，不需要特别的优化就能达到很好的性能；
2. React默认是通过比较引用的方式进行比较的，如果不优化```（PureComponent/shouldComponentUpdate）```可能导致大量不必要的```VDOM```渲染；
### 数据流不同
1. Vue1.0默认支持双向绑定，包括：
    - 父子组件之间，```props```可以双向绑定（Vue2.0中被去除）；
    - 组件和DOM之间可以通过双向```v-model```双向绑定；
2. React一直不支持数据的双向绑定，React提倡单向数据流，称之为```onChange/setState```模式；
### HOC 和 Mixins
1. 在组合不同功能的时候，Vue是通过mixin是现实，而React则是使用HOC（高阶组件）；
    React也可以使用Mixin买单时因为组件入侵太多导致过多问题而废弃；
2. Vue为什么不采用HOC来实现：
    - 高阶组件本质就是高阶函数，React的组件是一个纯粹的函数，所以高阶函数对于React来说非常简单；
    - 但是Vue中的组件只是一个被包装的函数
### 组件通信的区别
1. Vue在2.2.0中新增了```provide/inject```来实现父组件想子组件注入数据，可以跨越多个层级；
2. 与之类似的，则是React可以通过context进行跨层级的通信；；
3. Vue中子组件向父组件传递消息的方式有两种： 事件和回调函数；Vue更倾向于使用事件，但是React中一般使用回调函数
### 模版渲染方式的不同
1. React通过JSX渲染。React是在组件JS代码中，通过原生JS实现模版中常见语法，比如插值，条件，循环等，均通过JS语法实现，更加原生。
2. Vue也可以使用JSX渲染，但主要是通过一种拓展的HTML语法进行渲染。Vue是在和组件JS代码分离的单独模版中，通过```v-xxx```（如v-if, v-for）等指令来实现的。

因为React中函数是支持闭包的，所以在import的组件在render中可以直接调用。在Vue中，由于，因为模版中使用的数据都必须挂载在this上进行一次中转，；所以，当import了一个组件之后，还需要在compoents中再声明一次，造成代码冗余。
### 渲染过程不同
1. Vue可以更快速地机计算出VDOM的差异，这是因为在渲染的过程中，会跟踪每一个组件的依赖关系，不需要重新渲染整个组件树。
2. React在应用的状态改变的时候，全部组建会重新渲染（shouldComponenntUpdate/pure compoent等可以控制）。
### Vuex和Redux区别
1. Redux 使用的是不可变数据，而 Vuex 的数据是可变的。Redux 每次都是用新的 state 替换旧的 state，而 Vuex 是直接修改
2. Redux 在检测数据变化的时候，是通过 diff 的方式比较差异的，而 Vuex 其实和 Vue 的原理一样，是通过 getter/setter 来比较的（如果看 Vuex 源码会知道，其实他内部直接创建一个 Vue 实例用来跟踪数据变化）
3. Vuex中$store被直接注入到了组件实例中，因此可以比较灵活使用
- 使用dispatch和commit提交更新
- 通过mapState或者直接this.$store来读取数据
4. Redux中，每一个组件都需要显示的用connect吧需要的props和dispatch链接起来；
而Vuex更加灵活一些，组建中既可以dispatch action也可以commit updates，而Redux中只能进行dispatch，并不能直接调用reducer进行修改
### 状态更新
- React
1. React 使用setState更新；React通过一个队列机制来实现state更新，当执行setState()时，会将需要更新的state合并后，根据变量isBatchingUpdates判断是直接更新还是放入队列；
2. JS原生的事件绑定如addEventListener和SetTimeout/SetInterval等React无法掌控的API情况下，isBatchingUpdates为false，执行同步更新。
3. 放入队列后，不会立即更新state，队列即可以高效的，批量的更新state。而如果不通过setState，直接修改this.state的值，则不会放入状态队列。
4. setState依次直接设置state会被合并，但是传入function则不会被合并；

- Vue
1. vue 自身维护 一个 更新队列，当你设置 ```this.a = 'new value'```，DOM 并不会马上更新； 
2. 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更； 
3. 如果同一个 watcher 被多次触发，只会被推入到队列中一次； 
4. 也就是下一个事件循环开始时执行更新时才会进行必要的 DOM 更新和去重；
5. 所以 for 循环 10000 次 this.a = i vue 只会更新一次，而不会更新 10000 次;
6. data 变化后如果 computed 或 watch 监听则会执行;
7. Vue 的 data 必须是函数
    对象是引用类型，内存是存贮引用地址，那么子组件中的 data 属性值会互相污染，产生副作用；
    如果是函数，函数的{}构成作用域，每个实例相互独立，不会相互影响；
React的state 是定义在函数里面,作用域已经独立
