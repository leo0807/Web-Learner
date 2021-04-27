# useRef和createRef的区别
1. useRef 仅能用在 FunctionComponent，createRef 仅能用在 ClassComponent
    - createRef因为没有Hooks的效果，会随着函数组件的重复执行而不短初始化
    - 而在类组件中，因为生命周期的分离，componentDidMount仅执行一次
2. 由于 Ref 是贯穿 FunctionComponent 所有渲染周期的实例，理论上在任何地方都可以做修改
但是在**Render phase**阶段是不允许做 “side effects” 的，也就是写副作用代码，这是因为这个阶段可能会被 React 引擎随时取消或重做
