

实例对象通过隐性__proto__指向原型对象
构造实例的对象通过portotype属性指向原型对象
原型对象则通过constructor指向构造对象

如 let a = new Number()

a.__proto__ => Number 原型
Number.prototyoe => Number原型
Number原型 constructor => Number

# new 一个对象的过程
```
function Mother(lastName){
    this.latName = lastName;
}
var son = new Mother("Da");
```
1. 创建一个新对象 son
2. 新对象会被执行 [[prototype]]链接 son.__proto__ = Mother.prototype
3. 新对象和函数调用的this会绑定起来 Mother.call(son, "Da")
4. 执行构造函数的代码 son.lastName
5. 如果函数没有返回值，那么就返回这个新对象 return this