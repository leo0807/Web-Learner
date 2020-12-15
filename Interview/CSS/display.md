块状元素, display: block/table，如div, h1, h2, table, ul, ol, p等
块状元素每个单独占浏览器一行

1. 独占一行，在不设置自己的宽度的情况下，块级元素会默认填满父级元素的宽度
2. 可以修改width、height属性
3. padding、margin四个方向的值设置均有效

内联元素 display: inline/ inline-block 如span, img, input, button等
它们会挨着往后排，超过浏览器宽度会自动换行
1. 与其他行内元素共享一行
2. 不能修改width、height属性，大小由内容撑开
3. padding属性 top、right、bottom、left设置都有效；margin属性只有left、right设置有效

inline-block： 使元素变成行内块级元素，结合了行内元素和块级元素的特性（不独占一行的块级元素），即

1. 与其他行内元素共享一行
2. 可以修改width、height属性
3. padding、margin四个方向的值设置均有效

### display: none
会引起重排和重绘，而且在设置transition也不会有效果
### visbility: hidden
不会引起重排，但是会引起重绘, transition为正常
display: none和visbility: hidden均不影响遮挡元素的效果，子元素可以复原且绑定事件不被影响
但是visbility下的子元素可以通过设置属性visible出现
### opacity:0 
不影响文档流和动画效果，一般是不会引起重绘的，因为只是降低了alpha的数值而达到透明的效果；
子元素无法复原且被设置opacity的父元素遮盖