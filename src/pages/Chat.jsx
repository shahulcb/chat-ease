import React, { useContext } from 'react'
import ChatHeader from "../components/ChatHeader"
import Messages from '../components/Messages'
import MessageInput from '../components/MessageInput'
import { Route, Routes } from 'react-router-dom'

function Chat() {
    return (
        <>
            <Routes>
                <Route index element={
                    <>
                        <ChatHeader />
                        <Messages />
                        <MessageInput />
                    </>
                } />
            </Routes>
        </>
    )
}

export default Chat
