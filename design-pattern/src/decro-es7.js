function testDec(isDec){
    return function(target){
        target.isDec = isDec;
    }
}
@testDec(false)
class Demo{}

alert(Demo.isDec);

function mixins(...list){
    return function(target){
        Object.assign(target.prototype, ...list);
    }
}

const Foo = {
    foo(){
        alert('foo');
    }
}
@mixins(Foo)
class MyClass{}

let obj = new MyClass();
obj.foo();
// 装饰方法 @readonly 只读方法
function readonly(target, name, description){
    description.writable = false;
    return description;
}

function log(target, name, description){
    var oldValue = descriptor.value;

    descriptor.value = function(){
        console.log(`Calling ${name} with`, arguments);
        return oldValue.apply(this, arguments);
    }
    return descriptor;
}
class Math{
    @log
    add(a, b){
        return a + b;
    }
}

class Person{
    constructor(){
        this.first = 'A';
        this.last = 'B';
    }
    @readonly
    name(){
        return `${this.first} ${this.last}`;
    }
}
const p = new Person();
console.log(p.name());