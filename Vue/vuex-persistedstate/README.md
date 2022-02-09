# vuex-persistedstate

相关参考: 
- [更高效的 vuex 状态缓存方式-createPersistedState](https://juejin.cn/post/6869312828587638798
)
- [vuex 状态持久化，vuex-persistedstate](https://segmentfault.com/a/1190000022393039)
- [Github](https://github.com/robinvdvleuten/vuex-persistedstate)

## 作用和原理
在使用 `vue` 开发项目的时候，经常会利用 `vuex` 来进行全局的状态管理从而达到实现数据全局共享的目的，但是使用 `vuex` 有一个缺点就是在页面刷新之后数据会消失从而使页面展示异常或者请求接口报错，比如用户在登录成功后，我们会从后台拿到用户的 `token`，或者 `uid` 等信息，因为大部分的接口都需要用户的 `token` 传给后台来进行鉴权处理，因为用户刷新页面是不可控的因素，这个时候我们就要结合本地存储来保证数据的存储。

`vuex-persistedstate` 使用浏览器的本地存储（ `local storage` ）对状态（ `state` ）进行持久化。这意味着刷新页面或关闭标签页都不会删除你的数据。
 
## 使用方法
在 `store` 文件夹的 `index.js` 引入

`import createPersistedState' from 'vuex-persistedstate'`

初始化`vuex`加入插件

```
const store = new Vuex.store({
  modules: {
    user,
    groupBuying,
    clearance
  },
  getters,
  plugins: [createPersistedState()]
})
```
默认使用`localStorage`的存储方式，如果因为需求需要改为`sessionStorage`可以进行对应修改：
```
plugins: [createPersistedStae(
  {
    storage: window.sessionStorage
  }
)]
```

### 在`NuxtJS`中使用

```
// nuxt.config.js

/*
- Naming your plugin 'xxx.client.js' will make it execute only on the client-side.
- https://nuxtjs.org/guide/plugins/#name-conventional-plugin
*/
...
plugins: [
  {
    src: '~/plugins/persistedState.client.js'
  }
]
...

// ~/plugins/persistedState.client.js

import createPersistedState from 'vuex-persistedstate';

export default ({store}) => {
  createPersistedState({
    key: 'yourkey',
    paths: [...],
    ...
  })(store)
}
```
### 使用存储到cookie的配置
因为使用 `cookie` 来操作数据并不是和 `localStorage` 一样来使用 `getItem`、`setItem`、`removeItem` 方法来操作数据，所以我们要进行对应的方法配置如下：

```
import { Store } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import * as Cookies from 'jks-cookie';

const store = new Store({
  // ...
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => Cookies.get(key),
        setItem: (key,value) => Cookies.set(key, value, { expires: 3, secure: true }),
        removeItem: (key) => Cookies.remove(key)
      }
    })
  ]
});
```
因为这里对 `storage` 进行了$重写补充$，所以如果需要使用本地存储但需要保护数据的内容，则可以对其进行加密。
```
import { Store } from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });
// secure-ls 通过高级别的加密和数据压缩来保护localStorage数据
const store = new Store({
  // ...
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key)
      }
    })
  ]
})
```
### 缓存 Vuex 多个模块下的指定某个模块的 state，通过修改 path 配置来实现
<hr />

```
// user-module
export const user = {
  state: {
    token: '',
    role: ''
  }
}

// profile-module
export const profile = {
  state: {
    name: '',
    company: ''
  }
}

// modules目录下的index.js
import user from './user';
import profile from './profile';
export default {
  user,
  profile
}

// store.js
import modules from './modules'
let store = new Vuex.Store){
  modules,
  plugins: [
    createPersistedState({
      key: "zdao",
      paths: [
        'user' //这里便只会缓存user下的state值
      ]
    })
  ]
}
```

### 缓存 state 下指定的部分数据,配置如下
<hr />

```
const state = () => {
  return {
    token: '',
    uid: ''
  }
}

import createPersistedState from "vuex-persistedstate"
const store = new Vuex.Store({
  // ...
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer(val) {
        return {
          // 只储存state中的token，而不缓存uid
          token: val.token
        }
      }
    })
  ]
})
```
如果 `path` 和 `reducer` 同时存在则使用 `reducer`, 忽悠 `paths` 属性

```
plugins: [
  createPersistedState({
    storage: window.sessionStorage,
    paths: ['user'],
    reducer(val){
      // { user: {token: '123', uid: '456'}, profile: {name: 'zdao', company: '上海合合信息股份有限公司'}}
      console.log(val);
      return {
        company: val.profile.company
      }
    }
  })
]
```

### 使用 filter 属性可以过滤掉不同的 mutation 提交造成不想要的数据更新缓存。
<hr />

我们同时由 `setUserA` 和 `setUserB` 来更改 `token` 的状态，但是我们在触发 `setUserB` 时候的修改不要影响到所存储的 `token` 值，我们就可以设置 `filter` 来过滤 `mutation`

```
/* user-module */
const mutations = {
  setUserA (state, data) {
    state.token = data.token
  },
  setUserB (state, data) {
    state.token = data.token
  }
}
/* store.js */
plugins: [
    createPersistedState({
      key: 'zdao',
      paths: ['user'],
      filter: (mutation) => {
        console.log(mutation)
        /*  mutation
        {
          payload: { token: "5491CC8FBB36408C9R7167yY"}
          type: "user/setUserA"
        }
        */
        // 这个时候触发setUserB则不会触发影响缓存的值
        return mutation.type.indexOf('user/setUserA') !== -1
      }
    })
  ]
```

### API
<hr />

- `key`: 存储数据的键名；（默认为vue）
- `paths`： 部分路径可部分保留状态的数组。如果没有给出路径，则将保留全部状态。如果给出一个空数组，则不会保留任何状态。必须使用点符号指定路径。如果使用模块，则包括模块名称， 如`auth.user`（默认：[]）
- `reducer`： 将根据给定路径调用，以减少状态持久化的函数；
- `storage`： 指定存储数据的方式。默认为`localStorage`，也可以设置 `sessionStorage`或`cookie`等；
- `getState`： 用来重新补充先前持久状态的功能，默认使用：`storage` 定义获取的方式；
- `setState`： 用以保持给定状态的函数。默认使用：`storage` 定义的设置值方式
- `filter`：一个将被调用以过滤 setState 最终将在存储中筛选过滤的函数。默认为() => true。
- `overwrite <Boolean>`: When rehydrating, whether to overwrite the existing state with the output from getState directly, instead of merging the two objects with deepmerge. Defaults to false.

- `arrayMerger <Function>`: A function for merging arrays when rehydrating state. Defaults to function (store, saved) { return saved } (saved state replaces supplied state).

- `rehydrated <Function>`: A function that will be called when the rehydration is finished. Useful when you are using Nuxt.js, which the rehydration of the persisted state happens asynchronously. Defaults to store => {}

- `fetchBeforeUse <Boolean>`: 布尔值，默认为`false`。用来表明在`plugin`被使用之前，是否要先从`storage`中获取状态`state`;
- `assertStorage <Function>`：确保存储可用的可覆盖函数，在插件初始化时触发。默认是在给定的存储实例(`Storage`)上执行写入删除操作。 请注意，默认行为可能会引发错误（如 `DOMException: QuotaExceededError`）。

