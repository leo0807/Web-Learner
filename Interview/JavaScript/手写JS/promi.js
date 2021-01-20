// Promise 构造函数是同步执行，then 方法是异步执行

class MyPromise {
    static PENDING = "pending";
    static FULLFILLED = "fullilled";
    static REJECTED = "rejected";

    constructor(executor) {
        this.status = MyPromise.PENDING;
        this.value = null;
        // 存放异步中的状态
        // 等pending状态改变时候在进行调用
        this.callbacks = [];
        try {
            executor(this.resolve, this.rejct);
        } catch (error) {
            this.rejct(error);
        }
    }
    // resolve
    resolve = value => {
        // resolve(value){
        // console.log(this);
        if (this.status === MyPromise.PENDING) {
            this.status = MyPromise.FULLFILLED;
            this.value = value;
            // 读取异步空间中的函数
            setTimeout(() => {
                this.callbacks.map(callback => {
                    callback.onFulfilled(value);
                })
            })
        }

    }
    // reject
    rejct = reason => {
        // 不能连续修改status的值
        if (this.status === MyPromise.PENDING) {
            this.status = MyPromise.REJECTED;
            this.value = reason;
            // 读取异步空间中的函数
            setTimeout(() => {
                this.callbacks.map(callback => {
                    callback.onRejected(reason);
                })
            })
        }
    }
    // then
    then = (onFulfilled, onRejected) => {
        // 封装允许传空值
        if (typeof onFulfilled !== 'function') {
            // 允许穿透
            onFulfilled = () => { return this.value };
        }
        if (typeof onRejected !== 'function') {
            onRejected = () => { throw Error(this.value) };
            // onRejected = () => { return this.value};
        }

        let promise = new MyPromise((resolve, reject) => {
            // then的调用是依据上一个状态
            // 不能无状态就调用then函数
            if (this.status === MyPromise.FULLFILLED) {
                setTimeout(() => {
                    this.parse(promise, onFulfilled(this.value), resolve, reject);
                })
            }
            if (this.status === MyPromise.REJECTED) {
                setTimeout(() => {
                    this.parse(promise, onRejected(this.value), resolve, reject);
                })
            }
            // 上一状态是pending时候，将待处理函数压入callbacks
            if (this.status === MyPromise.PENDING) {
                this.callbacks.push({
                    // 对象属性名
                    onFulfilled: value => {
                        // 不使用this 的原因 -- 此处调用的是callbacks的value
                        this.parse(promise, onFulfilled(value), resolve, reject);
                    },
                    // 对象属性名
                    onRejected: value => {
                        this.parse(promise, onRejected(value), resolve, reject);
                    },
                });
            }
            return promise;
        })

    }
    parse = (promise, result, resolve, reject) => {
        // 死循环 双重返回
        // 不在当前promise中，再返回promise
        if (promise === result) {
            throw TypeError("Chaning cycle detected")
        }
        try {
            if (result instanceof MyPromise) {
                result.then(resolve, reject);
            } else {
                // 用成功的值传递
                resolve(result);
            }
        } catch (error) {
            reject(error);
        }
    }
    // 实现resolve 和 reject
    static resolve(value) {
        return new MyPromise((resolve, reject) => {
            if (value instanceof MyPromise) {
                value.then(resolve, reject);
            } else {
                resolve(value);
            }
        })
    }
    static reject(value) {
        return new MyPromise((resolve, reject) => {
            if (value instanceof MyPromise) {
                value.then(resolve, reject);
            } else {
                reject(value);
            }
        })
    }

    // ALL 需要全部成功
    static all(promises) {
        let values = [];
        return new MyPromise((resolve, reject) => {
            promises.forEach(promise => {
                promise.then(
                    value => {
                        values.push(value);
                        if (values.length == promises.length) {
                            // 所有都成功
                            resolve(values);
                        }
                    },
                    reason => {
                        reject(reason);
                    }
                )
            })
        })
    }
    // race 谁快用谁
    static race(promises) {
        return new MyPromise((resolve, reject) => {
            promises.map(promise => {
                promise.then(
                    value => {
                        resolve(value);
                    },
                    reason => {
                        reject(reason);
                    }
                )
            })
        })
    }
}


let p = new MyPromise((resolve, rejct) => {
    resolve('help');
})

// export default MyPromise;