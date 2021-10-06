function testDec(isDec) {
    return function (target) {
        target.isDec = isDec;
    }
}
@testDec(false)
class Demo { }

console.log(Demo.isDec);

function mixins(...list) {
    return function (target) {
        Object.assign(target.prototype, ...list);
    }
}

const Foo = {
    foo() {
        console.log('foo');
    }
}
@mixins(Foo)
class MyClass { }

let obj = new MyClass();
obj.foo();
// 装饰方法 @readonly 只读方法
function readonly(target, name, description) {
    description.writable = false;
    return description;
}

function log(target, name, description) {
    var oldValue = descriptor.value;

    descriptor.value = function () {
        console.log(`Calling ${name} with`, arguments);
        return oldValue.apply(this, arguments);
    }
    return descriptor;
}
class Math {
    @log
    add(a, b) {
        return a + b;
    }
}

class Person {
    constructor() {
        this.first = 'A';
        this.last = 'B';
    }
    @readonly
    name() {
        return `${this.first} ${this.last}`;
    }
}
const p = new Person();
console.log(p.name());

// 注意，装饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。
// 这意味着，装饰器能在编译阶段运行代码。也就是说，装饰器本质就是编译时执行的函数。

/**
 * core-decorators.js中提供了一些常用的装饰器如，override，supresswarn等等
 *
 * ES7中'@'标识符是ES5中Object.defineProperty(obj, prop, descriptor)的语法糖；
 * 对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。
 * 数据描述符是一个具有值的属性，该值可能是可写的，也可能不是可写的。
 * 存取描述符是由 getter-setter 函数对描述的属性。
 *
 * configurable（属性能否被修改）；enumerable定义了对象的属性是否可以在 for...in 循环和 Object.keys() 中被枚举。
 * */

// 函数方法的装饰
// 装饰器只能用于类和类的方法，不能用于函数，因为存在函数提升。
// 另一方面，如果一定要装饰函数，可以采用高阶函数的形式直接执行。
// function doSomething(name) {
//     console.log('Hello, ' + name);
// }

// function loggingDecorator(wrapped) {
//     return function () {
//         console.log('Starting');
//         const result = wrapped.apply(this, arguments);
//         console.log('Finished');
//         return result;
//     }
// }
// const wrapped = loggingDecorator(doSomething);