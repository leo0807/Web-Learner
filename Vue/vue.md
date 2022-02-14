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
    } else if (process.env.NODE_E$V !== 'production') {
      /*如果计算属性与已定义的data或者`props`中的名称冲突则发出`warning*/`
      if (key in v`m.$d`ata) `{
       warn(``The computed pro- `$listeners`perty "${key}" is already defined in data.`, vm)
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

## Watch 侦听器
[部分参考](https://www.cnblogs.com/amujoe/p/11429691.html)
```
<div>
      <p>FullName: {{fullName}}</p>
      <p>FirstName: <input type="text" v-model="firstName"></p>
</div>
 
new Vue({
  el: '#root',
  data: {
    firstName: 'Dawei',
    lastName: 'Lou',
    fullName: ''
  },
  watch: {
    firstName(newName, oldName) {
      this.fullName = newName + ' ' + this.lastName;
    }
  } 
})
```
上面的代码的效果是，当我们输入 firstName 后，wacth 监听每次修改变化的新值，然后计算输出 fullName

<hr />

### handler方法和immediate属性
`watch`的其中一个特点是最初绑定的时候，handler是不会被执行的，以上方代码为例，只有等到`firstName` 改变的时候才会执行监听器。如果想要一开始就让它在最初绑定的时候就执行，需要使用`immediate`属性。例子如下，
```
watch: {
  firstName: {
    handler(newName, oldName) {
      this.fullName = newName + ' ' + this.lastName;
    },
    // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
    immediate: true // 默认false
  }
}
```
<hr />

### `deep`属性
当需要监听一个对象的改变时，普通的 `watch` 方法无法监听到对象内部属性的改变，只有 `data` 中的数据才能够监听到变化，此时就需要 `deep` 属性对对象进行深度监听。

```
<div>
  <p>obj.a: {{ obj.a }}</p>
  <p>obj.a: <input type="text" v-model="obj.a"/></p>
</div>

new Vue ({
  el: '#root',
  data: {
    obj: {
      a: 123
    }
  },
  watch: {
    obj: {
      handler(newName, oldName){
        console.log('obj.a changed');
      },
      immediate: true,
      deep: true
    }
  }
})
```
`deep` 的意思就是深入观察，监听器会一层层的往下遍历，给对象的所有属性都加上这个监听器，但是这样性能开销就会非常大了，任何修改 `obj` 里面任何一个属性都会触发这个监听器里的 handler。

优化：
```
watch: {
  'obj.a': {
    handler(newName, oldName) {
      console.log('obj.a changed');
    },
    immediate: true,
    // deep: true
  }
}
```
### `watch`注销
<hr />

组件是经常要被销毁的，比如我们跳一个路由，从一个页面跳到另外一个页面，那么原来的页面的 `watch` 其实就没用了，这时候我们应该注销掉原来页面的 `watch` 的，不然的话可能会导致内置溢出。好在我们平时 `watch` 都是写在组件的选项中的，他会随着组件的销毁而销毁

```
const unWatch = app.$watch('text', (newVal, oldVal) => {
  console.log(`${newVal} : ${oldVal}`);
})
 
unWatch(); // 手动注销watch
```

### 使用`watch`进行路由监听
<hr />

```
watch: {
    changeShowType(value) {
      console.log("-----"+value);
    },
    '$route'(to,from){
      console.log(to);   //to表示去往的界面
      console.log(from); //from表示来自于哪个界面
      if(to.path=="/shop/detail"){
        console.log("商品详情");
      }
    }
  },
```


### `watch` 和 `computed`
<hr />
1. computed主要用于同步数据的处理，而watch主要用于事件的派发，可以异步
2. computed拥有缓存属性，只有当依赖数据发生变化的时候，关联的数据才会变化，适用于计算或者格式化数据的场景；
3. watch监听数据，有关联但是没有依赖，只要某个数据发生变化，就可以一些数据或者派发事件，并同步或者异步执行;
4. 从编码上 computed 实现的功能也可以通过普通 method 实现，但与函数相比，计算属性是基于响应式依赖进行缓存的，只有在依赖的数据发生改变是，才重新进行计算，只要依赖项没有发生变化，多次访问都只是从缓存中获取;

## vue 中 key 的作用
不使用key会导致的BUG

[LINK](https://juejin.cn/post/6844903918619590669)

1. diff中的sameVnode判断，了高效的更新虚拟 DOM，其原理是 vue 在 patch 过程中通过 key 可以精准判断两个节点是否是同一个，从而避免频繁更新不同元素，使得整个 patch 过程更加高效，减少 DOM 操 作量，提高性能。

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
4. vue 中在使用相同标签名元素的过渡切换时，也会使用到 key 属性，其目的也是为了让 vue 可以区分它们，否则 vue 只会替换其内部属性而不会触发过渡效果。



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
- 可以渲染到 DOM 以外的 backend，比如 ```React Native```；
- 跨平台，对比```Svelte```。

# Vue 组件 data 为什么必须是个函数而 Vue 的```根```实例则没有此限制？
函数每次执行都会返回全新data对象实例
1. Vue组件可能存在多个实例，如果使用对象定义data，则会导致他们共用一个data对象，那么状态变更将会影响所有组件实例；
2. 采用函数形式定义，在initData时会将其作为工厂函数返回全新对象，有效规避多实例之间状态污染问题；
3. Vue根实例创建过程中则不存在该限制，也是因为根实例只能有一个，不需要担心这种情况

# Vue 组件为什么 data 必须是一个函数？
每次实例化组件调用 data 函数，返回一个新对象，使其组件拥有独立的对象数据，若不是函数共用一个对象，不具有独立性
。
举例，
```
function Component(){
 
}
Component.prototype.data = {
    name:'jack',
    age:22,
}
var componentA = new Component();
var componentB = new Component();
componentA.data.age=55;
console.log(componentA,componentB)
```
此时componentA,componentB的age数据指向同一片数据地址，数据见不具备独立性；
- 使用函数修改后
```
function Component(){
 this.data = this.data()
}
Component.prototype.data = function (){
    return {
    name:'jack',
    age:22,
}
}
var componentA = new Component();
var componentB = new Component();
componentA.data.age=55;
console.log(componentA,componentB)
```
此时 ```componentA```, ```componentB``` 的 age 分别为55，22，数据间隔具备独立性；

## 原理分析
当```Vue```初始化```data```的代码，data的定义可以是函数可以是对象
源码位置：/vue-dev/src/core/instance/state.js
```
function initData (vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}
    ...
}
```
此时，```data```既可以是```object```也可以是```function```。

- 当组件在创建的时候，Vue会进行选项的合并
源码位置：```/vue-dev/src/core/util/options.js```
自定义组件会进入 ```mergeOptions``` 进行选项合并
```
Vue.prototype._init = function (options?: Object) {
    ...
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    ...
  }
```
合并的时候会对定义 ```data``` 会进行数据校验
源码位置：```/vue-dev/src/core/instance/init.js```
这时候 ```vm``` 实例为 ```undefined```，进入 ```if``` 判断，若 ```data``` 类型不是 ```function```，则出现警告提示
```
strats.data = function (
  parentVal: any,
  childVal: any,
  vm?: Component
): ?Function {
  if (!vm) {
    if (childVal && typeof childVal !== "function") {
      process.env.NODE_ENV !== "production" &&
        warn(
          'The "data" option should be a function ' +
            "that returns a per-instance value in component " +
            "definitions.",
          vm
        );

      return parentVal;
    }
    return mergeDataOrFn(parentVal, childVal);
  }
  return mergeDataOrFn(parentVal, childVal, vm);
};
```

## 总结
1. 根实例对象 ```data``` 可以是对象也可以是函数（根实例是单例），不会产生数据污染情况
2. 组件实例对象 ```data``` 必须为函数，目的是为了防止多个组件实例对象之间共用一个 ```data```，产生数据污染。采用函数的形式，```initData``` 时会将其作为工厂函数都会返回全新 ```data``` 对象

# 动态给 vue 的 data 添加一个新的属性时会发生什么？怎样解决？


# nextTick
- nextTick作用
1. nextTick 是 Vue 提供的一个全局 API 由于 vue 的异步更新策略导致我们对数据的修改不会立刻体现在 dom 变化上，此时如果想要立即获取更新后的 dom 状态，就需要使用这个方法
2. Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发
生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。nextTick 方法会在队列中加入一个回调函数，确保该函数在前面的 dom 操作完成后才调用。 
3. 所以当我们想在修改数据后立即看到 dom 执行结果就需要用到 nextTick 方法。
4. 比如，我在干什么的时候就会使用 nextTick 传一个回调函数进去，在里面执行 dom 操作即可。
5. 我也有简单了解 nextTick 实现，它会在 callbacks 里面加入我们传入的函数然后用 timerFunc 异步方式调用它
们，首选的异步方式会是 Promise。这让我明白了为什么可以在 nextTick 中看到 dom 操作结果。

- 降级策略
0. vue 的数据响应过程包含：数据更改->通知 Watcher->更新 DOM。
1. 早期的Vue利用了MutationObserver中的microtask特性，而不是用其做DOM监听。核心是MicroTask，用不用MutationObserver均可。Vue2.5已经删除了MutationObserver的相关代码，因为其是H5的特性且在IOS上存在BUG。
虽然最优的MicroTask是Promise，但是因为存在兼容性问题，所以不得不进行降级，使用MacroTask。
2. setTimeout 是一种，但它不是理想的方案。因为 setTimeout 执行的最小时间间隔是约 4ms 的样子，略微有点延迟。在 vue2.5 的源码中，macrotask 降级的方案依次是：setImmediate、MessageChannel、setTimeout. setImmediate 是最理想的方案了，可惜的是只有 IE 和 nodejs 支持。MessageChannel 的 onmessage 回调也是 microtask，但也是个新 API，面临兼容性的尴尬。
3. 兜底方案就是 setTimeout 了，尽管它有执行延迟，可能造成多次渲染，算是没有办法的办法 了。

- 总结
1. Vue 用异步队列的方式来控制 DOM 更新和 nextTick 回调先后执行
2. Microtask 因为其高优先级特性，能确保队列中的微任务在一次事件循环前被执行完毕
3. 因为兼容性问题，Vue 不得不做了 ```Microtask``` 向 Macrotask 的降级方案
4. ```timeFunc```优先级顺序 ```Promise```, ```MutationObserver```, ```setImmediate```, ```setTimeout```
- Vue的nextTick实现原理
源码位置：```/src/core/util/next-tick.js```
```callbacks```也就是异步操作队列
```callbacks``` 新增回调函数后又执行了 ```timerFunc``` 函数，```pending``` 是用来标识同一个时间只能执行一次

```
export const nextTick = (function () {
  const callbacks = []
  let pending = false
  let timerFunc

  function nextTickHandler () {
    pending = false
    const copies = callbacks.slice(0)
    callbacks.length = 0
    for (let i = 0; i < copies.length; i++) {
      copies[i]()
    }
  }

  // An asynchronous deferring mechanism.
  // In pre 2.4, we used to use microtasks (Promise/MutationObserver)
  // but microtasks actually has too high a priority and fires in between
  // supposedly sequential events (e.g. #4521, #6690) or even between
  // bubbling of the same event (#6566). Technically setImmediate should be
  // the ideal choice, but it's not available everywhere; and the only polyfill
  // that consistently queues the callback after all DOM events triggered in the
  // same loop is by using MessageChannel.
  /* istanbul ignore if */
  if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
    timerFunc = () => {
      setImmediate(nextTickHandler)
    }
  } else if (typeof MessageChannel !== 'undefined' && (
    isNative(MessageChannel) ||
    // PhantomJS
    MessageChannel.toString() === '[object MessageChannelConstructor]'
  )) {
    const channel = new MessageChannel()
    const port = channel.port2
    channel.port1.onmessage = nextTickHandler
    timerFunc = () => {
      port.postMessage(1)
    }
  } else
  /* istanbul ignore next */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    // use microtask in non-DOM environments, e.g. Weex
    const p = Promise.resolve()
    timerFunc = () => {
      p.then(nextTickHandler)
    }
  } else {
    // fallback to setTimeout
    timerFunc = () => {
      setTimeout(nextTickHandler, 0)
    }
  }

  return function queueNextTick (cb?: Function, ctx?: Object) {
    let _resolve
    callbacks.push(() => {
      if (cb) {
        try {
          cb.call(ctx)
        } catch (e) {
          handleError(e, ctx, 'nextTick')
        }
      } else if (_resolve) {
        _resolve(ctx)
      }
    })
    if (!pending) {
      pending = true
      timerFunc()
    }
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise((resolve, reject) => {
        _resolve = resolve
      })
    }
  }
})()
```

```timerFunc``` 函数定义，这里是根据当前环境支持什么方法则确定调用哪个，分别有：
```Promise.then```、```MutationObserver```、```setImmediate```、```setTimeout```
通过上面任意一种方法，进行降级操作
```
export let isUsingMicroTask = false
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  //判断1：是否原生支持Promise
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  //判断2：是否原生支持MutationObserver
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  //判断3：是否原生支持setImmediate
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  //判断4：上面都不行，直接用setTimeout
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}
```
无论是微任务还是宏任务，都会放到 ```flushCallbacks``` 使用
这里将 ```callbacks``` 里面的函数复制一份，同时 ```callbacks``` 置空
依次执行 ```callbacks``` 里面的函数
```
function flushCallbacks () {
  // 使下个事件循环中能 nextTick 函数中调用 timerFunc 函数
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}
```
- 小结：
1. 把回调函数放入 callbacks 等待执行
2. 将执行函数放到微任务或者宏任务中，每个时间段只执行一次```timeFunc```
3. 事件循环到了微任务或者宏任务，执行函数依次执行 callbacks 中的回调

# 动态给 vue 的 data 添加一个新的属性时会发生什么？怎样解决？

Vue 不允许在已经创建的实例上动态添加新的响应式属性
- 若想实现数据与视图同步更新，可采取下面三种解决方案：
1. ```Vue.set()```
2. ```Object.assign()```
3. ```$forcecUpdated()```

- ```Vue.set()```
```Vue.set( target, propertyName/index, value )```
  - ```{Object | Array} target```
  - ```{string | number} propertyName/index```
  - ```{any} value```
返回值是设定的指
通过```Vue.set```向响应式对象中添加一个property，并确保这个新 property同样是响应式的，且触发视图更新
关于Vue.set源码（省略了很多与本节不相关的代码）
源码位置：```src\core\observer\index.js```
```
function set (target: Array<any> | Object, key: any, val: any): any {
  ...
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}
```

这里无非再次调用```defineReactive```方法，实现新增属性的响应式
关于```defineReactive```方法，内部还是通过```Object.defineProperty```实现属性拦截

大致代码如下：
```
function defineReactive(obj, key, val) {
    Object.defineProperty(obj, key, {
        get() {
            console.log(`get ${key}:${val}`);
            return val
        },
        set(newVal) {
            if (newVal !== val) {
                console.log(`set ${key}:${newVal}`);
                val = newVal
            }
        }
    })
}
```
## Object.assign()
直接使用Object.assign()添加到对象的新属性不会触发更新

应创建一个新的对象，合并原对象和混入对象的属性

```this.someObject = Object.assign({},this.someObject,{newProperty1:1,newProperty2:2 ...})```
## $forceUpdate
如果你发现你自己需要在`Vue`中做一次强制更新，99.9% 的情况，是你在某个地方做错了事

`$forceUpdate`迫使`Vue`实例重新渲染

PS：仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。

## 
- 如果为对象添加少量的新属性，可以直接采用 `Vue.set()`
- 如果需要为新对象添加大量的新属性，则通过 `Object.assign()`创建新对象
- 如果你实在不知道怎么操作时，可采取`$forceUpdate()`进行强制刷新 (不建议)



- `v-bind`在`Vue2.x`中，如果一个元素同时定义了 `v-bind="object"` 和一个相同的独立 `attribute`，那么这个独立 `attribute` 总是会覆盖 `object` 中的绑定。
如，
```
<!-- 模板 -->
<div id="red" v-bind="{ id: 'blue' }"></div>
<!-- 结果 -->
<div id="red"></div>
```
- 在 `Vue3.x` 中，如果一个元素同时定义了 `v-bind="object"` 和一个相同的独立 `attribute`，那么绑定的声明顺序将决定它们如何被合并。换句话说，相对于假设开发者总是希望独立 `attribute` 覆盖 `object` 中定义的内容，现在开发者能够对自己所希望的合并行为做更好的控制
```
<!-- 模板 -->
<div id="red" v-bind="{ id: 'blue' }"></div>
<!-- 结果 -->
<div id="blue"></div>

<!-- 模板 -->
<div v-bind="{ id: 'blue' }" id="red"></div>
<!-- 结果 -->
<div id="red"></div>
```

## `vue`中的`$attrs`和`$listeners`
<hr />

[参考链接](https://segmentfault.com/a/1190000022708579)

多级组件嵌套需要传递数据时，通常使用的方法是通过 `vuex`。如果仅仅是传递数据，而不做中间处理，使用 `vuex` 处理，这就有点大材小用了。所以就有了 `$attrs / $listeners` ，通常配合 `inheritAttrs` 一起使用。

`inheritAttrs：true 继承除 props 之外的所有属性(除外class和style)；inheritAttrs：false 只继承 class 属性`

- 对于`inheritAttrs`的官方解释
[Link](https://v3.cn.vuejs.org/api/options-misc.html#inheritattrs)
默认情况下父作用域的不被认作 `props` 的 `attribute` 绑定 (`attribute bindings`) 将会“回退”且作为普通的 `HTML attribute` 应用在子组件的根元素上。当撰写包裹一个目标元素或另一个组件的组件时，这可能不会总是符合预期行为。通过设置 `inheritAttrs` 到 `false`，这些默认行为将会被去掉。而通过实例 `property $attrs` 可以让这些 `attribute` 生效，且可以通过 `v-bind` 显性的绑定到非根元素上。

- `$attrs`: 包含了父作用域中不作为组件 `props` 或自定义事件的 `attribute` 绑定和事件。当一个组件没有声明任何 `prop` 时，这里会包含所有父作用域的绑定，并且可以通过 `v-bind="$attrs"` 传入内部组件——这在创建高阶的组件时会非常有用。
- `$listeners`: 包含了父作用域中的 (不含 `.native` 修饰符) `v-on` 事件监听器。它可以通过 `v-on=”$listeners”` 传入内部组件。它是一个对象，里面包含了作用在这个组件上的所有事件监听器，相当于子组件继承了父组件的事件。

使用例子：
father.vue
```
<template>
　　 <child :name="name" :age="age" :infoObj="infoObj" @updateInfo="updateInfo" @delInfo="delInfo" />
</template>
<script>
    import Child from '../components/child.vue'

    export default {
        name: 'father',
        components: { Child },
        data () {
            return {
                name: 'Lily',
                age: 22,
                infoObj: {
                    from: '上海',
                    job: 'policeman',
                    hobby: ['reading', 'writing', 'skating']
                }
            }
        },
        methods: {
            updateInfo() {
                console.log('update info');
            },
            delInfo() {
                console.log('delete info');
            }
        }
    }
</script>

```
Child.vue
```
<template>
    <grand-son :height="height" :weight="weight" @addInfo="addInfo" v-bind="$attrs" v-on="$listeners"  />
    // 通过 $listeners 将父作用域中的事件，传入 grandSon 组件，使其可以获取到 father 中的事件
</template>
<script>
    import GrandSon from '../components/grandSon.vue'
    export default {
        name: 'child',
        components: { GrandSon },
        props: ['name'],
        data() {
          return {
              height: '180cm',
              weight: '70kg'
          };
        },
        created() {
            console.log(this.$attrs); 
　　　　　　　// 结果：age, infoObj, 因为父组件共传来name, age, infoObj三个值，由于name被 props接收了，所以只有age, infoObj属性
            console.log(this.$listeners); // updateInfo: f, delInfo: f
        },
        methods: {
            addInfo () {
                console.log('add info')
            }
        }
    }
</script>
```
GrandSon.vue
```
<template>
    <div>
        {{ $attrs }} --- {{ $listeners }}
    <div>
</template>
<script>
    export default {
        ... ... 
        props: ['weight'],
        created() {
            console.log(this.$attrs); // age, infoObj, height 
            console.log(this.$listeners) // updateInfo: f, delInfo: f, addInfo: f
            this.$emit('updateInfo') // 可以触发 father 组件中的updateInfo函数
        }
    }
</script>
```

### inheritAttrs
<hr />

如果你不希望组件的根元素(最外层元素，举例`<html>`)继承 `attribute`，可以在组件的选项中设置 `inheritAttrs`: `false`。

禁用 `attribute` 继承的常见场景是需要将 `attribute` 应用于根节点之外的其他元素。

通过将 `inheritAttrs` 选项设置为 `false`，你可以使用组件的 `$attrs property` 将 `attribute` 应用到其它元素上，该 `property` 包括组件 `props` 和 `emits property` 中未包含的所有属性 (例如，`class`、`style`、`v-on` 监听器等)。

举例，默认情况下，有：
```
app.component('date-picker', {
  template: `
    <div class="date-picker">
      <input type="datetime-local" />
    </div>
  `
})
```
如果我们需要通过 `data-status attribute` 定义 `<date-picker>` 组件的状态，它将应用于根节点 (即 `div.date-picker`)。

```
<!-- 具有非 prop 的 attribute 的 date-picker 组件-->

<date-picker data-status="activated"></date-picker>

<!-- 渲染后的 date-picker 组件 -->
<div class="date-picker" data-status="activated">
  <input type="datetime-local" />
</div>
```
使用 `inheritAttrs: false`后：
```
app.component('date-picker', {
  inheritAttrs: false,
  template: `
    <div class="date-picker">
      <input type="datetime-local" v-bind="$attrs" />
    </div>
  `
})
```
有了这个新配置，`data-status attribute` 将应用于 input 元素！
```
<!-- date-picker 组件使用非 prop 的 attribute -->

<date-picker data-status="activated"></date-picker>

<!-- 渲染后的 date-picker 组件 -->
<div class="date-picker">
  <input type="datetime-local" data-status="activated" />
</div>
```



## 自定义事件

### `.sync`修饰符
[Link](https://cn.vuejs.org/v2/guide/components-custom-events.html)
在有些情况下，我们可能需要对一个 `prop` 进行“双向绑定”。不幸的是，真正的双向绑定会带来维护上的问题，因为子组件可以变更父组件，且在父组件和子组件两侧都没有明显的变更来源。

这也是为什么我们推荐以 `update:myPropName` 的模式触发事件取而代之。举个例子，在一个包含 `title prop` 的假设的组件中，我们可以用以下方法表达对其赋新值的意图:

```
this.$emit('update:title', newTitle)
```
然后父组件可以监听那个事件并根据需要更新一个本地的数据 `property`。例如：
```
<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
></text-document>
```
为了方便起见，我们为这种模式提供一个缩写，即 `.sync` 修饰符：
`<text-document v-bind:title.sync="doc.title"></text-document>`

- 注意带有 `.sync` 修饰符的 `v-bind` 不能和表达式一起使用 (例如 `v-bind:title.sync=”doc.title + ‘!’”` 是无效的)。取而代之的是，你只能提供你想要绑定的 `property` 名，类似 `v-model`。

当我们用一个对象同时设置多个 `prop` 的时候，也可以将这个 `.sync` 修饰符和 `v-bind` 配合使用：

`<text-document v-bind.sync="doc"></text-document>`
这样会把 `doc` 对象中的每一个 `property` (如 `title`) 都作为一个独立的 `prop` 传进去，然后各自添加用于更新的 `v-on` 监听器。

将 v-bind`.sync` 用在一个字面量的对象上，例如 `v-bind.sync=”{ title: doc.title }”`，是无法正常工作的，因为在解析一个像这样的复杂表达式的时候，有很多边缘情况需要考虑。


<hr />








### 相关链接 
<hr />

作者：counterxing 

[链接](https://www.zhihu.com/question/315844790/answer/637000219)

作者：小黎也

[链接](https://juejin.cn/post/6844904089956925454)

作者：尤雨溪

链接：https://www.zhihu.com/question/31809713/answer/53544875

作者：Deno

链接：https://juejin.cn/post/6844904185352159239

作者：有蝉

链接：https://juejin.cn/post/6966418770768166919



