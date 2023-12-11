import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { v4 as uuid } from "uuid"
import { db } from '../firebase/config'

function MessageInput() {
    const user = useContext(AuthContext)
    const { data } = useContext(ChatContext)

    const [input, setInput] = useState('')

    const sendMessage = async () => {
        if (input.length <= 0) {
            return false
        }
        try {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text: input,
                    senderId: user.uid,
                    date: Timestamp.now()
                })
            })
            await updateDoc(doc(db, "chatList", user.uid), {
                [data.chatId + ".lastMessage"]: {
                    text: input
                },
                [data.chatId + ".date"]: serverTimestamp(),
            })
            await updateDoc(doc(db, "chatList", data.user.uid), {
                [data.chatId + ".lastMessage"]: {
                    text: input
                },
                [data.chatId + ".date"]: serverTimestamp(),
            })
            setInput("")
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className='w-full h-16 bg-base-200 sticky bottom-0 flex items-center md:px-10 px-5 gap-3'>
            <input type="text" placeholder="Type something" className="input input-bordered w-full bg-base-200" onChange={(event) => setInput(event.target.value)} value={input || ""} />
            {/* <input type="file" className='hidden' id='file' /> */}
            {/* <label htmlFor="file" className='cursor-pointer'>
                <svg
                    viewBox="0 0 1024 1024"
                    fill="currentColor"
                    height="1.5em"
                    width="1.5em"
                >
                    <path d="M574 665.4a8.03 8.03 0 00-11.3 0L446.5 781.6c-53.8 53.8-144.6 59.5-204 0-59.5-59.5-53.8-150.2 0-204l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3l-39.8-39.8a8.03 8.03 0 00-11.3 0L191.4 526.5c-84.6 84.6-84.6 221.5 0 306s221.5 84.6 306 0l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3L574 665.4zm258.6-474c-84.6-84.6-221.5-84.6-306 0L410.3 307.6a8.03 8.03 0 000 11.3l39.7 39.7c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c53.8-53.8 144.6-59.5 204 0 59.5 59.5 53.8 150.2 0 204L665.3 562.6a8.03 8.03 0 000 11.3l39.8 39.8c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c84.5-84.6 84.5-221.5 0-306.1zM610.1 372.3a8.03 8.03 0 00-11.3 0L372.3 598.7a8.03 8.03 0 000 11.3l39.6 39.6c3.1 3.1 8.2 3.1 11.3 0l226.4-226.4c3.1-3.1 3.1-8.2 0-11.3l-39.5-39.6z" />
                </svg>
            </label> */}
            <button className="btn btn-primary rounded-full h-10 w-10 min-h-0 p-0" onClick={sendMessage}>
                <svg
                    viewBox="0 0 1024 1024"
                    fill="currentColor"
                    height="1.5em"
                    width="1.5em"
                >
                    <defs>
                        <style />
                    </defs>
                    <path d="M931.4 498.9L94.9 79.5c-3.4-1.7-7.3-2.1-11-1.2-8.5 2.1-13.8 10.7-11.7 19.3l86.2 352.2c1.3 5.3 5.2 9.6 10.4 11.3l147.7 50.7-147.6 50.7c-5.2 1.8-9.1 6-10.3 11.3L72.2 926.5c-.9 3.7-.5 7.6 1.2 10.9 3.9 7.9 13.5 11.1 21.5 7.2l836.5-417c3.1-1.5 5.6-4.1 7.2-7.1 3.9-8 .7-17.6-7.2-21.6zM170.8 826.3l50.3-205.6 295.2-101.3c2.3-.8 4.2-2.6 5-5 1.4-4.2-.8-8.7-5-10.2L221.1 403 171 198.2l628 314.9-628.2 313.2z" />
                </svg>
            </button>
        </div>
    )
}

export default MessageInput
