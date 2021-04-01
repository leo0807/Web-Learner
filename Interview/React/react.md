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


# 为什么说单页面的SEO不友好
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