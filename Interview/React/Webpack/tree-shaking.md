# webpack tree shaking
1. Webpack Tree shaking 从 ES6 顶层模块开始分析，可以清除未使用的模块
2. Webpack Tree shaking 会对多层调用的模块进行重构，提取其中的代码，简化函数的调用结构
3. Webpack Tree shaking 不会清除 IIFE(立即调用函数表达式)
因为 IIFE 比较特殊，它在被翻译时(JS 并非编译型的语言)就会被执行，Webpack 不做程序流分析，它不知道 IIFE 会做什么特别的事情，所以不会删除这部分代码
5. Webpack Tree shaking 结合第三方包使用

6. Webpack Tree shaking 做不到的事情
如果变量名称与第三方包中的方法名称一致，会导致错误的打包，如
```
//App.js
import { Add } from './utils'
Add(1 + 2);

//utils.js
import { isArray } from 'lodash-es';

export function array(array) {
console.log('isArray');
return isArray(array);
}

export function Add(a, b) {
console.log('Add');
return a + b
}

```
# 原理
1. DCE Dead Code Elimination
    - 代码不会被执行，不可到达
    - 代码执行的结果不会被用到
    - 代码只会影响死变量（只写不读）
2. tree-shaking 的消除原理是依赖于 ES6 的模块特性
如果项目中使用了babel的话，需要设置Module：false
ES6 模块依赖关系是确定的，和运行时的状态无关，可以进行可靠的静态分析，这就是 tree-shaking 的基础。

所谓静态分析就是不执行代码，从字面量上对代码进行分析，ES6 之前的模块化，比如我们可以动态 require 一个模块
