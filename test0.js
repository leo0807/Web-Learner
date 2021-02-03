var myObject = Object.create(null) // 此时myObject并没有继承Object这个原型的任何方法,因此有：

myObject.hasOwnProperty === undefined // 此时myObject是没有hasOwnProperty这个方法，那么我们要如何使用呢？如下：

var a = Object.prototype.hasOwnProperty.call(myObject, 'foo')

console.log(a);
console.log(Reflect.ownKeys(myObject));
