var 可以被重复定义，允许值的修改， 可以声明提升 Hoisting， 无块级作用域
let 不可以被重复定义，允许值的修改， 不可以声明提升， 有块级作用域
const 不可以被重复定义，不允许值的修改；若存储内容为对象（引用类型）则可以修改， 不可以声明提升， 有块级作用域


# ES5模拟实现 let 和 const
## let
```
(function () {
    for (var i = 0; i < 5; i++) {
        console.log(i);
    }
}());

console.log(i); => Error
```
Babel 对let 编译前后的结果
```
for (let i = 0; i < 5; i++) {
    console.log(i);
}
console.log(i)
```
Babel 编译之后
```
for(var \_i = 0; \_i < 5; i++){
    console.log(\_i);
}
console.log(i);
```
## var

1. 数据描述符与存取描述符皆可修改:
configurable：当前对象元素的属性描述符是否可改，是否可删除
enumerable：当前对象元素是否可枚举
2. 由于 ES5 环境没有 block 的概念，所以是无法百分百实现 const，只能是挂载到某个对象下，
要么是全局的 window，要么就是自定义一个 object 来当容器

```
var __const = function __const(data, value){
    // 把要定义的 data 挂载到 window 下，并赋值 value
    window.data = value;
    // 利用 Object.defineProperty 的能力劫持当前对象，并修改其属性描述符
    Object.defineProperty(window, data, {
        enumerable: false,
        configurable: false,
        get: function(){
            return value;
        },
        set: function(data){
            if(data !== value){
                throw new TypeError('Assignment to constant variable.')
            }else{
                return value;
            }
        }
    })

    __const('a', 10);
    console.log(a);
    delete a;
    console.log(a);
    for(let item in window){
        // 因为 const 定义的属性在 global 下也是不存在的，所以用到了 enumerable: false 来模拟这一功能
        if(item === 'a'){ // 因为不可枚举，所以不执行
            console.log(window[item]);
        }
    }
    a = 20; // 报错
} 
```