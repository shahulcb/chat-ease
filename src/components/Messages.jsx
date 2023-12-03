import React from 'react'
import Message from './Message'

function Messages() {
    return (
        <div className='flex flex-col p-10 overflow-y-scroll h-screen'>
            <Message className={"chat-start"} />
            <Message className={"chat-end"} />
            <Message className={"chat-start"} />
            <Message className={"chat-end"} />
            <Message className={"chat-start"} />
            <Message className={"chat-end"} />
            <Message className={"chat-end"} />
            <Message className={"chat-end"} />
        </div>
    )
}

export default Messages
