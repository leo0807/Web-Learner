# ESLint
- 核心类
```
verify // 检查 （核心）
verifyAndFix // 检查并修复 （核心）
getSourceCode // 获取 AST 抽象语树
defineParser // 定义 Parser 把源码字符串解析成AST
defineRule // 定义 Rule， 配置对AST进行检查的规则
getRules // 获取所有的 Rule
```

## parser
ESLint首先把源码解析成AST，且ESLint的parser可以进行切换，默认使用```espree```，可以通过配置了来切换成别的parser，
如```@eslint/babel-parser```，````@typescript/eslint-parser```等。