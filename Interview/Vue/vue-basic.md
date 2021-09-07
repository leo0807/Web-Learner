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


