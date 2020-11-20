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