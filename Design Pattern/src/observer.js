const { EventEmitter } = require('events');
// 主题，保存状态，状态变化之后触发所有观察者
class Subject{
    constructor(){
        this.state = 0;
        this.observers = [];
    }
    getState(){
        return this.state;
    }
    setState(state){
        this.state = state;
        this.notifyAllObservers();
    }
    notifyAllObservers(){
        this.observers.forEach(observer => {
            observer.update()
        })
    }
    attach(observer){
        this.observers.push(observer);
    }
}

class Observer{
    constructor(name, subject){
        this.name = name;
        this.subject = subject;
        this.subject.attach(this);
    }
    update(){
        console.log(`${this.name} update, state:${this.subject.getState()}`);
    }
}

let s = new Subject();
let o1 = new Observer('o1', s);
let o2 = new Observer('o2', s);
let o3 = new Observer('o3', s);
s.setState(1);
s.setState(2);
s.setState(3);
// 场景
// 网页事件绑定
// Promise
// JQuery callbacks
// nodejs 自定义事件
const eventEmitter = require('events').EventEmitter;

class Dog extends eventEmitter{
    constructor(name){
        super();
        this.name = name;
    }
}

var simon = new Dog('simon');
simon.on('bark', function(){
    console.log(this.name, 'barked');
});
setInterval(function(){
    simon.emit('bark');
}, 1000);
const emitter1 = new EventEmitter();
emitter1.on('some', info =>{
    console.log('fn1', info);
});
emitter1.on('some', info => {
    console.log('fn2', info);
});
emitter1.emit('some', 'xxxx');
