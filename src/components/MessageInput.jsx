import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { v4 as uuid } from "uuid"
import { db } from '../firebase/config'
import { storage } from "../firebase/config"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

function MessageInput() {
    const { user } = useContext(AuthContext)
    const { data } = useContext(ChatContext)

    const [input, setInput] = useState('')
    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(false)

    const handleFiles = (event) => {
        const selectedFiles = event.target.files
        const arraySelectedFiles = Array.from(selectedFiles)
        setFiles((prevState) => [...prevState, ...arraySelectedFiles])

    }
    const handleRemoveFile = (index) => {
        setFiles((prevState) => {
            const newFiles = [...prevState];
            newFiles.splice(index, 1);
            return newFiles;
        });
    }

    const sendMessage = async (event) => {
        event.preventDefault()
        if (input.trim() === '' && files.length === 0) {
            return;
        }
        try {
            if (files.length >= 1) {
                setLoading(true)
                const uploadPromises = files.map(async (file) => {
                    const storageRef = ref(storage, file.name)
                    await uploadBytes(storageRef, file)
                    return getDownloadURL(storageRef)
                })
                const fileDownloadURLs = await Promise.all(uploadPromises)
                await updateDoc(doc(db, "chats", data.chatId), {
                    messages: arrayUnion({
                        id: uuid(),
                        text: input,
                        files: fileDownloadURLs,
                        senderId: user.uid,
                        date: Timestamp.now()
                    })
                })
                await updateDoc(doc(db, "chatList", user.uid), {
                    [data.chatId + ".lastMessage"]: {
                        text: input.trim() === '' ? "Image 📸" : input
                    },
                    [data.chatId + ".date"]: serverTimestamp(),
                })
                await updateDoc(doc(db, "chatList", data.user.uid), {
                    [data.chatId + ".lastMessage"]: {
                        text: input.trim() === '' ? "Image 📸" : input
                    },
                    [data.chatId + ".date"]: serverTimestamp(),
                })
            } else {
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
            }
            setInput("")
            setFiles([])
            setLoading(false)
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className='w-full h-16 border-t border-gray-700 backdrop-blur-[1px] flex items-center md:px-10 px-5'>
            <form onSubmit={sendMessage} className='flex items-center gap-3 w-full relative'>
                <input type="file" accept="image/*" multiple className='hidden' id='file' onChange={handleFiles} />
                <label htmlFor="file" className='cursor-pointer'>
                    <svg
                        viewBox="0 0 24 24"
                        fill="white"
                        height="1.5em"
                        width="1.5em">
                        <path d="M4 5h13v7h2V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-2H4V5z" />
                        <path d="M8 11l-3 4h11l-4-6-3 4z" />
                        <path d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z" />
                    </svg>
                </label>
                <input type="text" placeholder="Type a message" className="input border border-gray-700 focus:border-gray-700 w-full bg-base-200 h-10 placeholder:text-sm placeholder:text-gray-300 focus:outline-none bg-transparent text-gray-300" onChange={(event) => setInput(event.target.value)} value={input || ""} />
                <button className="btn btn-primary rounded-full h-10 w-10 min-h-0 p-0">
                    {!loading ? (<svg
                        viewBox="0 0 1024 1024"
                        fill="currentColor"
                        height="1.5em"
                        width="1.5em"
                    >
                        <defs>
                            <style />
                        </defs>
                        <path d="M931.4 498.9L94.9 79.5c-3.4-1.7-7.3-2.1-11-1.2-8.5 2.1-13.8 10.7-11.7 19.3l86.2 352.2c1.3 5.3 5.2 9.6 10.4 11.3l147.7 50.7-147.6 50.7c-5.2 1.8-9.1 6-10.3 11.3L72.2 926.5c-.9 3.7-.5 7.6 1.2 10.9 3.9 7.9 13.5 11.1 21.5 7.2l836.5-417c3.1-1.5 5.6-4.1 7.2-7.1 3.9-8 .7-17.6-7.2-21.6zM170.8 826.3l50.3-205.6 295.2-101.3c2.3-.8 4.2-2.6 5-5 1.4-4.2-.8-8.7-5-10.2L221.1 403 171 198.2l628 314.9-628.2 313.2z" />
                    </svg>)
                        : (
                            <span className="loading loading-spinner loading-sm"></span>
                        )
                    }
                </button>
                <div className='w-full h-20 absolute -top-24 rounded-md flex gap-1'>
                    {files.map((image, index) => (
                        <div className='w-20 h-full relative' key={index}>
                            <img key={index} src={URL.createObjectURL(image)} alt="" className='object-cover rounded-md h-full' />
                            <button className="btn btn-sm btn-circle btn-outline absolute top-0 right-0 border-gray-300" onClick={() => handleRemoveFile(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                    ))}
                </div>

            </form>
        </div>
    )
}

export default MessageInput
