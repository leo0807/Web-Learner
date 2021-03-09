// 1 META 方式
// <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />
// 该meta标签的作用是让当前viewport的宽度等于设备的宽度，同时不允许用户手动缩放。

// 其中 maximum - scale为允许用户的最大缩放值，user - scalable为是否允许用户进行缩放，yes(默认)代表允许，no(0)代表不允许，两者结合使用可以阻止页面被放大（经测试，少一项都达不到效果）
// ————————————————
// 版权声明：本文为CSDN博主「xiaozhi_free」的原创文章，遵循CC 4.0 BY - SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/xiaozhi_free/article/details/80541013


// 2 禁止双指放大
document.documentElement.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, false);

// 3 禁止双击放大
let lastTouchEnd = 0;
document.documentElement.addEventListener('touchend', function (event) {
    let now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);
