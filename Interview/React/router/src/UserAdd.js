import React from 'react'

function UserAdd(props) {
    let text = React.createRef();
    const handleSubmit = (e) => {
        e.preventDefault();
        props.history.push('/user/list')
        console.log(text.current.value);
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" ref={text} />
            <button type="submit">提交</button>
        </form>
    )
}

export default UserAdd
