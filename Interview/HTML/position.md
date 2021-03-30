如果 top 和 bottom 都被指定（严格来说，这里指定的值不能为 auto ），top 优先。
如果指定了 left 和 right ，当 direction设置为 ltr（水平书写的中文、英语）时 left 优先， 当direction设置为 rtl（阿拉伯语、希伯来语、波斯语由右向左书写）时 right 优先。

# Positon
- static
该关键字指定元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。此时 top, right, bottom, left 和 z-index 属性无效。
- relative 相对定位
相对定位的元素是在文档中的正常位置偏移给定的值，但是不影响其他元素的偏移。该关键字下，元素先放置在未添加定位时的位置，再在不改变页面布局的前提下调整元素位置（因此会在此元素未添加定位时所在位置留下空白）。position:relative 对 table-*-group, table-row, table-column, table-cell, table-caption 元素无效。
- absolute
在布置文档流中其它元素时，绝对定位元素不占据空间。绝对定位元素相对于最近的非 static 祖先元素定位。绝对定位的元素可以设置外边距（margins），且不会与其他边距合并。
- fixed
固定定位与绝对定位相似，元素会被移出正常文档流，并不为元素预留空间，而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在**屏幕滚动时**不会改变。打印时，元素会出现在的每页的固定位置。fixed 属性会创建新的层叠上下文。
## position: fixed失效的原因
MDN解释：**当元素祖先的 transform 属性非 none 时，定位容器由视口改为该祖先。**
- 当元素祖先的 transform, perspective 或 filter 属性非 none 时，容器由视口改为该祖先。
- 1. transform 属性值不为 none 的元素；
    2. perspective 值不为 none 的元素；
    3. 在 will-change 中指定了任意 CSS 属性

- sticky
元素根据正常文档流进行定位，然后相对它的最近滚动祖先（nearest scrolling ancestor）和 containing block (最近块级祖先 nearest block-level ancestor)，包括table-related元素，基于top, right, bottom, 和 left的值进行偏移。偏移值不会影响任何其他元素的位置。

粘性定位可以被认为是相对定位和固定定位的混合。**元素在跨越特定阈值前为相对定位，之后为固定定位。**例如：
```
#one { position: sticky; top: 10px; }
```
在 viewport 视口滚动到元素 top 距离小于 10px 之前，元素为相对定位。之后，元素将固定在与顶部距离 10px 的位置，直到 viewport 视口回滚到阈值以下。

transform 属性值不为none 的元素 perspective 值不为none 的元素 在 will-change 中指定了任意CSS 属性
## 注意事项
1. 设定为 position:sticky 元素的任意父节点的 overflow 属性必须是 visible，否则 position:sticky 不会生效。

2. 如果 position:sticky 元素的任意父节点定位设置为 position:relative | absolute | fixed，则元素相对父元素进行定位，而不会相对 viewprot 定位。

3. 必须指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。

4. 设置了 position: sticky 的元素并不脱离文档流，仍然保留元素原本在文档流中的位置
————————————————
版权声明：本文为 CSDN 博主「冰茶茶」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/ice_teas/article/details/103876733
