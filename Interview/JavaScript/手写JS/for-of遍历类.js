// 只有提供了 Iterator 接口的数据类型才可以使用 for-of 来循环遍历，而 Array、Set、Map、
// 某些类数组如 arguments 等数据类型都默认提供了 Iterator 接口，所以它们可以使用 for-of 来进行遍历


// 1. 类数组对象

let obj1 = {
    0: 'one',
    1: 'two',
    length: 2
}
obj1 = Array.from(obj1);
for(let i of obj1){
    console.log(i);
}

// 2.如果不是类数组对象，也有办法，添加一个[Symbol.iterator]属性，并指向一个迭代器即可。
// 2.1
let obj2 = {
    a: 1,
    b: 2,
    c: 3
};

obj2[Symbol.iterator] = function(){
    let keys = Object.keys(this);
    let count = 0;
    return {
        next(){
            if(count < keys.length){
                return {value: obj2[keys[count++]], done: false};
            }else{
                return {value: undefined, done: true};
            }
        }
    }
}
for(let i of obj2){
    console.log(i);
}

// 2.2
let obj3 = {
    a: 1,
    b: 2,
    c: 3
};

obj3[Symbol.iterator] = function*(){
    let keys = Object.keys(obj3);
    for(let k of keys){
        yield [k, obj3[k]];
    }
}

for(let i of obj3){
    console.log(i);
}

// 3.
class User{
    constructor(name, gender, level){
        this.name = name;
        this.gender = gender;
        this.level = level;
    }

    *[Symbol.iterator](){
        let keys = Object.keys(this);
        for(let i = 0, len = keys.length; i < len; i++){
            yield{
                keys: keys[i],
                value: this[keys[i]]
            }
        }
    }
}

let zhou = new User('zhou', 'male', 1);

for(let {key, value} of zhou){
    console.log(key, value);
}
// 输出结果
// name zhou
// gender male
// lv 1