import React from 'react'
import ChatHeader from "./ChatHeader"
import Messages from './Messages'
import MessageInput from './MessageInput'

function Chat() {
    return (
        <div className='flex-[2] relative overflow-hidden'>
            <ChatHeader />
            <Messages />
            <MessageInput />
        </div>
    )
}

export default Chat
