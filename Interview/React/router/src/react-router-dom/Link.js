import React from 'react'
import { Consumer } from './context';
function Link(props) {
    return (
        <Consumer>
            {state => {
                return <a onClick={() => {
                    state.history.push(props.to)
                }}>{props.children}</a>
            }}
        </Consumer>
    )
}

export default Link
