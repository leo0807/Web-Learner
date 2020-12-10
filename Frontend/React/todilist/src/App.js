import React, { Component } from 'react'

class App extends Component{
    constructor() {
        super()
        this.state = {
            list: [
                {
                    title: "录制ICONIC",
                    checked: true
                },
                {
                    title: "录制ICONIC1",
                    checked: true
                },
                {
                    title: "录制ICONIC2",
                    checked: false
                },
                {
                    title: "录制ICONIC3",
                    checked: false
                },
            ]
        }
        this.textInput = null;
        this.setTextInput = element => {
            this.textInput = element;
        }
    }

    render() {
        return (
            <div id="App">
                <h2>React ToDoList 样式2</h2>
                <input type="text" ref={this.setTextInput} />
                <h2>待办事项</h2>
                <hr />
                <ul>
                    {
                        this.state.list.map(
                            (item, key) => {
                                return (
                                    <li>
                                        <checkbox checked={item.checked} />
                                        {item.title}
                                    </li>
                                )
                            }
                        )
                    }
                </ul>
                <h2>已完成事项</h2>
                <hr/>
            </div>
        )
    }
}