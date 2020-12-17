

- 实例对象通过隐性__proto__指向原型对象
- 构造实例的对象通过portotype属性指向原型对象
- 原型对象则通过constructor指向构造对象




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

# 原型对象和构造函数有何关系？
在JavaScript中，每当定义一个函数数据类型(普通函数、类)时候，都会天生自带一个prototype属性，这个属性指向函数的原型对象。
当函数经过new调用时，这个函数就成为了构造函数，返回一个全新的实例对象，这个实例对象有一个__proto__属性，指向构造函数的原型对象。

# 能不能描述一下原型链？
JavaScript对象通过__proto__ 指向父类对象，直到指向Object对象为止，这样就形成了一个原型指向的链条, 即原型链。

![image](https://github.com/leo0807/Web-Learner/blob/master/images/原型链.png)

对象的 hasOwnProperty() 来检查对象自身中是否含有该属性
使用 in 检查对象中是否含有某个属性时，如果对象中没有但是原型链中有，也会返回 true
