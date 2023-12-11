import React, { useContext, useEffect, useRef } from 'react'
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext'

function Message({ message }) {
    const { data } = useContext(ChatContext)
    const user = useContext(AuthContext)
    const customClassName = message.senderId === user.uid ? "chat-end" : "chat-start"
    const ref = useRef()
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" })
    }, [message])
    return (
        <div className={`chat ${customClassName}`} ref={ref}>
            <div className="chat-image">
                <div className="bg-transparent border-0 avatar placeholder cursor-pointer">
                    <div className="bg-neutral text-neutral-content rounded-full w-12">
                        {message.senderId === user.uid ? (
                            <>
                                {user.photoURL === "" ?
                                    <img src={user?.photoURL} alt={user.displayName} className='object-cover' />
                                    : <span>{user.displayName.substring(0, 2).toUpperCase()}</span>
                                }
                            </>
                        ) : (
                            <>
                                {data.user?.photoURL === "" ?
                                    <img src={data.user?.photoURL} alt={data.user.displayName} className='object-cover' />
                                    : <span>{data.user.displayName.substring(0, 2).toUpperCase()}</span>
                                }
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className={`chat-bubble ${message.senderId === user.uid ? "chat-bubble-info" : "chat-bubble-primary"}`}>{message.text}</div>
            <div className="chat-footer opacity-50">
                <time className="text-xs opacity-50">{new Date(message.date.seconds * 1000 + message.date.nanoseconds / 1000000).toDateString()}</time>
            </div>
        </div >
    )
}

export default Message
