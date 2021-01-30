// 直接创建
// 工厂模式
// 构造函数
// 原型方式
// 构造和原型的混合方式
// 动态原型方式




// 直接创建
var man = {
    name: 'key',
    age: 18,
    sex: '男',
    say: function () {
        alert('hello world');
    }
}
// 优点：简单快速。 缺点：限制了对象的重用。

// 工厂模式
function createMan(name, age, sex) {
    var man = new Object();
    man.name = name;
    man.age = age;
    man.sex = sex;
    man.say = function () {
        alert('hello world');
    }
    return man;
}
var key = createMan('key', 18, '男');
// 优点：使用这种方法能够不断重复的创建对象。 缺点：无法识别对象类型，每个对象都有自己的say 函数，不能共享同一个函数，造成内存的浪费。
// 构造函数
function Man(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
    this.say = function () {
        alert('hello world');
    }
}
var key = new Man('key', 18, '男');
// 优点：使用这种方法能够重复的创建对象，并且能够识别对象的类型。 缺点：每个对象都有自己的say 函数，不能共享同一个函数，造成内存的浪费。
// 原型方式
function Man() { };
Man.prototype.name = 'key';
Man.prototype.age = 18;
Man.prototype.sex = '男';
Man.prototype.say = function () {
    alert('hello world');
};
var key = new Man();
// 优点：能够共享一个函数。 缺点：构造函数没有参数，不能通过构造函数初始化属性值；属性是对象时被多个实例共享容易产生问题。


// 构造和原型的混合方式
function Man(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
}
Man.prototype.say = function () {//写在构造方法外面
    alert('hello world');
}
var key = new Man('key', 18, '男');
// 优点：所有非函数属性都在构造函数创建，可以用构造函数赋予属性默认值，所有实例共享一个方法，没有浪费内存，没有副作用【推荐】。



// 动态原型方式
function Man(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
    if (typeof Man.init == 'undefined') {
        Man.prototype.say = function () {
            alert('hello world');
        }
        Man.init = true;
    }
    //这里将Man.prototype.say写在了构造方法里面,只为了更友好的编码风格。
    //这里的Man.init是私有属性，目的在于使Man.prototype.say创建并只执行一次，其实就是一个标志位，一旦Man.init=true,就不满足条件，就不再执行了。
}
var key = new Man('key', 18, '男');
//     优点：动态原型创建对象的方法与构造函数和原型混合方式相同，即在构造函数内定义非函数属性，而函数属性则利用原型属性定义。唯一的区别是赋予对象方法的位置，即提供更友好的编码风格。

// 作者：胜天半子bibi酱
// 链接：https://juejin.cn/post/6844903565987676168
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。