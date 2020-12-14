1 什么是rem
rem是相对于跟元素(html标签)的字体大小的单位
2 rem实现适配（响应式）的远离
- 核心思想：百分比布局可实现响应式布局，而rem相当于百分比布局;
- 实现手段：动态获取当前视窗宽度width，除以一个固定的数n，得到一个rem rem = width / n;
3 动态计算rem

```
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
```

4 px和rem的选择
- 对于只需要适配少部分手机设备，且分辨率对页面影响不大的，使用px即可
- 对于需要适配各种移动设备，使用rem，例如需要适配iPhone和iPad等分辨率差别比较大的设备
