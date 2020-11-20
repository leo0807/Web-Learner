const prototype = {
    getName: function(){
        return this.first + ' ' +this.last;
    },
    say: function(){
        alert('Hello');
    }
}

let x = Object.create(prototype);
x.first = 'A';
x.last = 'B';
alert(x.getName());
x.say();

let y = Object.create(prototype);
y.first = 'C';
y.last = 'D';
alert(y.getName());
y.say();
// 用在实例化对象很复杂或者代价很大的情况（new）
// 使用原型进行复制

// 组合模式
// 生成树形结构，表示“整体-部分” 关系
// 让整体和部分有一致的操作目的 =》 相同的数据结构
// 虚拟DOM中的vnode 是这种形式，但数据类型简单，其他JS经典应用中未找到这么复杂的数据类型
// JS实现菜单算业务不算经典应用
// 虚拟DOM是把HTML转化为树形数据结构
// 整体和单个节点的操作抽象化，操作和数据结构一样

// 享元模式
// 1.共享内存 主要考虑内存，而非效率
// 2.相同的数据，共享使用 相同的部分抽象出来

// 策略模式
// 1.不同策略不同处理
// 2.避免使用大量 switch 或 if-else
//Code Example

class User{
    constructor(type){
        this.type = type;
    }
    buy(){
        if(this.type === 'ordinary'){
            console.log('Genral User Purchase');
        }
        else if(this.type === 'member'){
            console.log('Member User Purchase');
        }
        else if(this.type === 'vip'){
            console.log('VIP User Purchase');
        }
    }
}

let u1 = new User('orinary');
let u2 = new User('member');
let u3 = new User('vip');
u1.buy();
u2.buy();
u3.buy();

// Turn to 
class OridinaryUser{
    buy(){
        console.log(1);
    }
}
class Member{
    buy(){
        console.log(2);
    }
}
class VIP{
    buy(){
        console.log(3);
    }
}

// 模版方法模式

// class Action{
//     handle(){
//         handle1();
//         handle2();
//         handle3();
//     }
//     handle1(){console.log('something')};
//     handle2(){console.log('something')};
//     handle3(){console.log('something')};
// }

// 责任链模式

class Action{
    constructor(name){
        this.name = name;
        this.nextAction = null;
    }
    serNextAction(action){
        this.nextAction = action;
    }
    handle(){
        console.log(`${this.name} 审批`);
        if(this.nextAction != null){
            this.nextAction.handle();
        }
    }
}
let a1 = new Action('Group Leader');
let a2 = new Action('Product Manager');
let a3 = new Action('Primary Leader');
a1.serNextAction(a2);
a2.serNextAction(a3);
a1.handle();

// Command Mode
class Receiver{
    exec(){
        console.log('Execute');
    }
}

class Commadn{
    constructor(receiver){
        this.receiver = receiver;
    }
    cmd(){
        console.log('Execute the command');
        this.receiver.exec();
    }
}

class Invoker{
    constructor(command){
        this.command = command;
    }
    invoke(){
        console.log('Start');
        this.command.cmd();
    }
}

const soldier = new Receiver();
const trumpeter = new Commadn(soldier);
const general = new Invoker(trumpeter);
general.invoke();
// Application

// 网页富文本编辑器操作，浏览器封装了一个命令对象
// document.execCommand('bold');

// 命令对象与执行对象分开

// 备忘录模式
// 随时记录一个对象的状态变化
// 随时可恢复之前的对象 撤销func
// Code Example 

class Memento{
    constructor(content){
        this.content = content;
    }
    getContent(){
        return this.content;
    }
}

class CareTaker{
    constructor(){
        this.list = [];
    }
    add(memento){
        this.list.push(memento);
    }
    get(index){
        return this.list[index];
    }
}

class Editor{
    constructor(){
        this.content = null;
    }
    setContent(content){
        this.content = content;
    }
    getContent(){
        return this.content;
    }
    saveContentToMemento(){
        return new Memento(this.content);
    }
    getContentFromMemento(memento){
        this.content = memento.getContent();
    }
}

const editor = new Editor();
const careTaker = new CareTaker();

editor.setContent('111');
editor.setContent('222');
careTaker.add(editor.saveContentToMemento());
editor.setContent('333');
careTaker.add(editor.saveContentToMemento());
editor.setContent('444');

console.log(editor.getContent());
editor.getContentFromMemento(careTaker.get(1));
editor.getContentFromMemento(careTaker.get(0));

// 中介者模式
class A{
    constructor(){
        this.number = 0;
    }
    setNumber(number, m){
        this.number = num;
        if(m){
            m.setB()
        }
    }
}
class B{
    constructor(){
        this.number = 0;
    }
    setNumber(number, m){
        this.number = num;
        if(m){
            m.setA()
        }
    }
}

class Mediator{
    constructor(a, b){
        this.a = a;
        this.b = b;
    }
    setB(){
        let number = this.b.number;
        this.b.setNumber(number*100);
    }
    setA(){
        let number = this.a.number;
        this.a.setNumber(number/  100);
    }
}
const a = new A();
const b = new B();
const m = Mediator(a. b);
a.setNumber(100, m);
console.log(a.number, b.number);
b.setNumber(100, m);
console.log(a.number, b.number);
