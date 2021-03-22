function myInstanceof(left, right) {
    if (typeof left !== 'object' || left === null) return false;
    // 获得对象的原型对象
    let proto = Object.getPrototypeOf(left);
    while (true) {
        // 查到头未找到
        if (proto === null) return false;
        if (proto === right.prototype) return true;
        // 继续寻找
        proto = Object.getPrototypeOf(proto);
    }
}

// typeof 实现原理
// js 在底层存储数据类型的方式

// 000：对象
// 010：浮点数
// 100：字符串
// 110：布尔
// 1：整数
// null：所有机器码均为0
// undefined：用 −2 ^ 30 整数来表示
