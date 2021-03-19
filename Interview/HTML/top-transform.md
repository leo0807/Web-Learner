# 最首要的区别是元素位置：
1. 使用 top， left 定位是直接改变元素**真实位置**的，简单来说你 top: 5px 那就真的是**离父容器上端** 5px 或者偏离顶部定位 5px（这里我们不讨论 position 各种定位的破事）

但是你用 transform: translateY(-5px) 只是改变了**视觉位置**，元素本身位置还是在 0px，只是视觉上向上偏移了 5px。这一点对于 css 布局是非常重要的，因为大多数情况下你不希望一个元素在动画的时候（比如飞离 fade off）会导致父元素大小改变然后导致 siblings 元素位置变动从而导致集体 shaking，所以很多时候我们用 transform。

2. 其次的区别是这两种定位本身的语法：

做效果的时候 transform 相对来说是比较方便的，因为 transform 的视角是**元素本身**，所以比较直观。比如你希望一个元素向左飞 50px 那就是 transform: translateX(-50px)，但是如果用 left 而你的父子元素都是 position: absolute，那可能你用 left 就要写成从 left: 100px 到 left: 30px，这就很不直观。

3. 最后的区别是效率：
由于 transform **不改动 css 布局**，因为渲染行为大多数情况下在元素本身，所以效率比 top left 要高。另外在早期的一些版本，用 transform: translateZ(0px) 强制开启硬件加速好像只能应用在 transform 上，不知道现在这个东西改了没。
