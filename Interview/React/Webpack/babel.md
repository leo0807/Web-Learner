ES6 代码输入 ==》 babylon 进行解析 ==》 得到 AST
==》 plugin 用 babel-traverse 对 AST 树进行遍历转译 ==》 得到新的 AST 树
==》 用 babel-generator 通过 AST 树生成 ES5 代码`


①Parser 解析我们的代码转换为 AST。 验证语法的正确性，同时由字符串变为对象结构后更有利于精准地分析以及进行代码结构调整

②Transformer 利用我们配置好的 plugins/presets 把 Parser 生成的 AST 转变为 新的 AST。
就是遍历这个对象所描述的抽象语法树，遇到哪里需要做一下改变，就直接在对象上进行操作，即 plugin 用 babel-traverse 对 AST 树进行遍历转译 ==》 得到新的 AST 树。

③Generator 把转换后的 AST 生成新的代码
- 最终（经过一系列转换之后）的 AST 转换成字符串形式的代码
- 创建源码映射（source maps）
