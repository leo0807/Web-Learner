import React, { Component } from 'react'
import {Link} from 'react-router-dom'
class News extends Component{
    constructor() {
        super()
        this.state = {
            list: [
                {
                    aid: 1,
                    title: "News1"
                },
                {
                    aid: 2,
                    title: "News2"
                },
                {
                    aid: 3,
                    title: "News3"
                },
                {
                    aid: 4,
                    title: "News4"
                },
            ]
        }
    }

    render() {
        return (
            <div>
                News component
                <ul>
                    {
                        this.state.list.map((item, key) => {
                            return (
                                <li key={key}>
                                    {/* 动态路由 */}
                                    <Link to={`/content/${item.aid}`}>{item.title}</Link>
                                </li>
                            )
                        })
                    }
                 </ul>
            </div>
        )
    }
}

export default News