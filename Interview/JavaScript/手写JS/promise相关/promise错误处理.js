// 捕获多个promise
let pro1 = Promise.resolve(1).catch(function (err) { return err });
let pro2 = Promise.resolve(2).catch(function (err) { return err });
let pro3 = Promise.resolve(3).catch(function (err) { return err });
// 为每个promise关联一个错误的处理函数
Promise.all([pro1, pro2, pro3]).then(values => console.log(values)).catch(function (err) {
    console.log(1);
})