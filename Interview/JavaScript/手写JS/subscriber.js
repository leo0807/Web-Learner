class EventEmitterJS {
    constructor() {
        // 事件对象，存放订阅的名字和事件
        this.events = {};
    }
    // 订阅事件
    on(eventName, callback) {
        if (!this.events[eventName]) {
            // 一个名字可以订阅多个事件
            this.events[eventName] = [callback];
        } else {
            this.events[eventName].push(callback);
        }
    }
    // 触发事件
    emit(evenName) {
        // 遍历事件
        this.events[evenName] && this.events[evenName].forEach(callback => callback());
    }
    // 移除订阅事件
    removeListener(eventName, callback) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
        }
    }
    // 只执行一次的函数，执行完毕移除
    once(eventName, callback) {
        // 绑定fn，执行的时候触发fn
        let fn = () => {
            callback(); //通过fn调用callback函数
            this.removeListener(eventName, fn); //执行完毕删除fn
        }
        this.on(eventName, fn)
    }
}

let em = new EventEmitterJS();
let workday = 0;
em.on("work", function () {
    workday++;
    console.log("work everyday");
})
em.once("love", function () {
    console.log("just love you");
})
function makeMoney() {
    console.log("make one billion money");
}
em.on("money", makeMoney);

let time = setInterval(() => {
    em.emit("work");
    em.removeListener("money", makeMoney);
    em.emit("money");
    em.emit("love");
    if (workday === 5) {
        console.log("have a rest");
        clearInterval(time);
    }
})
/**
 * 1. 可以广泛应用于异步编程，它可以代替我们传统的回调函数,
 *    我们不需要关注对象在异步执行阶段的内部状态，我们只关心事件完成的时间点。
 * 2. 取代对象之间硬编码通知机制，一个对象不必显式调用另一个对象的接口，而是松耦合的联系在一起
 *    虽然不知道彼此的细节，但不影响相互通信。更重要的是，其中一个对象改变不会影响另一个对象。
 */