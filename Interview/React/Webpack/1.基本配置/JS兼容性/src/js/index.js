import '../css/a.css';
import '../css/b.css';
// import '@babel/polyfill';

function add(x, y) {
    return x + y;
}
// 下一行eslint所有规则失效
// 即不尽兴eslint检查
// eslint-disable-next-line
console.log(add(2, 3));

const promise = new Promise((resolve) => {
    setTimeout(() => {
        console.log("定时器执行完了");
        resolve();
    }, 1000);
})

console.log(promise);