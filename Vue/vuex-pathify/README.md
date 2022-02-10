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


### Debug


## Path Syntax 语法
<hr />

`Pathify` 提供了丰富的路径语法来访问 `Vuex` 的存储器，包括：

- 模块、属性和子属性访问
  1. 属性访问 （property access） 
    - `get('items')` 通过简单地引用状态名称来访问属性：// => state.items
  2. 模块访问 （module）
    - 通过提供模块的完整路径来访问模块。如果上面的例子在一个叫做 products 的模块中，它会被这样访问：
    - `get('products/items')`
  3. 子属性访问（Sub-property）
    - 子属性的访问需要使用`@`符号，这允许用户能够在任意层次访问这些子元素
    - 第一层属性访问 `get('filters@search')` 
    - 对于嵌套属性，使用`.`进行访问 `get('filters@sort.key')`
    - 访问数组属性，使用`.`或者`[]`符号
      ```
      get('items@0')
      get('items@[0].name')
      ```
    - 为了更加透明的方式写入`sub-properties`，使用`make.mutations()`辅助函数或者`Payload`类
      - `set('filters@search', 'blue')`
- 子属性访问
  - `Payload`类

  - 当路径表达式包含子属性访问时，`Payload` 类从 `Pathify` 的访问器助手传递给`mutation`函数。 该类传达子属性路径和值，以及封装 update() 功能，并检查写入甚至创建子属性的权限。

  - 如前所述， `make.mutations()` 会自动处理所有子属性的写入，但如果你需要自己完成写入，以下是一个手动创建`mutation`函数的示例以及如何处理传递 `Payload`：

  ```
  // store
  import { Payload } from 'vuex-pathify';
  import _ from 'lodash';

  const state = {
    sort: {
      key: 'id',
      order: 'asc'
    }
  }

  const mutations = {
    // 手动创建 sort 突变器
    SET_SORT: (state, payload) => {
      // debug
      console.log('payload', payload);

      // 如果我们已经有了一个 Payload， 我们可以用它来做一些事情
      if(payload instanceof Payload) {
        
        // 或者，可以使用Payload进行更新
        state.sort = payload.update(state.sort);

        // 或者，使用点符号 path
        _.set(state.sort, payload.path, payload.value);
      }

      // 否则，正常处理
      else {
        state.sort = payload;
      }
    }
  }

  // global
  store.set('sort@order', 'desc');
  ```
- Errors
如果提供的路径没有映射到属性(property)，`Pathify` 会通知您：

```
// would map to `mutations.SET_FOO` or `actions.setFoo`
store.set('foo', false)
```

```
[Vuex Pathify] Unable to map path 'foo':
    - Did not find action 'setFoo' or mutation 'SET_FOO' on store
    - Use path 'foo!' to target store member direct
```


- 变量扩展
  1. 变量 `:notation` 允许您使用组件属性来动态构建引用以存储属性。
  2. 它们只能在`组件辅助器`中使用，但可以引用`store`属性或子属性：
  ```
  // d动态的引用 property 或 sub-property  
  get('projects/:slug') 
  get('projects@:slug') 

  // 使用对象和数组表示法使用多个变量动态的同步深度嵌套的属性
  sync('clients/:name@project[:index].name')
  ```
  3. 需要注意以下这些警告：
    - 只有`top-level`属性可以用作变量名，即 `:index` 而不是 `:options.index`
    - 获取时，只会引用`state`； `getter` 将被忽略
    - 设置时，只会引用`mutations`； `actions`将被忽略
    - 您可以对数组使用数组 [:index] 或点 .index 表示法
    ```
    // generate getters for `items`, `search` and `filters`
    computed: {
      ...get('products/*') 
    },

    // generate methods that dispatch `load` and `update`
    methods: {
      ...call('products/*') 
    }
    ```
- 通配符扩展
  1. 通配符 `*` 允许您一次引用多个属性，并且仅在组件中使用：
  2. 它们不像其他路径引用(path reference)那样返回值，而是为它们扩展到的所有属性生成命名函数的哈希：


此外，还有一些额外的直接语法 (direct syntaxes)，用于处理围非 `get/set` 命名的自定义：

- 直接访问 (直接访问)
  - 直接访问语法使用 `bang!` 跳过映射并直接访问 `Vuex` 成员： `set('update!', items)`，其它例子如下，
  1. 
  ```
  // 直接调用INCREMENT_VALUE Mutation
  setset('INCREMENT_VALUE!');

  // call the `update()` action, rather than `setItems()`
  set('update!', data);
  ```
  2. Vuex别名
  如果想要在设置数据时完全跳过 `Pathify`，可以使用 `Vuex` 别名。
  这些是 `Vuex` 自己的方法，但已经绑定到你项目的`store`，并且为了方便，可以从 `Pathify` 导入：

  ```
  // import 
  import { commit, dispatch } from 'vuex-pathify'

  // mutations
  commit('INCREMENT_VALUE')

  // actions
  dispatch('update', data)
  ```

  3. 直接访问Vuex
  ```
  // get value
  const items = this.$store.state.items

  // set value
  this.$store.dispatch('update', data)
  ```
- 直接同步
  - 直接同步语法使用管道 `|` 在组件辅助器中指定可替换的 `get` 和 `set` 成员：
  ```
  // sync(path: string)
  computed: {
    items: sync('items|update!')
  }
  ```

## Store accessors
<hr />

### API
- get(path: string): *
  - `get`方法读取在`getters`和`state`中的值
  ```
  // 'loading'
  store.get('status')
  // 'asc'
  store.get('filters@sort.order')
  ```
- 如果路径引用存储 `getter` 函数，请根据需要传递其他参数：
  `const bags = store.get('filterBy', 'category', 'bag')`
- set(path: string, value: *): *
  - `set`方法通过`actions`或者`mutations`写入值
  1. `store.set('status', 'error')`
  2. `store.set('filters@sort.order', 'desc')`
  3. 注意， `set()` 返回操作的结果，所以他可以链式使用：
    ```
    store
      .set('items', data)
      .then(console.log)
    ```
- copy(path: string): *
  - `copy`方法克隆并返回一个在`store`中非响应式的复制的值
  ```
  // { key: "id", order: "asc" } 
  copy('sort')
  ```
