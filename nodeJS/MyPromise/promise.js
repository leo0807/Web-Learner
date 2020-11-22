const { fail } = require("assert");
const { type } = require("os");

class MyPromise{
    
    constructor(fn){
        // 将成功的事件函数集成在successList上
        this.successList = [];
        this.failList = []
        // 三种状态，pending， fullfilled， rejected
        this.state = "pending";
        // 传入的函数对象，异步操作的函数内容
        fn(this.resolveFn.bind(this), this.rejectFn.bind(this));
    }
    then(successFn, failFn){
        if(typeof successFn === 'function'){
            this.successList.push(successFn);
        }
        if(typeof failFn === 'function'){
            this.failList.push(failFn);
        }
    }
    catch(failFn){
        if(typeof failFn === 'function'){
            this.failList.push(failFn);
        }
    }
    resolveFn(res){
        this.state = "fullfilled";
        this.successList.forEach(function(item, index){
            // 将成功事件循环调用
            item(res); 
        })
    }
}