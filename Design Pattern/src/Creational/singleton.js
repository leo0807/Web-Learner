class SingleObject {
    login() {
        console.log('login');
    }
}

SingleObject.getInstance = (function () {
    let instance;
    return function () {
        if (!instance) {
            instance = new SingleObject();
        }
        return instance;
    }
})()

/**
 * - 场景
 * 1. JQuery 只有一个 $
 * 2. 提供单一项服务，如过Vuex和Redux的store， 登录框， 命名空间
 * 3. 数据库连接， 提供数据库连接，如MongoDB就使用了单例模式
 * 4. 配置文件，国际化配置文件等
 * 
 * - 优点
 * 1. 划分命名空间， 减少全局变量
 * 2. 增强模块性，把自己的代码组织在一个全局变量名下，放在单一位置，便于维护
 * 3. 只需要实例化一次，简化代码的调试和维护
 * 
 * - 缺点
 * 1. 单例模式只提供一种单点访问，所以可能导致模块间等强耦合，从而不利于单元测试。无法单独测试一个调用了来自单例的方法的类
 * 而只能把它与那个单例作为一个单元一起测试
 */


let instance = null;
class Printer {
    constructor(pages) {
        this.display = function () {
            console.log(`You are connected to the printer. You want to print ${pages} pages.`);
        }
    }
    static getInstance(numOfPages) {
        if (!instance) {
            instance = new Printer(numOfPages);
        }
        return instance;
    }
}

var obj1 = Printer.getInstance(2)
console.log(obj1)
obj1.display()
var obj2 = Printer.getInstance(3)
console.log(obj2)
obj2.display()
console.log(obj2 == obj1)