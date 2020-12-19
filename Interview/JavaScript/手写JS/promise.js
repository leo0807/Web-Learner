// https://juejin.cn/post/6907673648216145928#heading-8
var PENDING = "pending";
var FULLFILLED = "fullfilled";
var REJECTED = "rejected";

// excute 是回掉函数 对应 对应和拒绝两个参数
function myPromise(excute) {
// 1.添加 onFulFilledFn 和 onRejectedFn 数组。
// 2.resolve() 和 reject() 函数改变状态时，需要异步调用数组中的函数，同样使用 setTimeout 来模拟异步。
    
    var _this = this;
    _this.state = PENDING;
    _this.onFulfilledFn = [];
    _this.onRejectedFn = [];


    // 初始状态为 PENDING，在执行时可能会有返回值 value，在拒绝时会有拒绝原因 reason。
    function resolve(value) {
        setTimeout(function () {
            if (_this.state === PENDING) {
                _this.state = FULLFILLED;
                _this.value = value;
                _this.onFulfilledFn.forEach(function (fn) {
                    fn(_this.value);
                });
            }
        })
    }


    function reject(reason) {
        setTimeout(function () {
            if (_this.state === PENDING) {
                _this.state = REJECTED;
                _this.value = value;
                _this.onRejectedFn.forEach(function (fn) {
                    fn(_this.reason);
                });
            }
        })
    }
    try {
        excute(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

// then 方法
// then 方法用来注册当前 Promise 状态落定后的回调，每个 Promise 实例都需要有它，
// 显然要写到 Promise 的原型 prototype 上，并且 then() 函数接收两个回调函数作为参数，
// 分别是 onFulfilled 和 onRejected

myPromise.prototype.then = function (onFulfilled, onRejected) {
    // 如果可选参数不为函数时应该被忽略
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (x) { return x;}
    onRejected = typeof onRejected === 'function' ? onRejected : function (e) { return e; }
    
    var _this = this;
    var promise;
    if (_this.state === FULLFILLED) { 
            promise = new myPromise(function (resolve, reject) {
                setTimeout(function () {
                    try {
                        onFulfilled(_this.value);
                    } catch (reason) {
                        reject(reason);
                    }
                });
            })

    }
    if (_this.state === REJECTED) {
        promise = new myPromise(function (resolve, reject) {
            setTimeout(function () {
                try {
                    onRejected(_this.reason);
                } catch (reason) {
                    reject(reason);
                }
            });
        })
    }

    // 在 PENDING 状态时，需要等到状态落定才能调用。我们可以将 onFulfilled 和 onRejected 函数
    // 存到Promise 的属性 onFulfilledFn 和 onRejectedFn 中，
    // 当状态改变时分别调用它们。
    if (_this.state === PENDING) {
        promise = new myPromise(function (resolve, reject) {
            _this.onFulfilledFn.push(function () {
                try {
                    onFulfilled(_this.value);
                } catch (reason) {
                    reject(reason);
                }
            })
            _this.onRejectedFn.push(function () {
                try {
                    onRejected(_this.reason);
                } catch (reason) {
                    reject(reason);
                }
            })
        });
    }

}

promise();