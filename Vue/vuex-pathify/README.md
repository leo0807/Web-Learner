# vuex-pathify

### Setup
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
  plugins: [pathify.plugin], // active plugin
  ...store
})
```

`vuex-pathify`的作用是为了简化 vuex 的开发体验。
