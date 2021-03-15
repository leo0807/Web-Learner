// 1、Promises/A+标准：原Promise对象的状态将跟新对象保持一致。
// 利用这一特性，当新对象保持“pending”状态时，原Promise链将会中止执行。

Promise.resolve().then(()=>{
    console.log('ok1');
    return new Promise(()=>{}) // 返回“pending”状态的Promise对象
})..then(() => {
    // 后续的函数不会被调用
    console.log('ok2');
}).catch((err) => {
    console.log('err->', err)
});

// 2、Promise.race竞速方法
// 利用这一特性，也能达到后续的Promise不再执行
let p1 = new Promise((resolve, reject)=>{
    resolve('ok1');
})

let p2 = new Promise((resolve, reject)=>{
    setTimeout(() => {
        resolve('ok2');
    }, 10);
})

Promise.race([p2, p2]).then(result=>{
    console.log(result); //ok1
}).catch((err)=>{
    console.log(err);
})

// 3、当Promise链中抛出一个错误时，错误信息沿着链路向后传递，直至被捕获。
// 利用这一特性能跳过链中被捕获前的函数的调用，直至链路终点。

Promise.resolve().then(() => {
    console.log('ok1')
    throw 'throw error1'
}).then(() => {
    console.log('ok2')
}, err => {     
    // 捕获错误
    console.log('err->', err)
}).then(() => {   
    // 该函数将被调用
    console.log('ok3')
    throw 'throw error3'
}).then(() => {
    // 错误捕获前的函数不会被调用
    console.log('ok4')
}).catch(err => {
    console.log('err->', err)
})

// 输出结果
// ok1
// err-> throw error1
// ok3
// err-> throw error3