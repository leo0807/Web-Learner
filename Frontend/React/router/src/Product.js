import React, { Component } from 'react'
import {Link} from 'react-router-dom'
class Product extends Component{
    constructor() {
        super()
        this.state = {
            list: [
                {
                    aid: 1,
                    title: "Item1"
                },
                {
                    aid: 2,
                    title: "Item2"
                },
                {
                    aid: 3,
                    title: "Item3"
                },
                {
                    aid: 4,
                    title: "Item4"
                },
            ]
        }
    }

    render() {
        return (
            <div>
                Product component
                <ul>
                    {
                        this.state.list.map((item, key) => {
                            return (
                                <li key={key}>
                                    {/* get 传值 */}
                                    <Link to={`/prdocutcontent?aid=${item.aid}`}>{item.title}</Link>
                                </li>
                            )
                        })
                    }
                 </ul>
            </div>
        )
    }
}

export default Product