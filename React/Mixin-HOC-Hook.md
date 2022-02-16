# Mixin
Mixin（混入）是一种通过扩展收集功能的方式，它本质上是将一个对象的属性拷贝到另一个对象上面去，不过你可以拷贝任意多个对象的任意个方法到一个新对象上去，这是继承所不能实现的。它的出现主要就是为了解决代码复用问题。

```
var LogMixin = {
actionLog: function() {
console.log('action...');
},
requestLog: function() {
console.log('request...');
},
};
function User() { /_.._/ }
function Goods() { /_.._/ }
_.extend(User.prototype, LogMixin);
_.extend(Goods.prototype, LogMixin);
var user = new User();
var good = new Goods();
user.actionLog();
good.requestLog();
```

## 在React中使用Mixin
```
var LogMixin = {
log: function() {
console.log('log');
},
componentDidMount: function() {
console.log('in');
},
componentWillUnmount: function() {
console.log('out');
}
};

var User = React.createClass({
mixins: [LogMixin],
render: function() {
return (<div>...</div>)
}
});

var Goods = React.createClass({
mixins: [LogMixin],
render: function() {
return (<div>...</div>)
}
});

```
## Mix的危害
- Mixin 可能会相互依赖，相互耦合，不利于代码维护
- 不同的 Mixin 中的方法可能会相互冲突
- Mixin 非常多时，组件是可以感知到的，甚至还要为其做相关处理，这样会给代码造成滚雪球式的复杂性

https://juejin.cn/post/6844903815762673671#heading-34


# HOC
## HOC的实现方法
1. 属性代理
    ```
    function proxyHoc(WrappedComponent){
        return class extends Component{
            render(){
                return <WrappedComponent {...this.props}>;
            }
        }
    }
    ```
    增强项：
    - 可操作所有传入的 props
    - 可操作组件的生命周期
    - 可操作组件的 static 方法
    - 获取 refs

2. 反向继承
    ```
    function inheritHOC(WrappedComponent){
        return class extends WrappedCompoent{
            return super.render();
        }
    }
    ```
    增强项：
    1. 可操作所有传入的 props
    2. 可操作组件的生命周期
    3. 可操作组件的 static 方法
    4. 获取 refs
    5. 可操作 state
    6. 可以渲染劫持


## HOC的优点
1. 高阶组件也有可能造成冲突，但我们可以在遵守约定的情况下避免这些行为
2. 高阶组件并不关心数据使用的方式和原因，而被包裹的组件也不关心数据来自何处。高阶组件的增加不会为原组件增加负担
3. 高阶组件就是一个没有副作用的纯函数，各个高阶组件不会互相依赖耦合

## HOC 的缺陷
1. HOC 需要在原组件上进行包裹或者嵌套，如果大量使用 HOC，将会产生非常多的嵌套，这让调试变得非常困难。
2. HOC 可以劫持 props，在不遵守约定的情况下也可能造成冲突。



# 渲染劫持
什么是渲染劫持：渲染劫持的概念是控制组件从另一个组件输出的能力，当然这个概念一般和 react 中的高阶组件（HOC）放在一起解释比较有明了。
高阶组件可以在 render 函数中做非常多的操作，从而控制原组件的渲染输出，只要改变了原组件的渲染，我们都将它称之为一种渲染劫持。
实际上，在高阶组件中，组合渲染和条件渲染都是渲染劫持的一种，通过反向继承，不仅可以实现以上两点，还可以增强由原组件 render 函数产生的 React 元素。
实际的操作中 通过 操作 state、props 都可以实现渲染劫持


# 当页面渲染了下一次更新的结果后，执行下一次 useEffect 之前，会调用这个函数。这个函数常常用来对上一次调用 useEffect 进行清理

# 自定义Hook
```
function useTitle(title) {
    useEffect(
        () => {
            document.title = title;
        return () => (document.title = "主页");
        },[title]);
}
function Page1(props){
    useTitle('Page1');
    return (<div>...</div>)
}
```

## 模拟 componentDidUpdate

componentDidUpdate 就相当于除去第一次调用的 useEffect，我们可以借助 useRef 生成一个标识，来记录是否为第一次执行
```
function useDidUpdate(callback, prop) {
const init = useRef(true);
useEffect(() => {
if (init.current) {
init.current = false;
} else {
return callback();
}
}, prop);
}

```