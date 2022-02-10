# vuex-pathify
[Github Link](davestewart.github.io/vuex-pathif…)

## Demo
<hr />

1. 配置`vuex-pathify.js`
```
import pathify from 'vuex-pathify';

<!-- 配置项 -->
pathify.options.mapping = 'simple';
pathify.options.strict = true
;
export default pathify;
```
2. 在`store.js`·导入该配置文件
```
// Vue
import Vue from 'vue';
import Vuex from 'vuex';
import pathfiy './vuex-pathify.js';

<!-- Modules -->a
Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [
    pathify.plugin, // 配置pathfiy插件
  ]
});

export default store;
```
3. 存取
```
<!-- 取 get -->
import { get } from 'vuex-pathify';
import store from './store';

computed: {
  demo: get('demo'),
},

<!-- 存 set -->
store.set('a', val); // 设置根属性的值
store.set('a/b', val); // 设置块属性的值
store.set('a/b@c', val) // 设置块根属性的子属性的值

<!-- 存 + 取 -->
 value: sync('module/object@value'),
 c: sync('module/object@a.b.c'),
 ...sync('module', [ // 数组模式
    'value',
    'str'
 ]),
 ...sync('module', { // 对象模式,别名模式
    altValue: 'value',
    altStr: 'str'
 })
```

### Setup
<hr />

```
// packages
import Vue from 'vue';
import Vuex from 'vuex';
import pathify from 'vuex-pathify';

// store definition
const store = {
  // state, members, modules, etc
}

// store
Vue.use(Vuex);
export default new Vuex.store({
  plugins: [pathify.plugin], // 激活pathify插件
  ...store
})
```

`vuex-pathify`的作用是为了简化 vuex 的开发体验。

## 配置
<hr />

### mapping
- Type: String | Function
- Default: "standard"
mapping选项来决定pathify如何映射pathfiy操作到vuex的store成员。你可以选择多个公共的预设，也可以自己提供一个自定的函数。

- 预设 [Presets](https://davestewart.github.io/vuex-pathify/#/setup/mapping)
 默认是为 `standard`，如果转为`simple`，则可以`pathify.options.mapping = 'simple'`
- 自定义， 如
  
  ```
  function (type, name, formatters) {
    switch(type) {
      case 'mutations':
        return formatters.const('set', name) // SET_FOO
      case 'actions':
        return formatters.camel('set', name) // setFoo
      case 'getters':
        return formatters.camel('get', name) // getFoo
    }
    return name // foo
  }
  ```
  1. 该函数必须返回一个正确引用存储成员的字符串。
  2. 该函数被以下参数所调用
      - type { string }: 成员类型，如`state`, `getters`, `mutations`或`actions`
      - name { string }: 目标属性的名称， 如`foo`
      - formatters { object }: 常用格式化函数的散列，如`camel`, `snake`, `const`
  配置完成之后，你可以进行如下对Pathify赋值
    
    ```
    pathify.options.mapping = function (type, name, formatters) {
      // your custom mapping
    }
    ```
  3. Formatters
    - `camel` - format as `camelCase`
    - `snake` - format as `snake_case`
    - `const` - format as `CONST_CASE`
    - 也可以使用像`lodash`中的内置`formatters`
  E.g., `formatters.const('set', 'items') // SET_ITEMS`
### deep
- Type: Number
- Default: 1
`deep` 选项允许对 `Object` 类型的存储成员进行子属性读/写甚至创建：
`store.set('sort@order', 'asc'`)
- 0 - 禁止访问子属性
- 1 - 启用对现有子属性的访问
- 2 - 允许创建新的子属性
- 如果启用子属性创建，则可以通过 `store.set()` 和 `sync()` 即时创建新的子属性。

- 尝试在未经许可的情况下访问或创建子属性将失败，并会在开发过程中产生控制台错误。

### strict
- Type: Boolean
- Default: true
- 如果尝试访问不存在的属性，`strict` 选项会导致抛出错误。

### cache
- Type: Boolean
- Default: true
- 缓存选项可以缓存映射结果，从而在访问路径或重新创建计算属性时进行更快的查找。
- 禁用缓存对性能的影响可以忽略不计。


## Debug
<hr />