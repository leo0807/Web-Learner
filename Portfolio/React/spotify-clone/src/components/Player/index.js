import React from 'react'
import './Player.css'
import SiderBar from '../SideBar'
import Body from '../Body'
import Footer from '../Footer'

export default function Player({spotify}) {
    return (
        <div className="player">
            <div className="player__body">
                <SiderBar />
                <Body spotify={spotify}/>
            </div>
            <Footer />
        </div>
    )
}
