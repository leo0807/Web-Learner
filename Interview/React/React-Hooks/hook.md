# 函数式编程
## 什么是纯函数 Pure Function
1. 函数不产生副作用 Side Effect，纯函数只涉及计算，其余操作均是副效应
    - 更改外部变量的值
    - 产生记录日志
    - 将页面上的一个按钮设置为可点击，或者不可点击

2. 函数满足referereferential transparency条件
    - 将指定的值传入函数，总是能够返回相同的结果
    - 可以将可以将用函数计算的结果替换表达式本身，而不影响程序的逻辑


## 什么是函数式编程
**Functional programming is about writing pure functions**
函数式编程最大限度的写**pure function**，让函数最大限度的减少**side effect**，并且保证函数在任何时候传递相同参数时，得到的结果都相同
- 优点使用函数式编程时，程序具有天然的模块性，因为实现的函数为pure function，可以任意组合纯函数

# class componen的缺点
1. this指针
2. 基于生命周期的设计，容易造成逻辑上的割裂，不容易维护
3. 逻辑复用困难
    - 大型组件很难拆分和重构，也很难测试。
    - 业务逻辑分散在组件的各个方法之中，导致重复逻辑或关联逻辑。
    - 组件类引入了复杂的编程模式，比如 render props 和高阶组件。

render props 和 HOC虽然可以解决逻辑复用困难的问题，但是由于过多的嵌套，会导致wrapper hell的问题

# React Hook
React Hooks 是加强版的函数组件，又通过useState