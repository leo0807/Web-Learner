- 如何看待nodejs可支持高并发
1. NodeJS是单线程架构模型；
NodeJS实际上不是真正的单线程架构，因为NodeJS还存在着I/O线程（网络I/O和磁盘I/O。这些线程是由更底层的```libuv```处理，这部分线程对于开发者来说是透明的。

2. 单线程的优点：
- 只有一个线程，省去了切换其他线程的开销；
- 无须担心线程同步的问题；
单线程的缺点：
- 无法充分利用CPU的资源
- 一旦单线程崩溃，则整个App也直接挂掉
- 因为只能利用一个CPU，一旦这个CPU被某一个计算一直占用，CPU得不到释放，后续的请求就会被一直挂起，无法及时响应
3. 核心：事件h

### require的模块加载机制
1. 先计算模块路径
2. 如果模块在缓存里面，则从缓存中取出
3. 加载模块
4. 输出模块的exports属性即可
```
// require 其实内部调用 Module.\_load 方法
Module.\_load = function(request, parent, isMain) {
    // 计算绝对路径
    var filename = Module.\_resolveFilename(request, parent);

    // 第一步：如果有缓存，取出缓存
    var cachedModule = Module.\_cache[filename];
    if (cachedModule) {
    return cachedModule.exports;

    // 第二步：是否为内置模块
    if (NativeModule.exists(filename)) {
        return NativeModule.require(filename);
    }

    /**************\*\*\*\***************这里注意了************\*\*************/
    // 第三步：生成模块实例，存入缓存
    // 这里的 Module 就是我们上面的 1.1 定义的 Module
    var module = new Module(filename, parent);
    Module.\_cache[filename] = module;

    /**************\*\*\*\***************这里注意了************\*\*************/
    // 第四步：加载模块
    // 下面的 module.load 实际上是 Module 原型上有一个方法叫 Module.prototype.load
    try {
        module.load(filename);
        hadException = false;
    } finally {
        if (hadException) {
            delete Module.\_cache[filename];
        }
    }

    // 第五步：输出模块的 exports 属性
    return module.exports;
};

```