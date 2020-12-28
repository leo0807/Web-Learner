// 实现思路
// 创建一个对象
// 在该对象上创建一个缓存列表（调度中心）
// on 方法用来把函数 fn 都加到缓存列表中（订阅者注册事件到调度中心）
// emit 方法取到 arguments 里第一个当做 event，根据 event 值去执行对应缓存列表中的函数（发布者发布事件到调度中心，调度中心处理代码）
// off 方法可以根据 event 值取消订阅（取消订阅）
// once 方法只监听一次，调用完毕后删除缓存函数（订阅一次）

class EventEmitter {
    constructor() {
        // 缓存列表
        this.list = {};
        // 类似于事件缓存池
    }
    // 订阅
    on(event, fn) {
        let _this = this;
        // 如果对象中没有对应的Event值，也就是说明没有订阅过，就给Event创建个缓存列表
        // 如果对象中有Event，就把fn添加到对应的缓存列表里
        (_this.list[event] || (_this.list[event] = [])).push(fn);
        return _this;
    }
    // 监听一次
    once(event, fn) {
        // 先绑定，调用后删除
        let _this = this;
        function on() {
            _this.off(event, on);
            fn.apply(_this, arguments);
        }
        on.fn = fn;
        _this.on(event, on);
        return _this;
    }
    // 取消订阅
    off(event, fn) {
        let _this = this;
        let fns = _this.list[event];
        // 如果缓存列表中没有对应的fn，返回false
        if (!fns) return false;
        if (!fn) {
            // 如果没有传fn的话，就将event中对应的缓存列表中的fn全部清空
            fns && (fns.length = 0);
        } else {
            // 若有fn，遍历缓存列表，看看传入的fn与哪个函数相同，如果相同就直接从列表中删除即可
            let cb;
            for (let i = 0, cbLen = fns.length; i < cbLen; i++) {
                cb = fns[i];
                if (cb === nf || cb.fn === fn) {
                    fns.splice(i, 1);
                    break;
                }
            }
        }
        return _this;
    }
    // 发布
    emit() {
        let _this = this;
        // 第一个参数是对应的event值，直接用数组shift方法取出
        let event = [].shift.call(arguments),
            fns = [_this.list[event]];
        // 如果缓存里没有fn，直接返回false
        if (!fns || fns.length === 0) {
            return false;
        }
        // 遍历所有event值对应的缓存列表，依次执行fn
        fns.forEach(fn => {
            fn.apply(_this.arguments);
        })
        return _this;
    }
}