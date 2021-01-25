function myInstanceof(left, right) {
    if (typeof left !== 'object' || left === null) return false;
    // 获得对象的原型对象
    let proto = Object.getPrototypeOf(left);
    while (true) {
        // 查到头未找到
        if (proto === null) return false;
        if (proto === right.prototype) return true;
        // 继续寻找
        proto = Object.getPrototypeOf(left);
    }
}