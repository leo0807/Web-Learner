# Vuetify

## Vuetify 组件中常见的 `v-slot:activator="{ on, attrs }"`是什么意思？
<hr />

[参考链接](https://blog.csdn.net/weixin_44710964/article/details/107428727)

```
<v-meun>
  <template v-slot:activator="{on, attrs}">
    <v-btn v-bind="attrs" v-on="on">
  </template>
</v-menu>
```
1. 首先这个 `template` 是 `v-menu` 的插槽。`v-slot:activator` 是具名插槽的新写法，旧写法 `slot="activator"` 在 `vue 2.6.0` 起被废弃了
2. 作用域插槽
一般在父组件中引入了子组件，然后又在子组件中插入了插槽，如果插槽中引入了属性，例如：
