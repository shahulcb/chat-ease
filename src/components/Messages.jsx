import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/config'

function Messages() {
    const { data } = useContext(ChatContext)
    const [messages, setMessages] = useState([])
    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
        })
        return () => {
            unsub()
        }
    }, [data.chatId])
    return (
        <div className='flex flex-col p-10 overflow-y-scroll h-screen'>
            {messages.map((message) => (
                <Message message={message} key={messages.id} />
            ))}
        </div>
    )
}

export default Messages
