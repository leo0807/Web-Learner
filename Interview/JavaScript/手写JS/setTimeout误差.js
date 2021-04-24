// 造成误差的原因
// 1. event loop
// 2. 在大多数浏览器中，待用的 tab 页优先级较低，这会对 JavaScript 的定时器造成影响。 IE除外
// 3. 浏览器多线程

let countDown = 100000; // ms 服务器返回的倒计时剩余时间
let countIndex = 1; //倒计时任务执行次数
const timeout = 1000; //触发倒计时任务时间间隙
const startTime = new Date().getTime();

startCountdown(timeout);
function startCountdown(interval) {
    setTimeout(() => {
        const endTime = new Date().getTime();
        // 偏差值
        const deviation = endTime - (startTime + countIndex * timeout);
        console.log(`${countIndex}: 偏差${deviation}ms`);
        countIndex++;
        // 下一次倒计时
        startCountdown(timeout - deviation);
    }, interval);
}