/**
 * 中介者模式
 * 
 * 中介者相当于扮演了一个权威中介机构，它的作用是在不同的组件或者对象之间扮演一个调节者协助沟通信息
 * 而不是组件或对象直接交流
 * 
 * 使用场景：
 * 1. 系统中对象之间存在比较复杂的引用关系，导致它们之间的依赖关系结构混乱而且难以复用该对象
 * 2. 想通过一个中间类来封装多个类中的行为，而又不想生成太多的子类
 * 3. 提高代码可读性
 * 4. 使得代码更容易维护
 *  
 * 优点：
 * 1. 使各对象之间耦合松散，而且可以独立地改变它们之间的交互；
 * 2. 中介者和对象一对多的关系取代了对象之间的网状多对多关系
 * 3. 如果对象之间的复杂耦合度导致维护很困难，而且耦合度随项目变化增速很快，就需要中介者重构代码
 * 
 * 缺点：
 * 1. 系统中会新增一个中介者对象，因为对象之间交互的复杂性，转换成中介者的复杂性，
 * 使得中介者对象经常是巨大的。中介对象自身可能就是一个难以维护的对象
 */
// E.g.1
class User {
    constructor(name, userId) {
        this.name = name
        this.userId = userId
        this.chatbox = null;
    }
    sendMessage(message, sendTo) {
        this.chatbox.send(message, this, sendTo)
    }
    receiveMessage(message, receiveFrom) {
        console.log(`${receiveFrom.name} sent the message: ${message}`)
    }
}

class ChatBox {

    constructor() {
        this.users = []
    }

    register(user) {
        this.users[user.userId] = user
        user.chatbox = this;
    }

    send(message, receiveFrom, sendTo) {
        sendTo.receiveMessage(message, receiveFrom);
    }
}

var chatbox = new ChatBox();
var joey = new User("Joey", 1);
var phoebe = new User("Phoebe", 2);
chatbox.register(joey);
chatbox.register(phoebe);
joey.sendMessage("Hey, how you doing?", phoebe);
phoebe.sendMessage("Smelly Cat, Smelly Cat..", joey);
joey.sendMessage("I love this song!", phoebe);
// E.g.2
class A {
    constructor() {
        this.number = 0
    }
    setNumber(num, m) {
        this.number = num
        if (m) {
            m.setB()
        }
    }
}
class B {
    constructor() {
        this.number = 0
    }
    setNumber(num, m) {
        this.number = num
        if (m) {
            m.setA()
        }
    }
}
class Mediator {
    constructor(a, b) {
        this.a = a
        this.b = b
    }
    setA() {
        let number = this.b.number
        this.a.setNumber(number * 10)
    }
    setB() {
        let number = this.a.number
        this.b.setNumber(number / 10)
    }
}

let a = new A()
let b = new B()
let m = new Mediator(a, b)
a.setNumber(10, m)
console.log(a.number, b.number)
b.setNumber(10, m)
console.log(a.number, b.number)
// E.g.3
class HR {
    constructor() {
        this.employeeList = []
    }

    registerEmployee(employee) {
        this.employeeList[employee.name] = employee
    }

    scheduleRaise(raise, worker, manager) {
        manager.receiveMessage(worker, raise)
        var ans = manager.finalizeRaise(worker, raise)
        if (ans) {
            worker.receiveRaise(raise)
        }

    }
}

class Employee {
    constructor(hr, name, position, pay) {
        this.hr = hr
        this.name = name
        this.position = position
        this.pay = pay
    }
}

class Manager extends Employee {
    constructor(hr, name, position, pay) {
        super(hr, name, position, pay)
        this.hr.registerEmployee(this)
    }
    receiveMessage(worker, raise) {
        console.log(`${worker.name} should get ${raise} dollar raise`)
    }
    finalizeRaise(worker, raise) {
        console.log(`${worker.name}'s ${raise} dollar raise is approved`)
        return true
    }
}


class Worker extends Employee {
    constructor(hr, name, position, pay) {
        super(hr, name, position, pay)
        this.hr.registerEmployee(this)
    }
    receiveRaise(raise) {
        this.pay += raise
        console.log(`My new pay is ${this.pay} dollars`)
    }
}