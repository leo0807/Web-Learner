# VUE-PROPERTY-DECORATOR 
[Official Site](https://github.com/kaorun343/vue-property-decorator#Prop)

[相关参考](https://juejin.cn/post/6844903893734785032)

`vue-property-decorator`提供了多个装饰器和一个函数（Mixin）:
- @Prop
- @PropSync
- @Model
- @ModelSync
- @Watch
- @Provide
- @Inject
- @ProvideReactive
- @InjectReactive
- @Emit
- @Ref
- @Vmodeal
- @Component (由vue-class-component提供)
- Mixins（mixins的辅助函数由vue-class-component）

## @Prop
`@Prop(options: (PropOptions | Constructor[] | Constructor) = {})`
`@Prop`装饰器接收一个参数，这个参数可以有三种写法：
- `Constructor`， 如`String`，`Number`，`Boolean`等，指定`prop`的类型；
- `Constructor[]`，指定`prop`的可选类型；
- `PropOptions`，可以使用以下选项：`type`，`default`，`required`，`validator`。

例子，
```
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class YourComponent extends Vue{
  @Prop(Number) readonly propA: number | undefined
  @Prop({ default: 'default value' }) readonly propB!: string
  @Prop([String, Boolean]) readonly propC: string | boolean | undefined
}
```
上述代码相当于，
```
export default {
  props: {
    propA: {
      type: Number,
    },
    propB: {
      default: 'default value',
    },
    propC: {
      type: [String, Boolean],
    },
  },
}
```

```
import 'reflect-metadata';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class MyComponent extends Vue {
  @Prop() age!: number
}
```
每一个

## @PropSync
`@PropSync(propName: string, options: (PropOptions | Constructor[] | Constructor) = {})`

`@PropSync` 装饰器与`@prop` 用法类似，二者的区别在于：
- `@PropSync`  装饰器接收两个参数
- `propName: string`  表示父组件传递过来的属性名 
- `options: Constructor | Constructor[] | PropOptions`  与`@Prop` 的第一个参数一致
- `@PropSync` 会生成一个新的计算属性

```
import { Vue, Component, PropSync } from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
  @PropSync('name', { type: String }) syncedName!: string
}
```
相当于
```
export default {
  props: {
    name: {
      type: String,
    },
  },
  computed: {
    syncedName: {
      get() {
        return this.name
      },
      set(value) {
        this.$emit('update:name', value)
      },
    },
  },
}
```
`@PropSync` 的工作方式类似于 `@Prop`，除了它将 `propName` 作为装饰器的参数之外，它还在幕后创建了一个计算的 `getter` 和 `setter`。通过这种方式，您可以像与常规数据属性一样与属性交互，同时使其像在父组件中附加 `.sync` 修饰符一样简单。

## `@Model(event?: string, options: (PropOptions | Constructor[] | Constructor) = {})`

`@Model`装饰器允许用户在一个组件自定义`v-model`，它接收两个参数
- `event: string` 事件名称
- `options: Constructor | Constructor[] | PropOptions` 与`@Prop` 的第一个参数一致。

```
import { Vue, Component, Model } from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
  @Model('change', { type: Boolean }) readonly checked!: boolean
}
```
等同于
```
export default {
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: {
      type: Boolean,
    },
  },
}
```
`@Model`属性也可以通过`reflect-metadata`从它自身的类型定义设置`type`属性

## `@ModelSync(propName: string, event?: string, options: (PropOptions | Constructor[] | Constructor) = {}) `
```
import { Vue, Component, ModelSync } from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
  @ModelSync('checked', 'change', { type: Boolean })
  readonly checkedValue!: boolean
}
```
等同于
```
export default {
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: {
      type: Boolean,
    },
  },
  computed: {
    checkedValue: {
      get() {
        return this.checked
      },
      set(value) {
        this.$emit('change', value)
      },
    },
  },
}
```
`@ModelSync`属性也可以通过`reflect-metadata`从它自身的类型定义设置`type`属性

## #Watch
`@Watch(path: string, options: WatchOptions = {})`

`@Watch`装饰器接收两个参数：
- `path: string` 被侦听的属性名称
- `options?: WatchOptions={} options` 可以包含两个属性：
  1. `immediate?: boolean`侦听开始之后是否立即调用该回调函数；
  2. `deep?: boolean` 被真挺多一项的属性改变时，是否调用该回调函数

```
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component
export default class YourComponent extends Vue {
  @Watch('child')
  onChildChanged(val: string, oldVal: string) {}

  @Watch('person', { immediate: true, deep: true })
  onPersonChanged1(val: Person, oldVal: Person) {}

  @Watch('person')
  onPersonChanged2(val: Person, oldVal: Person) {}

  @Watch('person')
  @Watch('child')
  onPersonAndChildChanged() {}
}
```
相当于
```
export default {
  watch{
    child: [
      {
        handler: 'onChildChanged',
        immediate: false,
        deep: false
      },
      {
        handler: 'onPersonAndChildChanged',
        immediate: false,
        deep: false
      }
    ],
    person: [
      {
        handler: 'onPersonChanged1',
        immediate: true,
        deep: true
      },
      {
        handler: 'onPersonChanged2',
        immediate: false,
        deep: false,
      },
      {
        handler: 'onPersonAndChildChanged',
        immediate: false,
        deep: false,
      }
    ]
  },
  methods: {
    onChildChanged(val, oldVal) {},
    onPersonChanged1(val, oldVal) {},
    onPersonChanged2(val, oldVal) {},
    onPersonAndChanged() {},
  },
}
```
## `@Provide(key?: string | symbol) / @Inject(options?: { from?: InjectKey, default?: any } | InjectKey)` 装饰器

```
import { Component, Inject, Provide, Vue } from "vue-property-decorator";

const symbol = Symbol=("baz");
@Component
export class MyComponent extends Vue {
  @Inject() readonly foo!: string
  @Inject("bar") bar!: string
  @Inject({ from: "optional", default: "default" }) readonly optional!: string
  @Inject(symbol) readonly baz!: string

  @Provide() foo = "foo"
  @Provide("bar") baz = "bar"
}
```
等同于
```
const symbol = Symbol("baz");

export const Mycomponent = Vue.extends({
  inject: {
    foo: "foo",
    bar: "bar",
    optional: { from: "optional", default: "default" },
    baz: symbol,
  },
  data(){
    return {
      foo: "foo",
      baz: "bar",
    }
  }m
  provide() {
    return {
      foo: this.foo,
      bar: this.baz
    }
  }
})
```



## `@ProvideReactive(key?: string | symbol) / @InjectReactive(options?: { from?: InjectKey, default?: any } | InjectKey)` decorator
这些是装饰器响应版本的`@Provide`和`@Inject`。如果一个被提供的值被父组件所修改，那么子组件可以捕捉到这次变化。
```
const key = Symbol();

@Component
class ParentComponent extends Vue{
  @ProvideReactive() one = 'value'
  @InjectReactive() two = 'value'
}

@Component
class ChildComponent extends Vue {
  @InjectReactive() one!: string
  @InjectReactive(key) two!: string
}
```

## `@Emit(event?: string)`decorator
由`@Emit`和`$emit` 修饰的函数返回值后跟着的是它们的原始参数。 如果返回值是一个`Promise`，它会在发出之前被解析。

如果事件名称不是通过事件参数提供的，则使用函数名称。 在这种情况下，`camelCase` 名称将转换为 `kebab-case`。

```
import { Vue, Component, Emit } from "vue-property-decorator";

@Component
export default class YourComponent extends Vue {
  count = 0;

  @Emit()
  addToCount(n: number){
    this.count += n;
  }

  @Emit('reset')
  resetCount(){
    this.count = 0;
  }

  @Emit()
  returnValue(){
    return 10;
  }

  @Emit()
  onInputChange(e){
    return e.target.value;
  }

  @Emit()
  promise(){
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(20);
      }, 0);
    })
  }
}
```
等同于
```
export default {
  data(){
    return {
      count: 0,
    }
  },
  methods: {
    addToCount(n){
      this.count += n;
      this.$emit('add-to-count', n);
    },
    resetCount(){
      this.count = 0
    },
    returnValue(){
      this.$emit('return-value', 10);
    },
    onInputChange(e){
      this.$emit('on-input-change', e.target.value, e);
    },
    promise(){
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          resolve(20);
        }, 0);
      })

      promise.then(value => {
        this.$emit('promise', value);
      })
    }
  }
}
```


## `@Ref(refKey?: String)`decorator

```
import { Vue, Compoent, Ref } from "vue-property-decorator";
import AnotherComponent from "@/path/to/another-component.vue";

@Component
export default class YourComponent extends Vue {
  @Ref() readonly anotherComponent!: AnotherComponent
  @Ref('aButton') readonly button!: HTMLButtonElement
}
```
相当于
```
export default {
  computed() {
    anotherComponent: {
      cache: false,
      get() {
        return this.$refs.anotherComponent as AnotherComponent
      }
    },
    button: {
      cache: false,
      get() {
        return this.$refs.aButton as HTMLButtonElement
      }
    }
  }
}
```


## `@VModel(propsArgs?: PropOptions)` decorator
```
import { Vue, Component, VModeal } from "vue-property-decorator";

@Component
export default class YourComponent extends Vue {
  @VModel({ type: String }) name!: string
}
```
相当于
```
export default {
  props: {
    value: {
      type: String
    }
  },
  computed: {
    name: {
      get() {
        return this.value
      },
      set(value){
        this.$emit('input', value)
      }
    }
  }
}
```
