# VUE-CLASS-COMPONENT (Learning Notes)

[OFFICAL LINK](https://class-component.vuejs.org/guide/class-component.html#data)

## ```@Component``` 装饰器让你的类变为一个```Vue```的组件
```
<template>
  <div>{{ message }}</div>
</template>

import Vue from 'vue'
import Component from 'vue-class-component'

// HelloWorld class will be a Vue component
@Component
export default class HelloWord extends Vue
{

}
```