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