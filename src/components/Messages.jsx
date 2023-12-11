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
        <div className='flex-1 flex flex-col md:px-10 md:py-10 px-5 py-5 overflow-y-scroll'>
            {messages.map((message) => (
                <Message message={message} key={message.id} />
            ))}
        </div>
    )
}

export default Messages
