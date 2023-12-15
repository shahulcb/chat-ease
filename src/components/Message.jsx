import React, { useContext, useEffect, useRef } from 'react'
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext'

function Message({ message }) {
    console.log(message);
    const { data } = useContext(ChatContext)
    const { user } = useContext(AuthContext)
    const customClassName = message.senderId === user.uid ? "chat-end" : "chat-start"
    const ref = useRef()
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" })
    }, [message])
    return (
        <div className={`chat ${customClassName}`} ref={ref}>

            {message?.files && message.files.length > 0 && message.senderId === user.uid &&
                (
                    <div className='flex flex-col gap-2 mb-2'>
                        {message.files.map((path, index) => (
                            <div className='w-40 h-56 rounded-md' key={index}>
                                <img src={path} alt="" className='object-cover rounded-md h-full' />
                            </div>
                        ))}
                    </div>
                )
            }
            <div className="chat-image">
                <div className="bg-transparent border-0 avatar placeholder cursor-pointer">
                    <div className="bg-gray-700 rounded-full w-12 text-gray-300">
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
            {message?.files && message.files.length > 0 && message.senderId !== user.uid &&
                (
                    <div className='flex flex-col gap-2 mb-2'>
                        {message.files.map((path, index) => (
                            <div className='w-40 h-56 rounded-md' key={index}>
                                <img src={path} alt="" className='object-cover rounded-md h-full' />
                            </div>
                        ))}
                    </div>
                )
            }
            {message.text.trim() !== '' &&
                <div className={`chat-bubble text-white ${message.senderId === user.uid ? "bg-emerald-600" : "bg-slate-600"}`}>{message.text}</div>
            }
            <div className="chat-footer">
                <time className="text-xs text-gray-400">
                    {new Date(message.date.seconds * 1000 + message.date.nanoseconds / 1000000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </time>
            </div>
        </div >
    )
}

export default Message
