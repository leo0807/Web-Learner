## 响应式原理
1. Observer
观察者，使用Object.defineProperty方法对对象的每一个子属性进行数据劫持/监听，在get方法中进行依赖收集，添加订阅者```watcher```到订阅中心。在set方法中，对新的值进行收集，同时订阅中心通知订阅者们。
```
/*对象的子对象递归进行observe并返回子节点的Observer对象*/
let childOb = observe(val)
Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      /*如果原本对象拥有getter方法则执行*/
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        /*进行依赖收集*/
        dep.depend()
        if (childOb) {
          /*子对象进行依赖收集，其实就是将同一个watcher观察者实例放进了两个depend中，一个是正在本身闭包中的depend，另一个是子元素的depend*/
          childOb.dep.depend()
        }
        if (Array.isArray(value)) {
          /*是数组则需要对每一个成员都进行依赖收集，如果数组的成员还是数组，则递归。*/
          dependArray(value)
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      /*通过getter方法获取当前值，与新值进行比较，一致则不需要执行下面的操作*/
      const value = getter ? getter.call(obj) : val
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter()
      }
      if (setter) {
        /*如果原本对象拥有setter方法则执行setter*/
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      /*新的值需要重新进行observe，保证数据响应式*/
      childOb = observe(newVal)
      /*dep对象通知所有的观察者*/
      dep.notify()
    }
  })
```
Vue 无法检测 property 的添加或移除。由于 Vue 会在初始化实例时对 property 执行 getter/setter 转化，所以 property 必须在 data 对象上存在才能让 Vue 将它转换为响应式的
```
const vm = new Vue({
    data: {
        a: 1
    }
})
// vm.a 是响应式的
vm.b = 2  // 是非响应式的
```
对于已经创建的实例，Vue 不允许动态添加根级别的响应式 property。但是可以通过以下方式实现。
```
Vue.set(vm.someObject, 'b', 2)
this.\$set(this.someObject,'b',2)
// 为已有对象赋值多个新 property
// 代替 `Object.assign(this.someObject, { a: 1, b: 2 })`
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
```

2. Watcher
扮演的角色是订阅者，他的主要作用是为观察属性提供通知函数，当被观察的值发生变化时，会接收到来自订阅中心 dep 的通知，从而触发依赖更新。
核心方法有：
- get() 获得 getter 的值并且重新进行依赖收集
- addDep(dep: Dep) 添加一个依赖关系到订阅中心 Dep 集合中
- update() 提供给订阅中心的通知接口，如果不是同步的(sync)，那么会放到队列中，异步执行，在下一个事件循环中执行（采用 Promise、MutationObserver 以及 setTimeout 来异步执行）
```
/*初始化computed*/
// 核心是为每个计算属性创建一个 watcher 对象
function initComputed (vm: Component, computed: Object) {
  const watchers = vm._computedWatchers = Object.create(null)

  for (const key in computed) {
    const userDef = computed[key]
    /*
      计算属性可能是一个function，也有可能设置了get以及set的对象。
    */
    let getter = typeof userDef === 'function' ? userDef : userDef.get
    if (process.env.NODE_ENV !== 'production') {
      /*getter不存在的时候抛出warning并且给getter赋空函数*/
      if (getter === undefined) {
        warn(
          `No getter function has been defined for computed property "${key}".`,
          vm
        )
        getter = noop
      }
    }
    // create internal watcher for the computed property.
    /*
      为每个计算属性创建一个内部的监视器Watcher，保存在vm实例的_computedWatchers中
      这里的computedWatcherOptions参数传递了一个lazy为true，会使得watch实例的dirty为true
    */
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions)

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    /*组件定义的计算属性不能与 data 和 property 重复定义*/
    if (!(key in vm)) {
      /*定义计算属性*/
      defineComputed(vm, key, userDef)
    } else if (process.env.NODE_ENV !== 'production') {
      /*如果计算属性与已定义的data或者props中的名称冲突则发出warning*/
      if (key in vm.$data) {
        warn(`The computed property "${key}" is already defined in data.`, vm)
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(`The computed property "${key}" is already defined as a prop.`, vm)
      }
    }
  }
}

/*创建计算属性的getter*/
function createComputedGetter (key) {
  return function computedGetter () {
    const watcher = this._computedWatchers && this._computedWatchers[key]
    if (watcher) {
      /*实际是脏检查，在计算属性中的依赖发生改变的时候dirty会变成true，在get的时候重新计算计算属性的输出值
       *若依赖没发生变化，直接读取 watcher.value
       */
      if (watcher.dirty) {
        watcher.evaluate()
      }
      /*依赖收集*/
      if (Dep.target) {
        watcher.depend()
      }
      return watcher.value
    }
  }
}
```

3. Dep
扮演的角色是调度中心，主要的作用就是收集观察者 ```Watcher``` 和通知观察者目标更新。
每一个属性都有一个 ```Dep``` 对象,用于存放所有订阅了该属性的观察者对象，当数据发生改变时，会遍历观察者列表（dep.subs），通知所有的 ```watch```，让订阅者执行自己的 ```update``` 逻辑。


## watch 和 computed
1. computed主要用于同步数据的处理，而watch主要用于事件的派发，可以异步
2. computed拥有缓存属性，只有当依赖数据发生变化的时候，关联的数据才会变化，适用于计算或者格式化数据的场景；
3. watch监听数据，有关联但是没有依赖，只要某个数据发生变化，就可以一些数据或者派发事件，并同步或者异步执行;
4. 从编码上 computed 实现的功能也可以通过普通 method 实现，但与函数相比，计算属性是基于响应式依赖进行缓存的，只有在依赖的数据发生改变是，才重新进行计算，只要依赖项没有发生变化，多次访问都只是从缓存中获取;

## vue 中 key 的作用
1. diff中的sameVnode判断，利用快速节点比对
2. 列表节点唯一标识
列表循环 v-for="i in dataList" 会有提示我们需要加上 key ，因为循环后的 dom 节点的结构没特殊处理的话是相同的， key 的默认值是 undefined ，那么按照上面 sameVnode 的算法，新生成的 Vnode 与 旧的节点的比较结果就是相同的，vue 会对这些节点尝试就地修改/复用相同类型元素的，这种模式是高效，但是这种模式会有副作用，比如节点是带有状态的，那么就会出现异常的 bug，所以这种不写 key 的默认处理只适用于不依赖其他状态的列表
3. 利于节点高效查找
同一层 vnode 节点是以数组的方式存储，那么如果节点非常多，通过遍历查找就稍微有点慢，因此，内部将 vnode 列表转换成对象，代码如下：
```
/*
  生成一个key与旧VNode的key对应的哈希表
  比如childre是这样的 [{xx: xx, key: 'key0'}, {xx: xx, key: 'key1'}, {xx: xx, key: 'key2'}]  beginIdx = 0   endIdx = 2  
  结果生成{key0: 0, key1: 1, key2: 2}
*/
function createKeyToOldIdx (children, beginIdx, endIdx) {
  let i, key
  const map = {}
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key
    if (isDef(key)) map[key] = i
  }
  return map
}
```
最终可以使用map直接查找



## Vue对于数组的处理
由于JS的限制（Object.defineProperty），Vue不能检测一下数组的变动
- 当你利用索引直接设置一个数组项时，例如：```vm.items[indexOfItem] = newValue```
- 当你修改数组的长度时，例如：```vm.items.length = newLength```
即，
```
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x' // 不是响应性的
vm.items.length = 2 // 不是响应性的
```
这是因为Object.definePropety不能监听数组的长度，所以直接修改数组长度是没法被监听到的
与之对应的修改方法则是
```
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
vm.$set(vm.items, indexOfItem, newValue)
vm.tems.splice(newLength)
```

## 异步更新队列
Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。

## V-model实现
```
<input @input="change" :obj="obj">
change (e) {
    this.obj = e.target.value;
}
```

## vue 可以定义函数式组件么
函数式组件：没有状态(data)，没有生命周期，只接受传递的 props ,常用于纯 UI 组件
定义：

1. 通过 Vue.component 构建组件时，添加 functional: true; 需要通过调用 render 函数来渲染，常用包裹组建或者构建高阶组件;
2. 对于单文件组件，在 template 上添加 functional ```<template functional>```;

## vue 有几种构建版本
1. 有生成版本和开发版本的区分；
2. 完整版和运行时版本的区分，完整版包含编译器（用于生成渲染函数）；
3. 构建环境的区分，支持 UMD(AMD 和 commonjs)、commonjs、ES Module(用于构建工具的)、ES Module(用于浏览器的)

## vuex 中为什么把把异步操作封装在 action，把同步操作放在 mutations
区分 actions 和 mutations而是为了能用 devtools 追踪状态变化。异步操作和同步操作一样会触发mutation。
每次执行完后，就可以立即得到下一个状态，这样在 devtools 调试工具中，就可以跟踪到状态的每一次变化，可以做时间旅行 time-travel ，那么如果是异步的话，就没法知道状态什么时候被更新，所以就有了一个 actions 用来专门处理异步函数，但要求状态的需要触发 mutations ,这样一来对于异步的更新也可以清晰看到状态的流转。



## vuex getter 方法跟直接 state 中获取有什么区别
getter类似于计算属性，带有缓存；当只有响应的属性发生变化才会更新缓存，相比直接获取效率更好，在设计上可以便于抽象逻辑。

## vue-router 中的 link 跳转和 a 链接跳转的区别
1. 判断是否有 onclick 事件，有就执行;
2. click的时候，阻止```<a>```标签的默认事件;
3. 再取得跳转 href（即是 to，使用 history.replace 或 history.push 修改地址栏，同时不触发页面刷新

react-router中则需要配合 ```<Route>``` 使用;
## webpack 的 externals
防止将外部引用的包打包到 bundle 中，而是在运行时通过模块化的方式从外部引用。
比如我们通过 cdn 引用 jquery ，我们不希望 jq 打包到 bundle 中，而且在使用时希望能通过模块化的方式引用，那么可以如下配置
```
module.exports = {
  //...
  externals: {
    jquery: 'jQuery'
  }
};
```
## 接口怎么防刷？
被人通过工具在短时间内恶意大量请求服务端。常用优化方式如下
- referer 校验 UA 校验
- 客户端和服务端约定签名算法，由服务端校验签名
- 服务端对请求 ip 单位时间内请求数量限制
- 通过前置交互式验证手段，先验证通过在接收请求

## 为什么前端 react，vue 框架都是单向数据流？
1. 所有的状态改变(mutation)可追溯

举个例子，父组件维护了一个状态，假设子组件可随意更改父组件甚至祖宗组件的状态，那各组件的状态改变就会变得难以追溯，父组件的状态也可能被子组件意外修改而不可察觉。而单向数据流保证了父组件的状态不会被子组件意外修改如果要修改，只能通过在子组件中 dispatch 一个 action 来对全局状态修改，全局状态在通过 props 分发给子组件；又或是调用父组件的方法；又或是发事件，这些操作是肉眼可见且可控的（用函数式来说，保证了组件就是无副作用的纯函数），不至于造成状态总被意外修改而导致难以维护的情况。


## 虚拟 dom 与直接操作 dom 相比哪个更快？
1. 原生 DOM 操作 vs. 通过框架封装操作：
没有任何框架可以比纯手动的优化 DOM 操作更快，因为框架的 DOM 操作层需要应对任何上层 API 可能产生的操作，它的实现必须是普适的。框架的意义在于为你掩盖底层的 DOM 操作，让你用更声明式的方式来描述你的目的，从而让你的代码更容易维护。（不可能对某一个原生DOM操作进行手动优化）

2. 重绘性能消耗的对比：
- innerHTML: render html string O(template size) + 重新创建所有 DOM 元素 O(DOM size)
- Virtual DOM: render Virtual DOM + diff O(template size) + 必要的 DOM 更新 O(DOM change)
render Virtual DOM + diff O 显然比渲染 html string 要慢，但我们知道，这是纯 js 层面的计算相比， 与 DOM 层面的操作的开销相比要小很多。
所以直接操作 dom 的开销就和整个页面相关，而虚拟 dom 的开销就是 js 层面的计算和计算后的 dom 的开销，所以虚拟 dom 就可以保证，不管页面数据变化多少，每次计算后的重绘的性能都在可接受范围内。

3. 在比较性能的时候，要分清楚初始渲染、小量数据更新、大量数据更新这些不同的场合。Virtual DOM、脏检查 MVVM、数据收集 MVVM 在不同场合各有不同的表现和不同的优化需求。Virtual DOM 为了提升小量数据更新时的性能，也需要针对性的优化，比如 shouldComponentUpdate 或是 immutable data。

- 初始渲染：Virtual DOM > 脏检查 >= 依赖收集
- 小量数据更新：依赖收集 >> Virtual DOM + 优化 > 脏检查（无法优化） > Virtual DOM 无优化 
- 大量数据更新：脏检查 + 优化 >= 依赖收集 + 优化 > Virtual DOM（无法/无需优化）>> MVVM 无优化

4. VDOM的真正意义
- 为函数式的 UI 编程方式打开了大门；
- 可以渲染到 DOM 以外的 backend，比如 ReactNative；




部分来源：
作者：counterxing
链接：https://www.zhihu.com/question/315844790/answer/637000219
作者：小黎也
链接：https://juejin.cn/post/6844904089956925454
作者：尤雨溪
链接：https://www.zhihu.com/question/31809713/answer/53544875

