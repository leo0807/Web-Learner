import '../css/a.css';
import '../css/b.css';
// import '@babel/polyfill';
import print from './print';
function add(x, y) {
    return x + y;
}
// 下一行eslint所有规则失效
// 即不尽兴eslint检查
// eslint-disable-next-line
console.log(add(2, 3));
print();
const promise = new Promise((resolve) => {
    setTimeout(() => {
        console.log("定时器执行完了");
        resolve();
    }, 1000);
})

console.log(promise);
// @ts-ignore
if (module.hot) {
    // 一旦module。hot为true，说明开启了HMR功能，让HMR功能代码生效
    // @ts-ignore
    module.hot.accept('./print.js', function () {
        // 方法会监听print。js文件的变化，一旦发生变化，其他文件不会重新打包构建
        // 会执行后面的回掉函数
        print();
    })
}