class Test{
    // 定义实例属性 即 需要通过new实例化访问
    name: string = 'junx';
    age: number = 18;
    // 静态属性 通过static Test.prop
    static readonly addres = 'somewhere';
    static sayHello() {
        console.log('Hello');
        
    }

}
let t = new Test();
console.log(t.name, t.age);
Test.sayHello();