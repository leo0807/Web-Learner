import React, { Component } from 'react';
import store from './store';
import TodoListUI from './TodoListUI';
import {changeInputAction, addItemAction, deleteItemAction, getTodoList,myListAction} from './store/actionCreators';
// import axios from 'axios';

class TodoList extends Component {
    constructor(props) {
        super(props);
        console.log(store.getState());
        this.state = store.getState();
        this.changeInputValue = this.changeInputValue.bind(this);
        this.storeChange = this.storeChange.bind(this);
        this.clickBtn = this.clickBtn.bind(this);
        store.subscribe(this.storeChange);
        //如果不使用订阅模式绑定，state.inputValue不会改变
    }

    componentDidMount(){
        const action = getTodoList();
        store.dispatch(action);
    }

    storeChange(){
        this.setState(store.getState());
    }

    changeInputValue(e){
        //console.log(this.state.inputValue);
        const action = changeInputAction(e.target.value);
        store.dispatch(action);
    }

    clickBtn(){
        const action = addItemAction();
        store.dispatch(action);
    }

    deleteItem(index){
        const action = deleteItemAction(index)
        console.log(index);
        store.dispatch(action);
    }

    handleOnKeyPress = (event)=>{

        if (event.key === 'Enter') {
            this.clickBtn();
        }
    }
    render(){ 
        return (<TodoListUI 
                inputValue = {this.state.inputValue}
                changeInputValue = {this.changeInputValue}
                clickBtn = {this.clickBtn}
                deleteItem = {this.deleteItem}
                handleOnKeyPress = {this.handleOnKeyPress}
                list = {this.state.list}
                />);
    }
}
 
export default TodoList;
