import React from 'react'
import ChatHeader from "../components/ChatHeader"
import Messages from '../components/Messages'
import MessageInput from '../components/MessageInput'
import { Route, Routes } from 'react-router-dom'

function Chat() {
    return (
        // <>
        <div className='flex flex-col h-screen'>
            <Routes>
                <Route index element={
                    <>
                        <ChatHeader />
                        <Messages />
                        <MessageInput />
                    </>
                } />
            </Routes>
        </div>
        // </>
    )
}

export default Chat
