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
