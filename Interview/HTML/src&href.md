href => Hypertext Reference 超文本引用 **link,a**
href是超链接，建立通道，通道链接资源，使当前文档和资源进行联系，可以通过通道进行联系

src => source 参照 **img, style, script, input, iframe**
src不需要建立通道，会把资源下载下来，替换当前元素并且引入到文档中
浏览器在遇到这种属性的标签时候，会暂停其他资源的下载何处理，直到这种属性的标签下载，编译处理完之后才会运行下一步