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

function myBind() {
    const args = Array.from(arguments);
    const _this = args.shift();
    const self = this;
    return () => {
        return self.apply(_this, args);
    }
}

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