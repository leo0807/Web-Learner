// 动态为根元素设置字体大小
function init() {
    // 获取屏幕宽度
    let width = document.documentElement.clientWidth;
    // 设置根元素字体大小，此时为宽度的10等分
    document.documentElement.style.fontSize = width / 10 + 'px';
}
// 首次加载应用，设置一次
init()
// 监听移动端，如手机，的旋转事件，重新设置
window.addEventListener('orientationchange', init);
// 监听手机窗口变化，重新设置
window.addEventListener('resize', init);
// 以上即实现了无论窗口如何变化，rem均为width的1/10
// 以上代码需要在dom构建前写入，可放在head的第一个script中执行