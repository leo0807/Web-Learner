http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html

# 容器的6个属性
- flex-direction
- flex-wrap
- flex-flow
- justify-content
- align-items
- align-content

# order 属性
order 属性定义项目的排列顺序。数值越小，排列越靠前，默认为 0。
```
.item {
order: <integer>;
}
```

# flex-grow
flex-grow 属性定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。

如果所有项目的 flex-grow 属性都为 1，则它们将等分剩余空间（如果有的话）。如果一个项目的 flex-grow 属性为 2，其他项目都为 1，则前者占据的剩余空间将比其他项多一倍


# flex-shrink
flex-shrink 属性定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。

.item {
flex-shrink: <number>; /_ default 1 _/
}

如果所有项目的 flex-shrink 属性都为 1，当空间不足时，都将等比例缩小。如果一个项目的 flex-shrink 属性为 0，其他项目都为 1，则空间不足时，前者不缩小。

负值对该属性无效。

# flex-basis 属性
flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 auto，即项目的本来大小。

.item {
flex-basis: <length> | auto; /_ default auto _/
}
它可以设为跟 width 或 height 属性一样的值（比如 350px），则项目将占据固定空间。

# align-self 属性
align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。默认值为 auto，表示继承父元素的 align-items 属性，如果没有父元素，则等同于 stretch。

.item {
align-self: auto | flex-start | flex-end | center | baseline | stretch;
}

# flex:1 代表什么

flex: 1 => flex: 1 1 0%; => 
    1. flex-grow: 1;
    2. flex-shrink: 1;
    3. flex-basis: 0%;