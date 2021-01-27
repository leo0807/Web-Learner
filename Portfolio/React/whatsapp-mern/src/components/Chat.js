import React from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
function Chat() {
    return (
        <div className="chat">
            <Avatar />
            <div className="chat__headerInfo">
                <h3>Room name</h3>
                <p>Last seen at</p>
            </div>
            <div className="chat__headerRight">
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <IconButton>
                    <AttachFile />
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton>

            </div>
            <div className="chat__body">
                <p className="chat__message">
                    <span className="chat__name">Sony</span>
                    This is a message
                    <span className="chat__timestamp">
                        {new Date().toUTCString()}
                    </span>
                </p>
            </div>

            <p className="chat__message chat__receiver">
                <span className="chat__name">Sony</span>
                    This is a message
                    <span className="chat__timestamp">
                    {new Date().toUTCString()}
                </span>
            </p>

            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input type="text" placeholder="Type a message" />
                    <button type="submit">Send a Message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
