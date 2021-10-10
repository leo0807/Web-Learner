// @ts-nocheck
// 创建一个新的对象
// 继承父类原型上的方法.
// 添加父类的属性到新的对象上并初始化. 保存方法的执行结果.
// 如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象。

// 1、创建了一个空的js对象（即{ } ）
// 2、将空对象的原型prototype指向构造函数的原型
// 3、将空对象作为构造函数的上下文（改变this指向）
// 4、对构造函数有返回值的判断
// Object.create() 方法会使用指定的原型对象及其属性去创建一个新的对象。
// 使用Object.create()是将对象继承到原型链上，然后可以通过对象实例的__proto__属性进行访问原型链上的属性



// new Person() ：使用new我们可以得到实际的对象，有__proto__属性和constructor属性；
// 使用instanceof判断存在构造函数。

// Object.create() ：使用Object.create()创建的对象并没有上面的两个属性，
// 使用instanceof判断存在构造函数，无法指向自身构造函数；
// 但是Object.create()可以设置某个属性的底层是否可操作，这一点在new Person()没有

// new 和 Object.creat的区别 https://www.jianshu.com/p/165cb07b9de0
const Base = function () { };
// new
let o1 = new Object();
o1.__proto__ = Base.prototype;
Base.call(o1);
// Object
Object.create = function (Base) {
    let F = function () { };
    F.prototype = Base;
    return new F();
}

function myNew(obj, ...args) {
    if (typeof obj !== 'function') {
        throw Error('The first parameter type must be a function');
    }
    // 基于obj创建一个新的obj
    const newObj = Object.create(obj.prototype);
    const res = obj.call(newObj, ...args);
    // const result = obj.apply(newObj, rest);

    // 如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象
    return typeof res === 'object' ? res : newObj;

}

function objectFacrtory() {
    let obj = new Object();
    Constructor = [].shift().call(arguments);
    obj.__proto__ = Constructor.prototype;
    let res = Constructor.apply(obj, arguments);
    return typeof res === 'object' ? res : obj;
}

function Otaku(name, age) {
    this.strength = 60;
    this.age = age;

    return 'handsome boy';
}

var person = new Otaku('Kevin', '18');

console.log(person.name) // undefined
console.log(person.habit) // undefined
console.log(person.strength) // 60
console.log(person.age) // 18

// function Person(firtName, lastName) {
//     this.firtName = firtName;
//     this.lastName = lastName;

//     return 'demo';
// }

// const tb = new Person('Chen', 'Tianbao');
// console.log(tb);

// const tb2 = myNew(Person, 'Chen', 'Tianbao');
// console.log(tb2)

function Person(name) {

    this.name = name
    // 1. return name; => {name:"Tom"}
    // 2. return {} => {}
}
// 1和2实例化过程中，p有什么不同
let p = new Person('Tom');
// 作者：我今天血糖低
// 链接：https://www.nowcoder.com/discuss/611521?type=post&order=time&pos=&page=1&channel=-1&source_id=search_post_nctrack
// 来源：牛客网

// 构造函数不需要显示的返回值。使用new来创建对象(调用构造函数)时，
// 如果return的是非对象(数字、字符串、布尔类型等)会忽而略返回值;
// 如果return的是对象，则返回该对象(注：若return null也会忽略返回值）。
