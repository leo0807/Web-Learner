import React, { Component } from 'react';

class TodoList extends Component{
  constructor(){
    super()
    this.state = {
      id: 0,
      data: "",
      list: [],
    }

    this.textInput = null;
    this.setTextInputRef = element => {
      this.textInput = element
    }
  }
  addData=()=>{
    // this.ref.title.value;
    let tempList = this.state.list;
    let tempData = this.state.data;
    let id = this.state.id;
    tempList.push({
      id: id,
      data:tempData
    })
    id++;
    this.textInput.value = ""
    this.setState({
      id: id,
      data: "",
      list: tempList
    })

  }
  getData = (e) => {
    this.setState({
      data: e.target.value
    })
  }
  removeData = (id) => {
    console.log(id);
    let tempList = this.state.list;
    tempList = tempList.filter(item => item.id !==id)
    this.setState({
      list: tempList
    })
  }

  render() {
    return (
      <div id="App">
        <h2>ToDoList 演示</h2>
        <input ref={this.setTextInputRef} type="text" onChange={this.getData} />
        <button onClick={this.addData}>+</button>
        <hr />
        <ul>
          {this.state.list.map((item) => {
            return (
              <li key={item.id}>{item.data} <button onClick={e=>this.removeData(item.id,e)}>-</button> </li> 
            )
          })}
        </ul>
      </div>
    )
  }
}
export default TodoList