ES6 代码输入 ==》 babylon 进行解析 ==》 得到 AST
==》 plugin 用 babel-traverse 对 AST 树进行遍历转译 ==》 得到新的 AST 树
==》 用 babel-generator 通过 AST 树生成 ES5 代码`


①Parser 解析我们的代码转换为 AST。 验证语法的正确性，同时由字符串变为对象结构后更有利于精准地分析以及进行代码结构调整

②Transformer 利用我们配置好的 plugins/presets 把 Parser 生成的 AST 转变为 新的 AST。
就是遍历这个对象所描述的抽象语法树，遇到哪里需要做一下改变，就直接在对象上进行操作，即 plugin 用 babel-traverse 对 AST 树进行遍历转译 ==》 得到新的 AST 树。

③Generator 把转换后的 AST 生成新的代码
- 最终（经过一系列转换之后）的 AST 转换成字符串形式的代码
- 创建源码映射（source maps）


在 babel-core 内部，更细致的讲：
- babel-parser 实现第一步
- babel-generator 实现第三步
- babel-traverse 可以通过「深度优先」的方式遍历 AST 树
    - 对于遍历到的每条路径，babel-types 提供用于修改 AST 节点的节点类型数据


# Babel 的上层能力
基于 Babel 对 JS 代码的编译处理能力，Babel 最常见的上层能力为：
1. polyfill
2. DSL 转换（比如解析 JSX）
3. 语法转换（比如将高级语法解析为当前可用的实现）
使用@babel/polyfill 或@babel/preset-env 可以实现高级语法的降级实现以及 API 的 polyfill。
以上两者的转换功能是**core-js**实现



### core-js-compat
core-js-compat 根据 Browserslist 维护了不同宿主环境、不同版本下对应需要支持特性的集合。
```
core-js-compat
core-js-compat 根据 Browserslist 维护了不同宿主环境、不同版本下对应需要支持特性的集合。
```