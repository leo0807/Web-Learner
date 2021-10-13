let obj = {
    name: "hello",
    say: function () {
        console.log(arguments);
        console.log(this.name);
    }
}
let obj2 = { name: "Greeting!" };
obj.say();
obj.say.call(obj2)
// call/apply和bind 的区别体现在它们的返回值不同
// call和apply的返回值是func的执行结果，在改变this指向后立即执行函数
// 而bind的返回值是func的拷贝，在改变this指向后不会立即执行函数，即需要自行调用得到这个新函数



// call

Function.prototype.myCall = function (thisArg, ...args) {
    if (thisArg === null || thisArg === undefined) {
        thisArg = window;
    }
    // 创建属性，且不重复
    const specialMethod = Symbol('anything');
    // 此时this指向当前函数this指向say
    // 将不重复的属性给到thisArg
    thisArg[specialMethod] = this;
    let result = thisArg[specialMethod](...args);
    // 删除不重复属性
    delete thisArg[specialMethod]
    return result;
}

// Apply

let sayClone2 = obj.say.myBind(obj2, 1, 2, 3);
sayClone2();


Function.prototype.myApply = function (context = window, args) {
    if (this === Function.prototype) {
        return undefined; // 用于防止 Function.prototype.myCall() 直接调用
    }
    const fn = Symbol();
    context[fn] = this;
    let result;
    if (Array.isArray(args)) {
        result = context[fn](...args);
    } else {
        result = context[fn]();
    }
    delete context[fn];
    return result;
}


// bind() 方法不会立即执行，它会返回一个函数，可以将函数存储在变量中，再通过变量获取函数的返回值
Function.prototype.myBind = function (objThis, ...args) {
    // 保留当前函数 obj.say
    const thisFn = this;
    // 声明函数用来返回
    // secondParams是返回函数后再次添加的函数
    let funcForBind = function (...secndParams) {
        // 判断new 是否用于构造函数
        const isNew = this instanceof funcForBind;
        // 如果是new的话 返回新对象，否则返回绑定对象
        const thisArg = isNew ? this : objThis;
        return thisFn.call(thisArg, ...args, ...secndParams);
    }
    // 复制原型对象
    funcForBind.prototype = Object.create(thisFn.prototype);
    return funcForBind;
}
// bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，
// 之后的一序列参数将会在传递的实参前传入作为它的参数。(来自于 MDN )

/**
 * bind方法是ES5 新增的一个方法，传参和call方法一致。与call、apply方法的区别是，call和apply方法会对目标函数进行自动执行，会返回一个新的函数。
 * call和apply无法在事件绑定函数中使用。
 */
// E.g.

const obj = { name: 'pixel' };
document.addEventListener('click', onClick.bind(obj, 22, 66), false); // pixel 22 66
function onClick(p1, p2) {
    console.log(this.name, p1, p2);
}

// E.g.2

const button = document.getElementById('button');
const text = document.getElementById('text');
button.onclick = function () {
    console.log(this.id);
}.bind(text); //改变this指向

/**
 * 1 bind操作只有第一次绑定有效果，之后再次进行绑定，不会有效果；操作的只是它的代理。
 * 2 new操作的绑定操作优先度要高于bind，事实上，也会高于apply和call
 */
function myBind() {
    const args = Array.from(arguments);
    const _this = args.shift();
    const self = this;
    return () => {
        return self.apply(_this, args);
    }
}

function myBind2(context) {
    const self = this;
    return function () {
        return self.apply(context);
    }
}

function myBind3(context) {
    let self = this;
    let args = Array.prototype.slice.call(arguments, 1);

    return function () {
        let bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(context, args.concat(bindArgs));
    }
}



Function.prototype.bindFunc = function (context) {
    if (typeof this !== 'function') {
        throw new Error('xxx');
    }
    let self = this;
    let args = Array.prototype.slice.call(arguments, 1);

    let fNOP = function () { };

    let fBound = function () {
        let bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}