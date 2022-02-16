// react 16.x
// 实现fiber架构 提高渲染性能，随时在渲染帧停止渲染并执行副函数
// 实现diff算法
// 实现组件函数
// 实现简易hook
// 实现简易class

// babel转换之后
const jsx = React.createElement(
  'div', //元素类型
  { id: "app2" }, // props 内容
  React.createElement(// 内容
    'a',
    {
      href: "http://www.baidu.com"
    },
    "百度"
  ) 
)