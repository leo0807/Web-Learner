class Product {
    constructor(name) {
        this.name = name;
    }
    init() {
        alert('init');
    }
    func1() {
        alert('func1');
    }
    func2() {
        alert('func2');
    }
    func3() {
        alert('fun3');
    }
}
class Creator {
    create(name) {
        return new Product(name);
    }
}
let creator = new Creator();
let p = creator.create('p1');
p.init();
p.func1();

// 场景
// React.createElement

/**
 * 什么时候使用工厂模式
 *
 * 1. 当多个object有相类似的属性，且需要被创建的时候
 * 2. 需要被初始化的object的类型无法被确认的时候
 * 3. 需要生成一个复杂的object的初始化过程
 */


tfunction ToyFactory() {
    this.toy = ToyDuck;
    this.createToy = function (toyChosen) {
        if (toyChosen.toyType == "duck") {
            this.toy = ToyDuck;
        } else if (toyChosen.toyType == "car") {
            this.toy = ToyCar;
        }
        return new this.toy(toyChosen);
    }
}

function ToyDuck(toyObj) {
    this.color = toyObj.color;
    this.price = toyObj.price;
}

function ToyCar(toyObj) {
    this.color = toyObj.color;
    this.price = toyObj.price;
    this.name = toyObj.name;
}

var toyFactory = new ToyFactory();
var car = toyFactory.createToy({
    toyType: "car",
    color: "blue",
    price: 12,
    name: "honda"
})

var car = toyFactory.createToy({
    toyType: "car",
    color: "blue",
    price: 12,
    name: "honda"
})

console.log(car)
console.log(car instanceof ToyCar)

var duck = toyFactory.createToy({
    toyType: "duck",
    color: "yellow",
    price: 5,
})

console.log(duck)
console.log(duck instanceof ToyDuck)