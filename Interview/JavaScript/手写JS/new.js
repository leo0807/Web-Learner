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

