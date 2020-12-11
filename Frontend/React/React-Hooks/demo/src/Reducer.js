import React,{useReducer} from 'react';


export default function Reducer() {
    const [count, dispatch] = useReducer((state, action) => {
        switch(action){
            case 'add':
                return state + 1;
            case 'sub':
                return state - 1;
            default:
                return state;
        }
    }, 0)


    /*
        const reducer = (action, state) =>{
        switch(action.type ){
            case 'add':
                return state + 1;
            case 'sub':
                return state - 1;
            default:
                return state;
        }
        }
    */ 
    // 类似于Redux中的reducer 根据 action 改变state
    return (
        <div>
            <h2>Current Score is {count}</h2>
            <button onClick={()=>{dispatch('add')}}>Increment</button>  
            <button onClick={()=>{dispatch('sub')}}>Decrement</button>  
        </div>
    )
}
