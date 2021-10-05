class Circle {
    draw() {
        console.log('Draw a circle');
    }
}

class Decorator {
    constructor(circle) {
        this.circle = circle;
    }
    draw() {
        this.circle.draw();
        this.setRedBorder(circle);
    }
    setRedBorder(circle) {
        console.log('Set a red border');
    }
}
let circle = new Circle();
circle.draw();

let dec = new Decorator(circle);
dec.draw();
// ES7 Decorator
// core-decorators


// 动态地给某个对象添加一些额外的职责，，是一种实现继承的替代方案
// 在不改变原对象的基础上，通过对其进行包装扩展，使原有对象可以满足用户的更复杂需求，而不会影响从这个类中派生的其他对象
// 优点
// 1. 装饰类和被装饰类都只关心自身的核心业务，实现了解耦。
// 2. 方便动态的扩展功能，且提供了比继承更多的灵活性。
// 缺点
// 1. 多层装饰比较复杂。
// 2. 常常会引入许多小对象，看起来比较相似，实际功能大相径庭，从而使得我们的应用程序架构变得复杂起来


class CellPhone {
    creator() {
        console.log('This is a cell phone');
    }
}

class CellPhoneDecorator {
    constructor(cellphone) {
        this.cellphone = cellphone;
    }
    creator() {
        this.cellphone.creator();
        this.createShell();
    }
    createShell() {
        console.log('Create a Shell');
    }
}

let cellphone = new CellPhone();
cellphone.creator();

let cellPhoneDecorator = new CellPhoneDecorator(cellphone);
cellPhoneDecorator.creator();
