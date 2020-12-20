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
mySetTimeout(log, 1000);