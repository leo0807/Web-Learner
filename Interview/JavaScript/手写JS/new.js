// 创建一个新的对象
// 继承父类原型上的方法.
// 添加父类的属性到新的对象上并初始化. 保存方法的执行结果.
// 如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象。


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

function Person(firtName, lastName) {
    this.firtName = firtName;
    this.lastName = lastName;
  
    return 'demo';
}
  
const tb = new Person('Chen', 'Tianbao');
console.log(tb);

const tb2 = myNew(Person, 'Chen', 'Tianbao');
console.log(tb2)