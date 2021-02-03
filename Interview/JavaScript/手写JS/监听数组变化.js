/**
 * 1、定义变量arrayProto接收Array的prototype
2、定义变量arrayMethods，通过Object.create()方法继承arrayProto
3、重新封装数组中push，pop等常用方法。（这里我们只封装我们需要监听的数组的方法，并不做JavaScript原生Array中原型方法的重写的这么一件暴力的事情）
 */

// 非纯函数 pop push shift unshift map filter forEach some every reduce

// indexOf includes concat

// slice //splice 是非纯函数
// 切片  剪接 

const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);
const newArrProto = [];
[
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
].forEach(method => {
    let original = arrayMethods[method];
    // 将push，pop等方法重新封装并定义在对象newArrProto的属性上
    // 这里需要注意的是封装好的方法是定义在newArrProto的属性上而不是其原型属性

    newArrProto[method] = function mutator() {
        console.log('监听到');
        // 调用原生方法并返回结果
        return original.call(this, arguments);
    }
})

let list = [1, 2];
// 将我们要监听的数组的原型指针指向上面定义的空数组对象
// 它会执行原生Array中对应的原型方法，与此同时执行我们自己重新封装的方法。
list.__proto__ = newArrProto;
list.push(3);
console.log(newArrProto);

class NewArray extends Array {
    constructor(...args) {
        // 调用父类Array的constructor()
        super(...args)
    }
    push(...args) {
        console.log('监听到数组的变化啦！');

        // 调用父类原型push方法
        return super.push(...args)
    }
    // ...
}

// https://zhuanlan.zhihu.com/p/27166404

/**
 * 
 */

const listener = (object, onChange) => {
    const handler = {
        get(target, property, receiver) {
            try {
                return new Proxy(target[property], handler);
            } catch (err) {
                return Reflect.get(target, property, receiver);
            }
        },
        defineProperty(target, property, descriptor) {
            onChange();
            return Reflect.defineProperty(target, property, descriptor);
        },
        deleteProperty(target, property) {
            onChange();
            return Reflect.deleteProperty(target, property);
        }
    };

    return new Proxy(object, handler);
}
module.exports = listener;





// // 如何实现一个自存档对象。 当设置temperature 属性时，archive 数组会获取日志条目。
// function Archiver() {
//     var temperature = null;
//     var archive = [];

//     Object.defineProperty(this, 'temperature', {
//         get: function () {
//             console.log('get!');
//             return temperature;
//         },
//         set: function (value) {
//             temperature = value;
//             archive.push({ val: temperature });
//         }
//     });

//     this.getArchive = function () { return archive; };
// }

// var arc = new Archiver();
// arc.temperature; // 'get!'
// arc.temperature = 11;
// arc.temperature = 13;
// arc.getArchive(); // [{ val: 11 }, { val: 13 }]