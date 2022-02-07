# VUE-CLASS-COMPONENT (Learning Notes)

[OFFICAL LINK](https://class-component.vuejs.org/guide/class-component.html#data)

## ```@Component``` 装饰器让你的类变为一个```Vue```的组件
```
<template>
  <div>{{ message }}</div>
  <input v-model='name' />
</template>

import Vue from 'vue';
import Component from 'vue-class-component';
<!-- 
  import OtherComponent from './OtherComponent';
  @Component({
    components: {
      OtherComponent
    }
  })
 -->

// HelloWorld class will be a Vue component
@Component


export default class HelloWord extends Vue
{
  <!-- 默认的属性会被视为```data``` -->
  message = 'Hello Wordl';
  <!-- 如果初始值为undefined，则此属性值不会是响应式的 -->
  <!-- 如，message = undefined; -->
  <!-- 为了避免此种情况的发生，可以设置value为null或者使用data的hook来进行代替
    如，
      message = null;
      
      data() {
        return {
          message: undefined
        }
      }
   -->

   <!--
    方法：
    组件中的方法（Methods）可以直接以类的原型方法进行声明
    如，
   -->
   hello(){
     console.log('Hello World);
   }

   <!--
    计算属性：
    通过直接声明为类的getter或者setter方法进行使用。
    如， 
   -->
   firstName = 'John';
   lastName = 'Doe';

   get name(){
     return this.firstName + ' ' + this.lastName;
   }

   set name(value){
     const splitted = value.split(' ');
     this.firstName = splitted[0];
     this.lastName = splitted[1] || '';
   }

   <!--
   Vue的Hooks的使用方法和Methods基本一致，
   只是无法在实例中条用它们
   -->
   mounted(){
     console.log('mounted');
   }

   render(){
     return <div> Hello Render!</div>
   }

}

```

## Custom Decorators

通过辅助函数`createDecorator`可以实现自定义的装饰器。


`createDecorator`的第一个参数是一个回调函数，这个回调函数接受以下这些参数：
  - `options`： Vue组件类型对象。此对象的改变会影响到被提供的组件。
  - `key`：装饰器需要的属性或方法。
  - `parameterIndex`：
```
<!-- decorators.js -->
import { createDecorator } from 'vue-class-component';
<!-- 声明 Log 装饰器 -->
export const Log = createDecorator((options, key) => {
  <!-- 保留初始的方法，以供后续的使用 -->
  const originalMethod = options.methods[key];

  options.methods[key] = function wrapperMethod(...args){
    <!-- 输出一个日志 -->
    console.log(`Invoked: ${key}(`, ...args, ')');

    <!-- 调用原始方法 -->
    originalMethod.apply(this, args);
  }
})
```
将其作为一个装饰器使用
```
import Vue from 'vue';
import Component from 'vue-class-component';
import { Log } from './decorators';

@Component
class MyComp extends Vue{
  // 当hello方法被调用的时候，装饰器会令一个日志被打印出来
  @Log
  hello(value){
    ///...
  }
  // -> Invoked: hello(42)
}
```

## Extend 与 Mixins
### Extend
通过```Extend```可以将现有的类组件扩展为原生类继承。
如现有原生类```super```,
```
<!-- super.js -->
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Super extends Vue{
  superValue = 'Hello';
}
```
原生类`super`可以被 **继承**
```
import Super from './super';
import Component from 'vue-class-component';

@Component
export default class HelloWorld extends Super{
  created(){
    console.log(this.superValue); // -> Hello
  }
}
```

### Mixin
vue-class-component提供了```mixins```辅助函数，这可以以类风格的方式使用`mixins`。通过`mixins`辅助函数，`TypeScript` 可以推断 `mixin` 类型并在组件类型上继承它们。

```
// mixins.js
import Vue from 'vue'
import Component from 'vue-class-component'

// You can declare mixins as the same style as components.
@Component
export class Hello extends Vue {
  hello = 'Hello'
}

@Component
export class World extends Vue {
  world = 'World'
}
```
在类类型的组件中使用它们。
```
import Component, { mixins } from 'vue-class-component'
import { Hello, World } from './mixins'

// Use `mixins` helper function instead of `Vue`.
// `mixins` can receive any number of arguments.
@Component
export class HelloWorld extends mixins(Hello, World) {
  created () {
    console.log(this.hello + ' ' + this.world + '!') // -> Hello World!
  }
}
```
