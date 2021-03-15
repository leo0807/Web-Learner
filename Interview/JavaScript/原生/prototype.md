

- 实例对象通过隐性__proto__指向原型对象
- 构造实例的对象通过portotype属性指向原型对象
- 原型对象则通过constructor指向构造对象

{} = new Object()
Object.create(null) 没有指定原型
Object.create()会把内部属性传入内部对象的原型中

如 let a = new Number()
const obj2 = Object.create(obj1)
=> obj2.__proto__ === obj1 => true
obj2 === obj1 => false

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

hasOwnProperty


**JavaScript 是基于原型的语言**。当我们调用一个对象的属性时，如果对象没有该属性，JavaScript 解释器就会从对象的**原型对象**上去找该属性，如果原型上也没有该属性，那就去找原型的原型，直到最后返回null为止，null没有原型。这种属性查找的方式被称为原型链（prototype chain）。

把方法写在构造函数的内部，增加了通过构造函数初始化一个对象的成本（内存占用，因为两个实例对象就创建了两个一样的methodA），把方法写在prototype属性上就有效的减少了这种成本（他们指向了同一个methodB）。你也许会觉得，调用对象上的方法要比调用它的原型链上的方法快得多，其实并不是这样的，如果你的那个对象上面不是有很多层原型的话，它们的速度其实是差不多的

举例
```
let obj = {} => let obj = new Object();
obj.toString === Object.prototype.toString; => true; 
```

# prototype 与 __proto__
1. 在JS里，万物皆对象。方法（Function）是对象，方法的原型(Function.prototype)是对象。因此，它们都会具有对象共有的特点。即：对象具有属性__proto__，可称为隐式原型，一个对象的隐式原型指向构造该对象的构造函数的原型，这也保证了实例能够访问在构造函数原型中定义的属性和方法。
2. 方法(Function)方法这个特殊的对象，除了和其他对象一样有上述_proto_属性之外，还有自己特有的属性——原型属性（prototype），这个属性是一个指针，指向一个对象，这个对象的用途就是包含所有实例共享的属性和方法（我们把这个对象叫做原型对象）。原型对象也有一个属性，叫做constructor，这个属性包含了一个指针，指回原构造函数。

作者：doris
链接：https://www.zhihu.com/question/34183746/answer/58155878
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。