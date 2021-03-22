# CSS display:none 和 visibility:hidden 的区别

**Visibility:hidden 隐藏，但在浏览时保留位置；CSS display:none 视为不存在，且不加载.**

Overflow 属性值{visible|hidden|scroll|auto}前提是先要限制 DIV 的宽度（width）和高度（height）。二者都是隐藏 HTML 元素，在视觉效果上没有区别，但在一些 DOM 操作中二者还是有所不同的。

1. CSS display:none;

display:none 视为不存在且不加载，即，不为被隐藏的对象保留其物理空间，即该对象在页面上彻底消失。

使用 display:none 属性后，HTML 元素（对象）的宽度、高度等各种属性值都将“丢失”;

2. Visibility:hidden;

visibility:hidden 隐藏，但在浏览时保留位置，即，使对象在网页上不可见，但该对象在网页上所占的空间没有改变。

而使用 visibility:hidden 属性后，HTML 元素（对象）仅仅是在视觉上看不见（完全透明），而它所占据的空间位置仍然存在。也即是说它仍具有高度、宽度等属性值。

# display: none (不占空间，不能点击)（场景，显示出原来这里不存在的结构）
# visibility: hidden（占据空间，不能点击）（场景：显示不会导致页面结构发生变动，不会撑开）
# opacity: 0（占据空间，可以点击）（场景：可以跟 transition 搭配）
