import React, { Component } from 'react'

class App extends Component {
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

    addData = (e) => {
        if (e.keyCode === 13) {
            let title = this.textInput.value;
            let tempList = this.state.list;
    
            tempList.push({
                title: title,
                checked: false
            })
    
            this.setState({
                list: tempList
            })

            this.textInput.value = "";

            // 数据缓存 key 只能存为字符串
            localStorage.setItem('todolist', JSON.stringify(tempList));
        }

    }

    checkBoxChange = (key, e) => {
        let tempList = this.state.list;
        tempList[key].checked = !tempList[key].checked;
        this.setState({
            list: tempList
        })
        localStorage.setItem('todolist', JSON.stringify(tempList));

    }

    removeData = (key) => {
        let tempList = this.state.list;
        tempList.splice(key, 1)
        this.setState({
            list: tempList
        })
        localStorage.setItem('todolist', JSON.stringify(tempList));

    }
    // 生命周期函数 获取localstorage中缓存数据 在页面挂载执行
    componentDidMount() {

        let todolist = JSON.parse(localStorage.getItem('todolist'));

        if (todolist) {
            this.setState({
                list: todolist
            })
        }
    }

    render() {
        return (
            <div id="App">
                <header className="title" ref={this.setTextInput}>ToDoList</header>
                <h2>React ToDoList 样式2</h2>
                <input type="text" ref={this.setTextInput} onKeyDown={this.addData} />
                <h2>待办事项</h2>
                <hr />
                <ul>
                    {
                        this.state.list.map(
                            (item, key) => {
                                if (item.checked) {
                                    return (
                                        <li key={key}>
                                            <input type="checkbox" checked={item.checked} onChange={e => this.checkBoxChange(key, e)} />
                                            {item.title}
    
                                            -- <button onClick={e => this.removeData(key, e)}>删除</button>
                                        </li>
                                    )
                                } else return null;
                            }
                        )
                    }
                </ul>
                <h2>已完成事项</h2>
                {
                        this.state.list.map(
                            (item, key) => {
                                if (!item.checked) {
                                    return (
                                        <li key={key}>
                                            <input type="checkbox" checked={item.checked} onChange={e => this.checkBoxChange(key, e)} />
                                            {item.title}
    
                                            -- <button onClick={e => this.removeData(key, e)}>删除</button>
                                        </li>
                                    )
                                } else return null;
                            }
                        )
                    }
                <hr/>
            </div>
        )
    }
}
export default App