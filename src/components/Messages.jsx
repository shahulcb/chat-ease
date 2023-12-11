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
        <div className='flex flex-col md:p-10 p-5 md:pb-40 pb-56 overflow-y-scroll h-screen'>
            {messages.map((message) => (
                <Message message={message} key={message.id} />
            ))}
        </div>
    )
}

export default Messages
