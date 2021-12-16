## 为什么每个 react 组件都需要 import React from 'react'
因为打包工具是需要**React.createElement**这个方法把你写的 jsx 转化为虚拟 DOM 的

<!-- https://zhuanlan.zhihu.com/p/92211533
 -->
## 受控组件和非受控组件
### 受控组件
在 HTML 的表单元素中，它们通常自己维护一套 state，并随着用户的输入自己进行 UI 上的更新，这种行为是不被我们程序所管控的。而如果将 React 里的 state 属性和表单元素的值建立依赖关系，再通过 onChange 事件与 setState()结合更新 state 属性，就能达到控制用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做受控组件

### 非受控组件
仅是想要获取某个表单元素的值，而不关心它是如何改变的，使用React.createRef获取值

作者：LinDaiDai\_霖呆呆
链接：https://juejin.cn/post/6858276396968951822
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


# 类组件与函数组件
## 函数式组件捕获了渲染所使用的值
https://overreacted.io/zh-hans/how-are-function-components-different-from-classes/
```
class App extends Component {

  handleClick() {
    console.log('handleClick')
  }
  
  render() {
    return (
      <button onClick={this.handleClick}>按钮</button>
    );
  }

}

```
类组件中的```this.handleClick``` 中的 ```handleClick``` 被提取出来，放在一个事件池中
之后当再次被触发的时候嘛，```this``` 早已经不是指向那个组件了

- 解决办法
1. 虚拟 dom 直接 bind 绑定
2. 构造函数绑定
3. 直接绑定一个匿名函数


## React16和React17的事件委托
(Link)[!https://juejin.cn/post/6927981303313006599#heading-10]
在 16 版本上，React 把所有事件全部挂载到 document；
在 17 版本上，事件委托不放在 document 上，而是放在执行的根节点上，如 #root

- persist
React 为了把事件绑定性能做到了极致，做了一件事，当绑定的事件结束之后合成事件回调对象 就会被立马销毁。
```
const handleClick = useCallback((e) => {
  //e.persist();不加此行语句，会发现宏任务中的e为null，事件被清空
  console.log(e)
  setTimeout(() => console.log(e))
}, [])
```

# 为什么说单页面应用（SPA）的SEO不友好
因为单页面的情况下的页面中的很多内容都是根据匹配到的路由动态生成并展示出来的,而且很多页面内容是通过ajax异步获取的,网络抓取工具并不会等待异步请求完成后再行抓取页面内容,对于网络抓取工来说去准确模拟相关的行为获取复合数据是很困难的,它们更擅长对静态资源的抓取和分析.

作者：前端古力士
链接：https://juejin.cn/post/6844903961091112968
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

# 如何解决单页面SEO不友好的问题
1. 预渲染
2. SSR

# useEffect定时器问题解决办法
1. 首先定义 timer
const timer= useRef();

2. 在 useEffect 中做清除，以保证内存不被泄露

useEffect(() => {
...
return ()=> {
clearInterval(timer.current);
};
}, );

3. 在需要的部分使用定时器，直接调用 state 的数据后

timer.current = setInterval(() => {
if (count<90) {
setCount(count+1);
} else {
clearInterval(timer.current);
}
}, 300);

```
function App() {

const [value, setValue] = useState<number>(0);
const [timers, setTimers] = useState<Array<NodeJS.Timeout>>([]);

const saveCallBack: any = useRef();
const callBack = () => {
  const random: number = (Math.random() \* 10) | 0;
  setValue(value + random);
};
useEffect(() => {
  saveCallBack.current = callBack;
  return () => {};
});
useEffect(() => {
  const tick = () => {
  saveCallBack.current();
};
const timer: NodeJS.Timeout = setInterval(tick, 5000);
  timers.push(timer);
  setTimers(timers);
  console.log(timers);
  return () => {
    clearInterval(timer);
  };
}, []);
return <div>{value}</div>;
}
```

# 实现类似vue的表单双向绑定
```
import React, { Component } from "react"

export default class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "Hello!"
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    // 设置 input 的值
    this.setState({ value: event.target.value })
  }
  render() {
    var value = this.state.value
    return (
      <div>
        <input type="text" value={value} onChange={this.handleChange} />
        <p>{value}</p>
      </div>
    )
  }
}
```

# 约束性组件和非约束性组件
所谓的**非约束性组件**，就是在```<input type="text" defaultValue="a" /> ```中，这个 **defaultValue** 其实就是原生DOM中的 value 属性。这样写出的来的组件，其value值就是用户输入的内容，React完全不管理输入的过程。

而**约束性组件**是指在```<input value={this.state.username} type="text" onChange={this.handleUsername} />```中，**value**属性不再是一个写死的值，他是 this.state.username, this.state.username被**onChange绑定**。这个时候实际上 input 的 value 根本不是用户输入的内容。而是onChange 事件触发之后，由于 this.setState 导致了一次重新渲染。不过React会优化这个渲染过程。看上去有点类似**双向数据绑定**。

# useCallback缺陷
```
function updateCallback<T>(
    callback: T, // useCallback 的第一个参数
    deps: Array<mixed> | void | null // useCallback 的第二个参数
): T {

  // 取到当前的 useCallback 语句对应的 hook 节点，
  const hook = updateWorkInProgressHook();
  
  // 当前的依赖，后面拿来和上一次的依赖进行比较
  const nextDeps = deps === undefined ? null : deps;
  
  // 取到上一次缓存的函数
  const prevState = hook.memoizedState;
  if (prevState !== null) {
    // 传了 useCallbck 的第二个参数才走到这里
    if (nextDeps !== null) {
      const prevDeps: Array<mixed> | null = prevState[1];
      // 上一次的依赖和这一次的依赖进行比较，
      // 相同就直接返回缓存的结果
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        return prevState[0];
      }
    }
  }
  hook.memoizedState = [callback, nextDeps];
  return callback;
}
```
- 执行流程：
1. 首先，我们要额外执行 useCallback 函数，
2. 同时，我们也要申请 useCallbck 第一个参数对应的函数所需要的内存，这一点的花费就和 method1 的开销一样了，就算我们会使用缓存，useCallback 第一个参数的内存的开销也是要的。
3. 除此之外，为了能判断 useCallback 要不要更新结果，我们还要在内存保存上一次的依赖。
4. 并且，如果我们的 useCallback 返回的函数依赖了组件其他的值，由于 JS 中闭包的特性，他们也会一直存在而不被销毁。



## useCallback使用场景
假设我们有一个叫做 Counter 的子组件，初始化渲染的时候消耗非常大：
```<ExpensiveCounter count={count} onClick={handleClick} />```
如果我们不做任何优化，父组件有了任何更新，都会重新渲染 Counter。为了避免每次渲染父组件的时候都重新渲染子组件，我们可以使用 ```React.memo```：
```
const ExpensiveCounter = React.memo(function Counter(props) {
...
})
```
使用 ```React.memo``` 包裹之后，```Counter``` 组件只有在 ```props``` 发生变化的时候才会重新渲染，我们的 ```Counter``` 接受两个 ```props```：原始值 ```count```，函数 ```handleClick```。
如果父组件由于其他值的更改而发生了更新，父组件会重新渲染，由于 ```handleClick``` 是一个对象，每次渲染生成的 ```handleClick``` 都是新的。
这就会导致，尽管 Counter 被 React.memo 包裹了一层，但是还是会重新渲染，为了解决这个问题，我们就要这样写 handleClick 函数了：
```
const handleClick = useCallback(() => {
// 原来的 handleClick...
}, [])
```
这样，我们每次传递给 Counter 组件的 handleClick 都是同一个，我们的 Counter 组件只有在 count 发生变化的时候才会去渲染，这正是我们想要的，也就起到了很好的优化作用。

作者：mysteryven
链接：https://juejin.cn/post/7019989729148059656
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
