class Test{
    // 定义实例属性 即 需要通过new实例化访问
    name: string = 'junx';
    age: number = 18;
    private gender:boolean;
    // 静态属性 通过static Test.prop
    static readonly addres = 'somewhere';
    static sayHello() {
        console.log('Hello');
        
    }
    // 属性存储器
    get gender(){
        return this.gender;
    }
    set gender(val:boolean){
        this.gender = val;
    }

}
let t = new Test();
console.log(t.name, t.age);
Test.sayHello();

// 抽象类 abstract 不能被实例化
// 抽象方法 没有方法体 且子类必须重写抽象方法
// 接口 类型声明 可以重复声明， 重复后可以合并 满足特定要求 是一种限制
type myType = { //别名
    name: string,
    age: number
}
interface myInterface{
    name: string,
    age: number
}
interface myInterface{
    gender: boolean
}

// 类似于抽象方法 只能定义结构，无法定义实际值
interface myInter{
    name: string,
    sayHello(): void;
}

class Myclass implements myInter{
    name: string;
    constructor(name){
        this.name = name;
    }
    sayHello(){
        console.log('Hello');
        
    }
}

// protected 只能在当前类或者当前类的子类访问

// 泛型
function fn<T>(params:T):T {
    return params;
}

function fn2<T,K>(params:T, a: K):T {
    return params,a;
}
function fn3<string,number>(params:string, a: number):T {
    return params,a;
}
function fn4<T extends myInter,number>(params:T, a: number):T {
    return params,a;
}

class My<T>{
    name: T;
}