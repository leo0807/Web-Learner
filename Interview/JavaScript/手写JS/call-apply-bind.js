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
Function.prototype.myCall = function (thisArg, ...arg) {
    if (thisArg === null || thisArg == undefined) {
        thisArg = window;
    }
    // 定义个不重复的常量
    // 将不重复的属性给到thisArg
    // 调用函数并将结果返回
    // 删除新增属性
    const attr = Symbol();
    thisArg[attr] = this;
    
}