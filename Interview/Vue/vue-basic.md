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
var \_this = this;
vueEvents.\$on("notifyToNew",function(data_P){
//注意 this 的作用域
console.log('广播传过来的值是'+data_P);
\_this.receive = data_P;
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