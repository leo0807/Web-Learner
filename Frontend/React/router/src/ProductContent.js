import React, { Component } from 'react'

class ProductContent extends Component{
    constructor(props) {
        super()
        this.state = {
            
        }
    }
    componentDidMount() {
        console.log(this.props.location.search);
    }
    render() {
        return (
            <div>
                ProductContent component
            </div>
        )
    }
}

export default ProductContent