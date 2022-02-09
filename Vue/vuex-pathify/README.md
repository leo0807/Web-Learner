# vuex-pathify
[Github Link](davestewart.github.io/vuex-pathif…)

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
### mapping
### mapping
### mapping