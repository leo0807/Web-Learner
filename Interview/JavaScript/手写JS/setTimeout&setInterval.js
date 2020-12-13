// setInterval 所会遇到的问题
// JS运行机制，普通程序在执行栈中先执行，执行栈为空时候，把任务队列中的回掉函数放入执行栈中执行

// 假设setInterval的间隔为1秒，但是setInterval中的回掉函数需要执行很长时间，比如一个很大的for循环，需要3秒
// 那么setInterval则因执行栈中还有程序运行而无法以1秒为间隔运行，导致代码不按照时间间隔执行，时间间隔错乱

// 用setTimeout来模拟setInterval

function myInterval(func, millisecond) {
    function inside() {
        func();
        setTimeout(inside, millisecond);
    }
    // inside();
    // 如果这里用inside递归的话
    // 虽然结果正确，但是函数inside和函数func全部都在执行栈运行了
    // 而不是在任务队列中，这与setInterval不同
    setTimeout(inside, millisecond);
}
function example() {
    console.log("myInterval");
}
myInterval(example, 1000);
