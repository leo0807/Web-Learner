import '../css/a.css';
import '../css/b.css';

function add(x, y) {
    return x + y;
}
// 下一行eslint所有规则失效
// 即不尽兴eslint检查
// eslint-disable-next-line
console.log(add(2, 3));