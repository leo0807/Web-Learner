### {}与 map的区别
1. 键名类型
    - Object只接受**String**和**Symbol**， 其他类型也可以使用，但是最终都被隐式转换为字符串
    - Map则保留其原始类型且Map可以使用**正则表达式作为键**
2. 原型prototype
    - {} 有原型， 不能使用**constructor**作为键，佛则可能会报错
    newObject.constructor; // ƒ Object() { [native code] }
    - Map没有这种担心
3. 迭代器
    - Object不能直接迭代
    - Map可以用for，forEach等直接迭代
4. 复杂度
    - Object的增删以及属性长度查询复杂度为O（n）
    - Map则为O（1）


### Undefined 是变量声明未赋值 null 是变量声明并赋值 但值为空地址

1. 注：空地址就是 没有实际的复杂类型数据对应的 地址


### JS的原始类型
- boolean
- null
- undefined
- number
- string
- symbol
- bigint
### JS的引用数据类型
对象Object（包含普通对象-Object，数组对象-Array，正则对象-RegExp，日期对象-Date，数学函数-Math，函数对象-Function）

### null是对象吗？

结论: null不是对象。
解释: 虽然 typeof null 会输出 object，但是这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象然而 null 表示为全零，所以将它错误的判断为 object 。

### 如何创建一个没有prototype（原型）的对象
使用Object.create
```
const obj = Object.create(null);
console.log(obj.toString());
// throws an error obj is not a function
```
所有有prototype的对象都会隐式的触发toString方法

### 为什么在这个函数中，变量b是一个全局变量
```
function myFunc(){
    let a = b = 0;
}
```
因为JS赋值运算符是从右到左执行的
所以上边的代码变成了 let a = (b = 0)

### use strict 的作用
是ES5的特性，它使得整个脚本处于严格模式当中，这能
- 消除JS语法的一些不合理，不严谨之处，减少一些怪异行为
- 