import React, { useContext } from 'react'
import ChatHeader from "../components/ChatHeader"
import Messages from '../components/Messages'
import MessageInput from '../components/MessageInput'
import { Route, Routes } from 'react-router-dom'
import { ChatContext } from '../context/ChatContext'

function Chat() {
    const { data } = useContext(ChatContext)
    return (
        <div className='flex-[2] relative overflow-hidden'>
            {data.chatId !== "" &&
                <Routes>
                    <Route index element={
                        <>
                            <ChatHeader />
                            <Messages />
                            <MessageInput />
                        </>
                    } />
                </Routes>
            }
        </div>
    )
}

export default Chat
