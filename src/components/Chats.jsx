import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../firebase/config'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

function Chats() {
    const user = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    const { dispatch } = useContext(ChatContext)
    const [chatList, setChatList] = useState([])
    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chatList", user.uid), (doc) => {
            setChatList(doc.data())
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
            {chatList == null ? (
                <div className='w-full h-52 flex flex-col justify-center items-center text-center'>
                    <p>Welcome! Begin your first chat and spark a conversation now.</p>
                    <Link to={"/search"}>start chats</Link>
                </div>
            ) : null}
            {chatList &&
                Object.entries(chatList).map((chat) => (
                    <div className={`flex gap-5 p-3 items-center border-2 border-base-200 hover:bg-base-200 cursor-pointer rounded-md ${data.user.uid === chat[1].userInfo.uid && "bg-base-200"}`} key={chat[0]} onClick={() => handleClick(chat[1].userInfo)}>
                        <div className="bg-transparent border-0 avatar placeholder cursor-pointer">
                            <div className="bg-neutral text-neutral-content rounded-full w-12">
                                {chat[1].userInfo?.photoURL ?
                                    <img src={chat[1].userInfo?.photoURL} alt={chat[1].userInfo.displayName} className='object-cover' />
                                    :
                                    <span>{chat[1].userInfo.displayName.substring(0, 2).toUpperCase()}</span>
                                }
                            </div>
                        </div>
                        <div>
                            <span className='text-lg font-medium'>{chat[1].userInfo.displayName}</span>
                            <p className='text-sm text-gray-400'>{chat[1].userInfo?.lastMessage}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Chats
