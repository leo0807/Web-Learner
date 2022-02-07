# TypeScript Guide
## Props Definition 属性定义
Vue 类组件没有为 props 定义提供专门的 API。但是，您可以通过使用规范的 Vue.extend API 来做到这一点：

```
<template>
  <div>{{ message }}</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

// Define the props by using Vue's canonical way.
const GreetingProps = Vue.extend({
  props: {
    name: String
  }
})

// Use defined props by extending GreetingProps.
@Component
export default class Greeting extends GreetingProps {
  get message(): string {
    // this.name will be typed
    return 'Hello, ' + this.name
  }
}
</script>
```
由于 `Vue.extend` 推断已定义的 `prop` 类型，因此可以通过扩展在您的类组件中使用它们。

如果你有Super类组件或要扩展的 `mixins`，请使用 `mixins helper` 将已定义的 `props` 与它们结合起来：

```
<template>
  <div>{{ message }}</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import Super from './super'

// Define the props by using Vue's canonical way.
const GreetingProps = Vue.extend({
  props: {
    name: String
  }
})

// Use `mixins` helper to combine defined props and a mixin.
@Component
export default class Greeting extends mixins(GreetingProps, Super) {
  get message(): string {
    // this.name will be typed
    return 'Hello, ' + this.name
  }
}
</script>
```

## Property Type Declaration 属性类型声明
在一些情况下，你必须要在类组件的外部来定义组件的属性和方法。举例来说，`Vuex`，官方提供的状态管理工具，提供了`mapGetters`和`mapActions`帮助映射存储器到组件的属性和方法。这些辅助工具需要在一个组件选项的对象使用。

即使在这种情况下，您也可以将组件选项传递给 @Component 装饰器的参数。 但是，当它们在运行时工作时，它不会在类型级别上自动声明属性和方法。

您需要在类组件中手动声明它们的类型：
```
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapGetters, mapActions } from 'vuex';

// post的接口（interface）
@Component({
  computed: mapGetters([
    'posts'
  ]),

  methods: mapActions([
    'fetchPosts'
  ])
})

export default class Posts extends Vue {
  // 在type的层级声明映射的getters和action
  // 你或许需要在属性名称的后面添加 '!'来避免汇编错误（明确的赋值断言）

  // 键入映射的post的getter
  posts!: Post[]

  // 键入映射的 fetchPosts 的 action
  fetchPosts!: () => Promise<void>

  mounted() {
    // 使用映射（mapped）的getter和action
    this.fetchPosts().then(()=>{
      console.log(this.posts);
    });
  }
}

```

## \$refs Type Extension
组件的 `\$refs` 类型被声明为处理所有可能类型的 `ref` 的最广泛类型。 虽然理论上是正确的，但在大多数情况下，每个 `ref` 实际上只有一个特定的元素或组件。

您可以通过覆盖类组件中的 `\$refs` 类型来指定特定的 `ref` 类型：

```
<template>
  <input ref="input">
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class InputFocus extends Vue {
  // annotate refs type.
  // The symbol `!` (definite assignment assertion)
  // is needed to get rid of compilation error.
  $refs!: {
    input: HTMLInputElement
  }

  mounted() {
    // Use `input` ref without type cast.
    this.$refs.input.focus()
  }
}
</script>
```
您可以在没有类型转换的情况下访问输入类型，因为在上面的示例中，在类组件上指定了 `\$refs.input` 类型。

## Hooks Auto-complete
vue class component 为TypeScript提供了可以自动完成`data`，`render`和其他生命周期hooks类组件声明的内置的hooks类型。要启用它，您需要导入位于 vue-class-component/hooks 的钩子类型。

```
// main.ts
import 'vue-class-component/hooks' // import hooks type to enable auto-complete
import Vue from 'vue'
import App from './App.vue'

new Vue({
  render: h => h(App)
}).$mount('#app')
```
If you want to make it work with custom hooks, you can manually add it by yourself:
如果你想要使它能够和自定义hooks工作，你可以通过手动添加它自己的方式来实现：
```
import Vue from 'vue'
import { Route, RawLocation } from 'vue-router'

declare module 'vue/types/vue' {
  // Augment component instance type
  interface Vue {
    beforeRouteEnter?(
      to: Route,
      from: Route,
      next: (to?: RawLocation | false | ((vm: Vue) => void)) => void
    ): void

    beforeRouteLeave?(
      to: Route,
      from: Route,
      next: (to?: RawLocation | false | ((vm: Vue) => void)) => void
    ): void

    beforeRouteUpdate?(
      to: Route,
      from: Route,
      next: (to?: RawLocation | false | ((vm: Vue) => void)) => void
    ): void
  }
}
```

## Annotate Component Type in Decorator 在装饰器中注释组件类型
在某些情况下，你想要`@Component`装饰器参数重的函数中使用你的组件类型。
如，需要访问监视处理程序中的组件方法
```
@Component({
  watch: {
    postId(id: string) {
      // 当id改变的时候，获取post的数据
      // To fetch post data when the id is changed.
      this.fetchPost(id) 
      // 属性 'fetchPost' 不存在Vue的type中
      // -> Property 'fetchPost' does not exist on type 'Vue'.
    }
  }
})
class Post extends Vue {
  postId: string

  fetchPost(postId: string): Promise<void> {
    // ...
  }
}
```
上述代码会产生一个`type error`，这个错误表示`fetchPost`不存在`this`的这个监视处理程序。这是因为在`@Component`装饰器参数的`this`的类型是`Vue`的基本类型。此时的`this`指向了`Vue`而不是`Post`。
为了能够使用你自己的组件类型（Post），你可以通过它的类型函数注释这个装饰器。

```
// Annotate the decorator with the component type 'Post' so that `this` type in
// the decorator argument becomes 'Post'.
@Component<Post>({
  watch: {
    postId(id: string) {
      this.fetchPost(id) // -> No errors
    }
  }
})
class Post extends Vue {
  postId: string

  fetchPost(postId: string): Promise<void> {
    // ...
  }
}
```