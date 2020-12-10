import React from 'react';
import store from './store';
import {connect} from 'react-redux';

const TodoList = (props) => {
    const {inputValue, inputChange,clickBtn,list} = props;
        return ( <div>
            <div>
                <input value={inputValue} onChange={inputChange}/>
                <button onClick={clickBtn}>Submit</button>
            </div>
            <ul>
                {
                    list.map((item, index)=>{
                    return (<li key={index} onClick={(index)=>{
                        const action = {
                            type: 'delete_item',
                            index:index
                        }
                        store.dispatch(action);
                    }}>{item}</li>)
                    })
                }
            </ul>
        </div> );
    }
const stateToProps = (state) => {
    return {
        inputValue: state.inputValue,
        list: state.list
    }
}
const dispatchToProps = (dispatch) => {
    return {
        inputChange(e){
            let action = {
                type:'change_input',
                value: e.target.value
            }
            dispatch(action);
        },
        clickBtn(){
            let action = {
                type:'add_item',
            }
            dispatch(action);
        }
    }
}
export default connect(stateToProps, dispatchToProps)(TodoList);