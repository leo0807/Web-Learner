class MyPromise{
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
            onFulfilled = () => { return this.value};
        }
        if (typeof onRejected !== 'function') {
            onRejected = () => { throw Error(this.value)};
            // onRejected = () => { return this.value};
        }

        return new MyPromise((resolve, reject) => {
            // then的调用是依据上一个状态
            // 不能无状态就调用then函数
            if (this.status === MyPromise.FULLFILLED) {
                setTimeout(() => {
                    this.parse(onFulfilled(this.value), resolve, reject)
                    try {
                        const result = onFulfilled(this.value);
                        // 返回Promise对象
                        // 将这个Promise的值传给下一个then
                        if (result instanceof MyPromise) {
                                // 不使用return的原因是因为这个直接返回的Promise对象
                                // 要对当前的then进行处理 并传给下一个
                            result.then(resolve, reject);
                        } else {
                            // 返回普通的值
                            resolve(result);
                        }
                        
                    } catch (error) {
                        reject(error);
                    }
                })
            }
            if (this.status === MyPromise.REJECTED) {
                setTimeout(() => {
                    try {
                        const result = onRejected(this.value);
                        if (result instanceof MyPromise) {
                            result.then(resolve, reject);
                        } else {
                            // 用成功的值传递
                            resolve(result);
                        }
                    } catch (error) {
                        reject(error);
                    }
                })
            }
            // 上一状态是pending时候，将待处理函数压入callbacks
            if (this.status === MyPromise.PENDING) {
                this.callbacks.push({
                    // 对象属性名
                    onFulfilled: value => {
                        try {
                            // 传入属性名对应的函数
                            const result = onRejected(this.value);
                            if (result instanceof MyPromise) {
                                result.then(resolve, reject);
                            } else {
                                // 用成功的值传递
                                resolve(result);
                            }
                        } catch (error) {
                            reject(error);
                        }
                    },
                    // 对象属性名
                    onRejected: value => {
                        try {
                            // 传入属性名对应的函数
                            const result = onRejected(this.value);
                            if (result instanceof MyPromise) {
                                result.then(resolve, reject);
                            } else {
                                // 用成功的值传递
                                resolve(result);
                            }
                        } catch (error) {
                            reject(error);
                        }
                    },
                });
            }
        })

    }
    parse = (result, resolve, reject) => {
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
}


let p = new MyPromise((resolve, rejct) => {
    resolve('help');
})

// export default MyPromise;