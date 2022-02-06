# Vue

## Vue的理念
1. 响应式
2. 组件化 允许我们使用小型、独立和通常可复用的组件构建大型应用
 
- **v-once**可以一次性绑定数据
- 双大括号会将数据解释为普通文本，需要输出真的HTML时候，可以指定命令**v-html**
- HTML中的动态属性可以使用中括号解决**[]**
    - e.g. ```<a v-bind:[attributeName]="url">sss</a>```
- 在 DOM 中使用模板时 (直接在一个 HTML 文件里撰写模板)，还需要避免使用大写字符来命名键名，因为浏览器会把 attribute 名全部强制转为小写
- computed 计算属性；
    - 用于缓存数据，当data中存储过长的列表或嵌套过深的对象，使用computed属性更能节省内存
    - 默认为调用getter方法，也可以通过设置setter方法手动更改computed中缓存数据
    - computed中的缓存的数据不会被自动修改，属于静态的
## v-show,v-if,v-for
- v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好；
- v-show 只是简单地切换元素的 CSS property display。
- 当 v-if 与 v-for 一起使用时，v-if 具有比 v-for 更高的优先级，这意味着 v-if 将没有权限访问 v-for 里的变量：
```
<!-- This will throw an error because property "todo" is not defined on instance. -->

<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>

```
- 在自定义组件上，你可以像在任何普通元素上一样使用 v-for：
```
    <my-component v-for="item in items" :key="item.id"></my-component>
```
然而，任何数据都不会被自动传递到组件里，因为组件有自己独立的作用域。为了把迭代数据传递到组件里，我们要使用 props：
```
<my-component
v-for="(item, index) in items"
:item="item"
:index="index"
:key="item.id"
> </my-component>
```
不自动将 item 注入到组件里的原因是，这会使得组件与 v-for 的运作紧密耦合。明确组件数据的来源能够使组件在其他场合重复使用。


## Vue 传值方式
- [属性传值](#1.1)
- [$refs](#1.2)
- [$parent](#1.3)
- [通知传值（广播传值）](#1.4)
- [本地传值](#1.5)
- [路由传值](#1.6)

<h3 id="1.1">属性传值</h3>

- 可传值类型
    - 固定值
    - 绑定属性
    - 方法
    - 本类对象
- 操作步骤
    1. 父组件调用子组件的时候，绑定动态属性 <children> mess="父组件给子组件传值"></children>
    2. 在子组件里边通过 props,接收父组件传过来的值
- 适用场景
    - 只适用于父子传值的场景
- 属性介绍
    - 组件属性定义：
    ```
    props:["mess","bindMsg","run","fatherThis"]
    ```
    - 子组件验证也可传入参数的合法性：
    ``` 
    props:{
    'mess':String,
    'bindMsg':[String, Number],
    'run':Function,
    'fatherThis':Object,
    }
    ```
<h3 id="1.2">$refs</h3>

- 可获取类型
    1. 子组件属性
    2. 子组件方法
- 操作步骤
    1.  调用子组件的时候调用一个ref
    ```<v-fgsheader ref="header"></v-fgsheader>```
    2. 在父组件中通过下列方法调用
    ```
    this.\$refs.header.属性
    this.\$refs.header.方法
    ```
- 适用场景
    - 子组件给父组件传值
<h3 id="1.3">子组件获取父组件数据</h3>

子组件通过\$parent 获取父组件的数据和方法，这种传值方式实际上类似于上边的属性传值中父组件给子组件的传递了子类对象 this,只不过 Vue 官方给封装好了。

- 可获取类型
  1. 父组件属性
  2. 父组件方法
- 操作步骤
    - 直接在子组件中使用```$this.$parent.XX```
- 适用场景
    - 父组件给子组件传值
- 示例代码
子组件
```
getFatherProp(){
alert(this.$parent.fatherMsg); 
},
getFatherMethod(){
    this.$parent.fatherRun();
}
``` 
<h3 id="1.4">通知传值(广播传值)
</h3>

- 可传值类型
Vue 官网只写了[...args]，故通知/广播传值我们定为只传基本数据类型，不能传方法。
- 操作步骤
    1. 新建一个 js 文件 然后引入 vue 实例化 vue 最后暴露这个实例
    2. 在要广播的地方引入刚才定义的实例
    3. 通过 VueEmit.\$emit('名称','数据')传播数据
    4. 在接收收数据的地方通过 $on接收广播的数据
VueEmit.$on('名称',function(){})
- 适用场景
适用于父子组件、兄弟组件间进行传值。
- 示例代码
vueEvent.js

```
import Vue from 'vue'
var vueEvents = new Vue();
export default vueEvents;
```
兄弟组件 C(广播者)
```
import vueEvents from '../Model/vueEvent.js'
sendEmit(){
var numbery = (Math.random()+300).toFixed(3);
vueEvents.\$emit('notifyToNew',this.homeMsg+numbery);
}
```
兄弟组件 D(接收者)
```
import vueEvents from '../Model/vueEvent.js'
mounted(){
    var _this = this;
    vueEvents.$on("notifyToNew",function(data_P){
        //注意 this 的作用域
        console.log('广播传过来的值是'+data_P);
        this.receive = data_P;
    })
}
```
<a href="https://blog.csdn.net/qq_35430000/article/details/79291287">来源</a>
1. EventBus 实例 定义一个新的 vue 实例专门用于传递数据，并导出
<img src="https://img-blog.csdn.net/20180208173246139"/>
定义传递的方法名和传输内容，点击事件或钩子函数触发 eventBus.emit 事件
<img src="https://img-blog.csdn.net/20180208173342778"/>
接收传递过来的数据
注意：enentBus 是一个另一个新的 Vue 实例，区分两个 this 所代表得 vue 实例
<img src="https://img-blog.csdn.net/20180209091940133?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMzU0MzAwMDA=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"/>
- EventBus.\$off('aMsg', {}) 移除

- EventBus 的优缺点
    - 缺点
        1. 大家都知道 vue 是单页应用，如果你在某一个页面刷新了之后，与之相关的 EventBus 会被移除，这样就导致业务走不下去。
        2. 如果业务有反复操作的页面，EventBus 在监听的时候就会触发很多次，也是一个非常大的隐患。这时候我们就需要好好处理 EventBus 在项目中的关系。通常会用到，在 vue 页面销毁时，同时移除 EventBus 事件监听。
        3. 由于是都使用一个 Vue 实例，所以容易出现重复触发的情景，两个页面都定义了同一个事件名，并且没有用\$off 销毁（常出现在路由切换时）。
    - 优点
        1. 解决了多层组件之间繁琐的事件传播。
        2. 使用原理十分简单，代码量少。




<h3 id="1.5">本地传值</h3>

本地传值方式对于 Vue 而言有两种，一种是 JS 的 localStorage，另一种 Vuex。
- 可传值类型
    - localStorage： String(可通过 JSON 进行 json 数据与 String 之间的转化)
    - Vuex:方法、数据、异步方法
- 操作步骤
    1. localStorage
    - 存:
    ```
    localStorage.setItem('tolist',JSON.stringify(this.tolist));
    ```
    - 取：
    ```
    var tolist = JSON.parse(localStorage.getItem('tolist'));
    ```
    2. Vuex


<h3 id="1.6">路由传值</h3>

- 动态路由传值 (路径传递参数会拼接在 URL 路径后
)
    1. 配置动态路由
    ```
    routes: [
        {path: '/user/:id', conponent: User}
    ]
    ```
    2. 传值
        - 第一种写法： ```<router-link :to="'/user/'+item.id">传值</router-link>```
        - 第二种写法：
        ```
        goToUser(id){
            this.$router.push({path:'/user/'+id});
        }
        ```   
    3. 在对应页面取得值 ```this.$router.params //结果{id : 123}```
- Get传值（类似HTMLGet传值）
    1. 配置动态路由
    ```
    routes: [
        {path: '/user/:id', component: User}
    ]
    ```
    2. 传值
        - 第一种写法： ```<router-link :to="'/user/?id='+item.id">传值</router-link>```
        - 第二种写法：
        ```
        goToUser(id){
            this.$router.push({path:'/user/'+query:{ID:id}});
        }
        ```
    3. 在对应页面取得值 ```this.$router.params //结果{id : 123}```
- 命名路由 push 传值
    1. 配置动态路由
    ```
    routes: [
        {path:'/user',name: 'User',component:User},
    ]
    ```
    2. 传值
        - 第一种写法： ```<router-link :to="'/user/?id='+item.id">传值</router-link>```
        - 第二种写法：
        ```
        goToUser(id){
            this.$router.push({name: 'User', params: {ID: id}});
        }
        ```
    3. 在对应页面取得值 ```this.$router.params //结果{id : 123}```

<h3 id="1.7">Inject/Provide</h3>

- $inject$ 选项应该是： 一个字符串数组，或 一个对象，对象的 key 是本地的绑定名，value 是： 在可用的注入内容中搜索用的 key (字符串或 Symbol)，或 一个对象，该对象的： from 属性是在可用的注入内容中搜索用的 key (字符串或 Symbol) default 属性是降级情况下使用的 value

- $provider/inject$：简单的来说就是在父组件中通过 $provider$来提供变量，然后在子组件中通过$inject$来注入变量。
- 这种方式可以避免在使用$props$传值时，必须将每一个属性都传递给子组件的写法，当使用的公共组件不确定会被传递什么值的时候，使用这种写法非常方便。

- 父组件示例
```
<template>
    <div>
        <childCom></childCom>
    </div>
</template>
<script>
    import childCom from '../component/childCom'
    export default {
        name: "Parent",
        provide: {
            msg: "demo"
        },
        component: {
            childCom
        }
    }
</script>
```
- 子组件示例，不管潜逃多少层，都能请求到父组件中注册的变量
```
<template>
    <div>
        {{msg}}
    </div>
</template>
<script>
    export default {
        name: "childCom",
        inject: ['msg'] //子孙组件中使用inject接收注册变量
    }
</script>
```
- 优缺点
- 优点
    - 不用像 props 一层层传递，可以跨层级传递。
- 缺点
    - 用这种方式传递的属性是非响应式的，所以尽可能来传递一些静态属性。
    - 引用官网的话是它将你的应用以目前的组件组织方式耦合了起来，使重构变得更加困难。，我对这句话的理解是用了 provide/inject 你就要遵循它的组件组织方式，在项目的重构时如果要破坏这个组织方式会有额外的开发成本，其实 event-bus 也有这个问题。

- 使用Vue.observable 响应式优化<a src="https://blog.csdn.net/xiasohuai/article/details/98887189
">来源</a>

## 在属于 Vuex 的 state 上使用 v-model
```<input v-model="obj.message">```
假设这里的 obj 是在计算属性中返回的一个属于 Vuex store 的对象，在用户输入时，v-model 会试图直接修改 obj.message。在严格模式中，由于这个修改不是在 mutation handler 中执行的, 这里会抛出一个错误。

用『Vuex 的思维』去解决这个问题的方法是：给 <input> 中绑定 value，然后侦听 input 或者 change 事件，在事件回调中调用 action:
```<input :value="obj.message" @input="updateMessage">```
```
// ...
methods: {
  updateMessage: function (e) {
    vuex.actions.updateMessage(e.target.value)
  }
}
```
我们假设 updateMessage action 会 ```dispatch 'UPDATE_MESSAGE'```, 下面是 ```mutation handler```:
```
// ...
mutations: {
  UPDATE_MESSAGE (state, message) {
    state.obj.message = message
  }
}
```
必须承认，这样做比简单地使用 ```v-model``` 要啰嗦得多，但这换来的是 ```state``` 的改变更加清晰和可被跟踪。另一方面，Vuex 并不强制要求所有的状态都必须放在 Vuex store 中 —— 如果有些状态你觉得并没有需要对其变化进行追踪，那么你完全可以把它放在 ```Vuex``` 外面（比如作为组件的本地状态），这样就可以愉快地使用 ```v-model``` 了。


此外，如果仍然希望使用 ```Vuex``` 管理跟踪状态，并愉快地使用 ```v-model```，还可以在组件中使用带 ```setter``` 的计算属性，这样，你就可以使用诸如 ```lazy```、```number``` 和 ```debounce``` 这样的参数特性了。
```<input v-model="thisMessage">```
```
// ...
vuex: {
  getters: {
    message: state => state.obj.message
  },
  actions: {
    updateMessage: ({ dispatch }, value) => {
      dispatch('UPDATE_MESSAGE', value)
    }
  }
},
computed: {
  thisMessage: {
    get () {
      return this.message
    },
    set (val) {
      this.updateMessage(val)
    }
  }
}
```


## Proxy 和 Object.defineProperty区别和使用

### Object.defineProperty
- 全局变量 Date 不可修改，为了安全性考虑
```
Object.defineProperty(window,'Date',{
  writable:false,
  configurable:false
})
```
- Object.defineProperties
Object.defineProperties 本质上定义了 obj 对象上 props 的可枚举属性相对应的所有属性。
```
var obj = {};
Object.defineProperties(obj, {
  'property1': {
    value: true,
    writable: true
  },
  'property2': {
    value: 'Hello',
    writable: false
  }
  // etc. etc.
});
```
- Object.defineProperty 只能遍历对象属性进行劫持
```
function observe(obj) {
    if (typeof obj !== 'object' || obj == null) {
        return
    }
    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key])
    })
}
```

### Proxy
```const p = new Proxy(target, handler)```
- handler 对象的方法
handler 对象是一个容纳一批特定属性的占位符对象。它包含有 Proxy 的各个捕获器（trap）。
所有的捕捉器是可选的。如果没有定义某个捕捉器，那么就会保留源对象的默认行为。

```
handler.getPrototypeOf()
handler.setPrototypeOf()
handler.isExtensible()
handler.preventExtensions()
handler.getOwnPropertyDescriptor()
handler.defineProperty()
handler.has()//in 操作符的捕捉器。
handler.get(target, property)
handler.set(target, property, value)
handler.deleteProperty()//delete 操作符的捕捉器。
handler.ownKeys()
handler.apply()
handler.construct()//new 操作符的捕捉器。
```

- Proxy 直接可以劫持整个对象，并返回一个新对象，我们可以只操作新的对象达到响应式目的
- 基本操作
```
const handler = {
    get: function(obj, prop) {
        return prop in obj ? obj[prop] : 37;
    }
};

const p = new Proxy({}, handler);
p.a = 1;
p.b = undefined;

console.log(p.a, p.b);      // 1, undefined
console.log('c' in p, p.c); // false, 37
```
- Proxy 只代理对象外层属性
```
let obj={a:1,b:{c:2}};
let handler={
  get:function(obj,prop){
    const v = Reflect.get(obj,prop);
    return v; // 返回obj[prop]
  },
  set(obj,prop,value){
    return Reflect.set(obj,prop,value);//设置成功返回true
  }
};
let p=new Proxy(obj,handler);

p.a//会触发get方法
p.b.c//会触发get方法获取p.b，不会触发.c的set，因为c没被代理。
```
- 递归代理对象内部对象
```
let obj={a:1,b:{c:2}};
let handler={
  get:function(obj,prop){
    const v = Reflect.get(obj,prop);
    if(v !== null && typeof v === 'object'){
      return new Proxy(v,handler);//代理内层
    }else{
      return v; // 返回obj[prop]
    }
  },
  set(obj,prop,value){
    return Reflect.set(obj,prop,value);//设置成功返回true
  }
};
let p=new Proxy(obj,handler);

p.a//会触发get方法
p.b.c//会先触发get方法获取p.b，然后触发返回的新代理对象的.c的set。
```

```
function reactive(obj) {
    if (typeof obj !== 'object' && obj != null) {
        return obj
    }
    // Proxy相当于在对象外层加拦截
    const observed = new Proxy(obj, {
        get(target, key, receiver) {
            const res = Reflect.get(target, key, receiver)
            console.log(`获取${key}:${res}`)
            return res
        },
        set(target, key, value, receiver) {
            const res = Reflect.set(target, key, value, receiver)
            console.log(`设置${key}:${value}`)
            return res
        },
        deleteProperty(target, key) {
            const res = Reflect.deleteProperty(target, key)
            console.log(`删除${key}:${res}`)
            return res
        }
    })
    return observed
}
```
### 总结
1. Proxy 使用上比 Object.defineProperty 方便的多。
2. Proxy 代理整个对象，Object.defineProperty 只代理对象上的某个属性。
3. 如果对象内部要全部递归代理，则 Proxy 可以只在调用时递归，而 Object.defineProperty 需要在一开始就全部递归，Proxy 性能优于 Object.defineProperty。
4. 对象上定义新属性时，Proxy 可以监听到，Object.defineProperty 监听不到。
5. 数组新增删除修改时，Proxy 可以监听到，Object.defineProperty 监听不到。
6. Proxy 不兼容 IE，Object.defineProperty 不兼容 IE8 及以下。


### 在VUE中使用JSX

这个其实跟最开始我例举的例子很像。我在项目中用它来干掉了满屏的 v-if/v-else
由于我的业务是 pad 上的，需求是一套试卷有几十道题目，要求一屏只显示一道题目，点击下一题显示下一个题，思路也比较简单：

用一个 num 变量表示当前正在展示的题目索引
每次点击下一题按钮时 num++
用 v-if 来判断 num===1，num===2 这样来决定展示哪个。

这一写，模板里面好多啊，由于我们的题目每道题的模板可能都不一样，所以没办法循环，只能手写全部。之前考虑过用动态组件来切换，但是放弃了，因为没有 if 直观啊。
```
//父组件
  export default {
    name: "list",
    data() {
      return {
       data:'我是函数式组件',
        id:1,
         tests:{
          1:<div><span>第一道题</span></div>,
          2:<div><section>第二道题</section></div>,
          3:<div><p>第三道题</p></div>
        }
      }
    },
    methods:{
      next(){
        ++this.id
      }
    },
    render(){
      return (
       <div>
         <Item data={this.tests[this.id]} class="large"/>
         <button onClick={this.next}>下一题</button>
       </div>
      )
    }
  }
```
上面每道题目的结构都不一致

```
//子组件,只接受数据展示，用函数式组件

<script>
  export default {
  functional:true,
    name: "item",
    render(h,context){
      return (
        <div class="red" {...context.data}>
          {context.props.data}
        </div>
      )
    }
  }
</script>
```
### v-model 的缺点和解决办法
在创建类似复选框或者单选框的常见组件时，v-model 就不好用了。
```<input type="checkbox" v-model="something" />```

v-model 给我们提供好了 value 属性和 oninput 事件，但是，我们需要的不是 value 属性，而是 checked 属性，并且当你点击这个单选框的时候不会触发 oninput 事件，它只会触发 onchange 事件。
```<input type="checkbox" :checked="value" @change="change(value, \$event)"```
### 单向数据流和双向数据绑定
从上面 v-model 的分析我们可以这么理解，双向数据绑定就是在单向绑定的基础上给可输入元素（input、textare 等）添加了 change(input) 事件，来动态修改 ```model``` 和 ```view``` ，即通过触发```（$emit）```父组件的事件来修改 ```MV``` 来达到 ```MVVM``` 的效果。而 ```VUE``` 组件间传递数据是单向的，即数据总是由父组件传递到子组件，子组件在其内部可以有自己维护的数据，但它无权修改父组件传递给它的数据,子组件只能通过事件通知父组件进行数据更改，当开发者尝试这样做的时候，vue 将会报错。这样做是为了组件间更好的```解耦```，在开发中可能有多个子组件依赖于父组件的某个数据，假如子组件可以修改父组件数据的话，一个子组件变化会引发所有依赖这个数据的子组件发生变化，所以
vue 不推荐子组件修改父组件的数据，直接修改 props 会抛出警告。流程图如下：

![流程](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/10/20/3f909e038bfd8acf3c4289a3b4e288b6~tplv-t2oaga2asx-watermark.awebp)

- 单向绑定 vs 双向绑定
    单双向绑定，指的是 View 层和 Model 层之间的映射关系。
    - react 采取单向绑定，如图所示：
        ![](https://segmentfault.com/img/bVbxKEi)
        用户访问 View，用户发出交互到 Actions 中进行处理，Actions 中通过 setState 对 State 进行更新，State 更新后触发 View 更新。可以看出，View 层不能直接修改 State，必须要通过 Actions 来进行操作，这样更加清晰可控
    - vue 支持单向绑定和双向绑定
        - 单向绑定：插值形式{{data}}，v-bind 也是单向绑定
        - 双向绑定：表单的 v-model，用户对 View 层的更改会直接同步到 Model 层
        - 不用去写繁琐的 onChange 事件去处理每个表单数据的变化，但是双向绑定也会导致数据变化不透明，不清晰可控。
        - 对于非 UI 控件来说，不存在双向，只有单向。只有 UI 控件才有双向的问题。


作者：wendyq
链接：https://juejin.cn/post/6844903504834740232
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

作者：SuperMan 一路向北
链接：https://juejin.cn/post/6844903607909744654
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

作者：抽疯的稻草绳
链接：https://www.jianshu.com/p/7ced8c744477
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
