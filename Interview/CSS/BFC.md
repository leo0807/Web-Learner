# BFC => Box Formatting context

- BFC主要作用**隔离保护**就是一个相对独立的布局环境，它内部元素的布局不受外面布局的影响。
- 它可以通过以下任何一种方式来创建： 
具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。
- BFC 就是块级格式上下文，是页面盒模型布局中的一种 CSS 渲染模式，**相当于一个独立的容器**，里面的元素和外部的元素相互不影响。

# 创建 BFC 的方式有：
1. 根元素或包含根元素的元素
2. 浮动元素（元素的 float 不是 none）
3. 绝对定位元素（元素的 position 为 absolute 或 fixed）
4. 行内块元素（元素的 display 为 inline-block）
5. 表格单元格（元素的 display 为 table-cell，HTML 表格单元格默认为该值）
6. 表格标题（元素的 display 为 table-caption，HTML 表格标题默认为该值）
7. 匿名表格单元格元素（元素的 display 为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是 HTML table、row、tbody、thead、tfoot 的默认属性）或 inline-table）
8. overflow 值不为 visible 的块元素
9. display 值为 flow-root 的元素
10. contain 值为 layout、content 或 strict 的元素
11. 弹性元素（display 为 flex 或 inline-flex 元素的直接子元素）
12. 网格元素（display 为 grid 或 inline-grid 元素的直接子元素）
13. 多列容器（元素的 column-count 或 column-width 不为 auto，包括 column-count 为 1）
14. column-span 为 all 的元素始终会创建一个新的 BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）。


具体实例：https://zhuanlan.zhihu.com/p/25321647
# BFC 主要的作用是：
1. 清除浮动,浮动的元素会脱离普通文档流

2. 防止同一 BFC 容器中的相邻元素间的**外边距重叠**问题
    - 两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值;
    - 两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值;
    - 两个外边距一正一负时，折叠结果是两者的相加的和;

3. BFC 可以阻止元素被浮动元素覆盖
如，文本环绕时候，设置float的元素会覆盖其他元素；如果不想产生覆盖效果，可以将被覆盖元素设置BFC
4. 子元素 float 父元素的高度不会撑开
例子：https://segmentfault.com/a/1190000013527324


# BFC原则
1. 内部的 box 会一个接一个地垂直布局。
2. 两个相邻 box 的垂直距离由 margin 决定。属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠
3. 每个盒子的左外边框紧挨着左边框的包含块(从左往右的格式化时，否则相反)。即使存在浮动也是如此
4. BFC 的区域不会与 float box 重叠。
5. BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
6. 计算 BFC 的高度时，浮动元素也参与计算.
