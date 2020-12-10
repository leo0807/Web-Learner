# 实现类似vue的表单双向绑定
```
import React, { Component } from "react"

export default class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "Hello!"
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    // 设置 input 的值
    this.setState({ value: event.target.value })
  }
  render() {
    var value = this.state.value
    return (
      <div>
        <input type="text" value={value} onChange={this.handleChange} />
        <p>{value}</p>
      </div>
    )
  }
}
```

# 约束性组件和非约束性组件
所谓的**非约束性组件**，就是在```<input type="text" defaultValue="a" /> ```中，这个 **defaultValue** 其实就是原生DOM中的 value 属性。这样写出的来的组件，其value值就是用户输入的内容，React完全不管理输入的过程。

而**约束性组件**是指在```<input value={this.state.username} type="text" onChange={this.handleUsername} />```中，**value**属性不再是一个写死的值，他是 this.state.username, this.state.username被**onChange绑定**。这个时候实际上 input 的 value 根本不是用户输入的内容。而是onChange 事件触发之后，由于 this.setState 导致了一次重新渲染。不过React会优化这个渲染过程。看上去有点类似**双向数据绑定**。