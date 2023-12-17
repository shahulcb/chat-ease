import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

function Chats() {
    const { user } = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    const { dispatch } = useContext(ChatContext)
    const [chatList, setChatList] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chatList", user.uid), (doc) => {
            setChatList(doc.data())
            setLoading(false)
        })
        return () => {
            unsub()
        }
    }, [user.uid])

    const handleClick = (userInfo) => {
        dispatch({
            type: "CHAHNGE_USER",
            payload: userInfo
        })
    }
    return (
        <div className='flex flex-col gap-1 p-2'>
            {chatList &&
                Object.entries(chatList)
                    .sort((a, b) => {
                        return b[1].date - a[1].date
                    })
                    .map((chat) => (
                        <div className={`flex gap-5 p-3 items-center hover:bg-gray-800 transition-colors cursor-pointer rounded-md relative ${data.user.uid === chat[1].userInfo.uid && "bg-gray-800"}`} key={chat[0]} onClick={() => handleClick(chat[1].userInfo)}>
                            <div className="bg-transparent border-0 avatar placeholder cursor-pointer">
                                <div className="text-neutral-content rounded-full w-12 bg-gray-800">
                                    <img src={chat[1].userInfo?.photoURL} alt={chat[1].userInfo.displayName} className='object-cover' />
                                </div>
                            </div>
                            <div>
                                <span className='text-lg text-gray-300 font-medium'>{chat[1].userInfo.displayName}</span>
                                <p className='text-base text-gray-400'>{chat[1].lastMessage?.text}</p>
                            </div>
                            {/* <div className="badge badge-success badge-sm absolute right-5 h-6 w-6">5</div> */}
                        </div>
                    ))
            }
            {loading &&
                (
                    <div className='flex justify-center'>
                        <span className="loading loading-spinner loading-md"></span>
                    </div>
                )
            }
        </div>
    )
}

export default Chats
