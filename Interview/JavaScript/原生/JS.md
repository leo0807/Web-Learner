### {}与 map的区别
1. 键名类型
    - Object只接受**String**和**Symbol**， 其他类型也可以使用，但是最终都被隐式转换为字符串
    - Map则保留其原始类型且Map可以使用**正则表达式作为键**
2. 原型prototype
    - {} 有原型， 不能使用**constructor**作为键，否则可能会报错
    newObject.constructor; // ƒ Object() { [native code] }
    - Map没有这种担心
3. 迭代器
    - Object不能直接迭代
    - Map可以用for，forEach等直接迭代
4. 复杂度
    - Object的增删以及属性长度查询复杂度为O（n）
    - Map则为O（1）

# 什么是静态（static）方法？

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上 static 关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”



## Undefined 是变量声明未赋值 null 是变量声明并赋值 但值为空地址
null 是一个表示"无"的对象，转为数值时为 0；undefined 是一个表示"无"的原始值，转为数值时为 NaN。
### null 表示"没有对象"，即该处不应该有值。典型用法是：
- 作为函数的参数，表示该函数的参数不是对象。
- 作为对象原型链的终点。
```
Object.getPrototypeOf(Object.prototype)
// null
```
### undefined 表示"缺少值"，就是此处应该有一个值，但是还没有定义。典型用法是：
- 变量被声明了，但没有赋值时，就等于 undefined。
- 调用函数时，应该提供的参数没有提供，该参数等于 undefined。
- 对象没有赋值的属性，该属性的值为 undefined。
- 函数没有返回值时，默认返回 undefined。


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