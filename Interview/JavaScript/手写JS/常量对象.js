// 来源：https://www.jianshu.com/p/a6817f21bdbb
function constObj(obj) {
    // 获取定义在obj上的属性名
    let propNames = Object.getOwnPropertyNames(obj);
    // 在冻结自身之前冻结属性
    propNames.forEach(function (name) {
        let prop = obj[name];
        // 如果prop是个对象，冻结它
        if (typeof prop === 'object' && prop !== null) {
            obj[name] = constObj(prop);
        }
    });
    // 冻结自身
    Object.freeze(obj);
    return new Proxy(obj, {
        get(target, p) {
            if (!target.hasOwnProperty(p)) {
                throw new Error(`${p} no exist`);
            } else {
                return target[p];
            }
        },
        set(target, p, value) {
            throw new TypeError('const type cannot modified');
        }
    })
}