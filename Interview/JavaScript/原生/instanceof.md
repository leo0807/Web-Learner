# typeof的原理

原理是这样的， 不同的对象在底层都表示为二进制， 在 JavaScript 中二进制前三位都为 0 的话会被判断为 object 类型， null 的二进制表示是全 0， 自然前三位也是 0， 所以执行 typeof 时会返回“object”。
但是**instance**测试null的时候
如下
null instanceof Object => false
而
null instanceof null 则会报出如下错误
Uncaught TypeError: Right-hand side of 'instance' is not an object


# instanceof

instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。
instanceof 可以在继承关系中用来判断一个实例是否属于它的父类型。