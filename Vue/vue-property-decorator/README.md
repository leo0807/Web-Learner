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

## @Model
`@Model(event?: string, options: (PropOptions | Constructor[] | Constructor) = {})`

`@Model`装饰器允许用户在一个组件自定义`v-model`，它接收两个参数
- `event: string` 事件名称
- `options: Constructor | Constructor[] | PropOptions` 与@Prop 的第一个参数一致。

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