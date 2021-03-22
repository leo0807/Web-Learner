function mySetTimeout(fn, time, ...args) {
    // Initial current time
    //  + 转化为Number型 便于运算
    const start = +new Date();
    let timer, now;
    const loop = () => {
        timer = window.requestAnimationFrame(loop);
        // Get current time
        now = +new Date();
        if (now - start >= time) {
            // fn.apply(this,...args);
            fn(...args);
            window.cancelAnimationFrame(timer);
        }
    }
    window.requestAnimationFrame(loop);
}
function log() {
    console.log('Something');
}
// mySetTimeout(log, 1000);
function mySetTimeout(cb, time) {
    const t = Date.now()
    return new Promise(resolve => {
        const looper = () => {
            const rnf = requestAnimationFrame(looper)
            if (Date.now() >= t + time) {
                cb()
                cancelAnimationFrame(rnf)
                resolve()
            }
        }
        requestAnimationFrame(looper)
    })
}

setTimeout(() => {
    console.log('first');
}, 1000);
mySetTimeout(() => {
    console.log('second');
}, 1000)


function promiseWithTimeout(url, timeout = 3000) {
    return new Promise((resolve, reject) => {
        fetch(url).then(data => data.json()).then(data => resolve(data)); // fetch 先得到结果就 resolve
        setTimeout(() => reject(Error('time is out!')), timeout); // 时间到了还没 fetch 到就 reject
    });
}

promiseWithTimeout('http://localhost:8080/data.json')
    .then(data => console.log(data))
    .catch(err => console.error(err));

// server.js 测试
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: '*' }));

app.use('/data.json', (req, res) => {
    setTimeout(() => res.end(JSON.stringify({ a: 1 })), Math.floor(Math.random() * 6 * 1000));
});

app.listen(8080, () => console.log('the app is running at http://localhost:8080'));