import React, { Component } from 'react'
import Title from './Title';
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";

export default class Services extends Component {

    state = {
        services: [
            {
                icon: <FaCocktail />,
                title: "free cocktails",
                info: `orem ipsum dolor sit amet consectetur adipisicing elit. Minima magnam vel iste obcaecati, blanditiis non quia, necessitatibus est perspiciatis praesentium laborum quaerat consectetur autem harum aliquam ad quidem rerum eos.
                `
            },
            {
                icon: <FaHiking />,
                title: "Endless Hiking",
                info: `orem ipsum dolor sit amet consectetur adipisicing elit. Minima magnam vel iste obcaecati, blanditiis non quia, necessitatibus est perspiciatis praesentium laborum quaerat consectetur autem harum aliquam ad quidem rerum eos.
                `
            },
            {
                icon: <FaShuttleVan />,
                title: "Free Shuttle",
                info: `orem ipsum dolor sit amet consectetur adipisicing elit. Minima magnam vel iste obcaecati, blanditiis non quia, necessitatibus est perspiciatis praesentium laborum quaerat consectetur autem harum aliquam ad quidem rerum eos.
                `
            },
            {
                icon: <FaBeer />,
                title: "Strongest Beer",
                info: `orem ipsum dolor sit amet consectetur adipisicing elit. Minima magnam vel iste obcaecati, blanditiis non quia, necessitatibus est perspiciatis praesentium laborum quaerat consectetur autem harum aliquam ad quidem rerum eos.
                `
            },
        ]
    }
    render() {
        return (
            <section className="services">
                <Title title="services" />
                <div className="services-center">
                    {
                        this.state.services.map((item, index) => {
                            return <article key={index} className="sercice">
                                <span>{item.icon}</span>
                                <h6>{item.title}</h6>
                                <p>{ item.info}</p>
                            </article>
                        })
                    }
                </div>
            </section>
        )
    }
}
