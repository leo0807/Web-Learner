/**
优点
1. 支持简单的广播通信，自动通知所有已经订阅过的对象
2. 目标对象与观察者之间的抽象耦合关系能单独扩展以及重用
3. 增加了灵活性
4. 观察者模式所做的工作就是在解耦，让耦合的双方都依赖于抽象，而不是依赖于具体。从而使得各自的变化都不会影响到另一边的变化。

缺点
- 过度使用会导致对象与对象之间的联系弱化，会导致程序难以跟踪维护和理解
 */

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

// E.g.2
class Auctioneer
{
    constructor(){
        this.bidderList = []
    }
    
    announceNewBidderPrice()
    {
        this.notifyBidders();
    }
     
    registerBidder(bidder)
    {
        this.bidderList.push(bidder);
    }
    
    notifyBidders()
    {
        this.bidderList.forEach(bidder => bidder.update())
    }
}


class Bidder 
{
    constructor(name){
        this.name = name
        this.bidPrice = null
    }
    
    update()
    {
        console.log(`${this.name} is offering ${this.bidPrice} dollars`);
        if (this.bidPrice > 500)
        {
            console.log(`Sold to ${this.name}`);
        }
    }
        
    giveNewPrice(price)
    {
        this.bidPrice = price;
    }
}

auctioner = new Auctioneer();
bidder1 = new Bidder("Ross");
auctioner.registerBidder(bidder1);
bidder2 = new Bidder("Joey");
auctioner.registerBidder(bidder2);
bidder1.giveNewPrice(200);
bidder2.giveNewPrice(350);
auctioner.announceNewBidderPrice()
bidder1.giveNewPrice(400);
bidder2.giveNewPrice(550);
auctioner.announceNewBidderPrice()