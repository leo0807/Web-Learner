来源：https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/20


# 继承差异

1. **区别于 ES5 的继承，ES6 的继承实现在于使用 super 关键字调用父类，反观 ES5 是通过 call 或者 apply 回调方法调用父类**
```
class Super {}
class Sub extends Super {}

const sub = new Sub();
Sub.**proto** === Super;
```

子类可以直接通过 **proto** 寻址到父类。
```
function Super() {}
function Sub() {}

Sub.prototype = new Super();
Sub.prototype.constructor = Sub;

var sub = new Sub();

Sub.**proto** === Function.prototype;
```
而通过 ES5 的方式，Sub.**proto** === Function.prototype

2. ES5 和 ES6 子类 this 生成顺序不同。ES5 的继承先生成了子类实例，再调用父类的构造函数修饰子类实例，ES6 的继承先生成父类实例，再调用子类的构造函数修饰父类实例。这个差别使得 ES6 可以继承内置对象。
```
function MyES5Array() {
Array.call(this, arguments);
}

// it's useless
const arrayES5 = new MyES5Array(3); // arrayES5: MyES5Array {}

class MyES6Array extends Array {}

// it's ok
const arrayES6 = new MyES6Array(3); // arrayES6: MyES6Array(3) []
```
**因为 this 生成顺序不同，所以需要在 constructor 中，需要使用 super()**
