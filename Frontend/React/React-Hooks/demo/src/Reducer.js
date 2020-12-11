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
    return (
        <div>
            <h2>Current Score is {count}</h2>
            <button onClick={()=>{dispatch('add')}}>Increment</button>  
            <button onClick={()=>{dispatch('sub')}}>Decrement</button>  
        </div>
    )
}
