Node(节点)是 DOM 层次结构中的任何类型的对象的通用名称，Node 有很多类型，如元素节点，属性节点，文本节点，注释节点等，通过 NodeType 区分，常见的有：

# Element 跟 Node 的区别
Element 继承了 Node 类，也就是说 Element 是 Node 多种类型中的一种，即当 **NodeType** 为 1 时 Node 即为 ElementNode，另外 Element 扩展了 Node，Element 拥有 id、class、children 等属性。

```
        var oDiv=document.getElementById("test");
        console.log(oDiv instanceof Node);        //true
        console.log(oDiv instanceof Element);    //true
```

# children 属性与 childNodes 属性的差别：
1. childNodes 属性返回**所有的节点**，包括文本节点、注释节点；
2. children 属性只返回**元素**节点,即：HTMLCollection 对象; 根据子元素在元素中出现的先后顺序进行排序。使用 HTMLCollection 对象的 length 属性获取子元素的数量，然后使用序列号(index，起始值为 0)访问每个子元素。
不过两者都是即时的 LIVE 类型，改变子节点或子元素个数，.length 会即使的改变。

3. children 是 Element 的属性，childNodes 是 Node 的属性
4. Node 的 children 属性为为 undefined

