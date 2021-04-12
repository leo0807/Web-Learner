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


# 外边距重叠问题
链接： https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing

**块**的上外边距(margin-top)和下外边距(margin-bottom)有时合并(折叠)为单个边距，其大小为单个边距的最大值(或如果它们相等，则仅为其中一个)，这种行为称为边距折叠。

- 同一层相邻元素之间
相邻的两个元素之间的外边距重叠，除非后一个元素加上 clear-fix 清除浮动。


- 没有内容将父元素和后代元素分开
如果没有边框 border，内边距 padding，行内内容，也没有创建块级格式上下文或清除浮动来分开一个块级元素的上边界 margin-top 与其内一个或多个后代块级元素的上边界 margin-top；或没有边框，内边距，行内内容，高度 height，最小高度 min-height 或 最大高度 max-height 来分开一个块级元素的下边界 margin-bottom 与其内的一个或多个后代后代块元素的下边界 margin-bottom，则就会出现父块元素和其内后代块元素外边界重叠，重叠部分最终会溢出到父级块元素外面。

## 解决办法
  
- 外层元素添加 padding
- 外层元素 overflow:hidden;
- 外层元素透明边框 border:1px solid transparent;
- 内层元素绝对定位 postion:absolute:
- 内层元素 加 float:left;或 display:inline-block;




- 空的块级元素
当一个块元素上边界 margin-top 直接贴到元素下边界 margin-bottom 时也会发生边界折叠。这种情况会发生在一个块元素完全没有设定边框 border、内边距 paddng、高度 height、最小高度 min-height 、最大高度 max-height 、内容设定为 inline 或是加上 clear-fix 的时候。

## 解决办法


# IFC
IFC（inline Formatting Context）叫做“行级格式化上下”
局规则如下： 1.内部的盒子会在水平方向，一个个地放置；
2.IFC 的高度，由里面最高盒子的高度决定； 3.当一行不够放置的时候会自动切换到下一行；
