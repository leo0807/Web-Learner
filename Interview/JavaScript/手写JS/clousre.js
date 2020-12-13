for (var i = 0; i < 5; i++){
    setTimeout(function () {
        console.log(i++);
    }, 1000)
}
// console.log(i);
// js是单线程的会把setTimeout放在任务队列中执行 且var 的作用域大于setTimeout

// 修改的方法为
// 1. 将setTimeout 改为立即执行函数
// 2. 将var改为let