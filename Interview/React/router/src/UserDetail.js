import React from 'react'

function UserDetail(props) {
    return (
        <div>
            Detail{props.match.params.id}
        </div>
    )
}

export default UserDetail
