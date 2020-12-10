import React, { Component } from 'react'

class Content extends Component{
    constructor(props) {
        super()
        this.state = {
            
        }
    }
    componentDidMount() {
        console.log(this.props.match.params.aid);
        // 动态路由
    }

    render() {
        return (
            <div>
                Content component
            </div>
        )
    }
}

export default Content