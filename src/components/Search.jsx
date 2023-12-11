import React, { useState } from 'react'
import { Timestamp, arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"
import { db } from "../firebase/config"
import { useContext } from 'react'
import { AuthContext } from "../context/AuthContext"
import { v4 as uuid } from 'uuid'

function Search() {
    const user = useContext(AuthContext)
    const [input, setInput] = useState('')
    const [searchData, setSearchData] = useState([])
    const [searchDataStatus, setSearchDataStatus] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleOnClick = async (clickedUser) => {
        const combainedId = user.uid > clickedUser.uid ? user.uid + clickedUser.uid : clickedUser.uid + user.uid
        try {
            const res = await getDoc(doc(db, "chats", combainedId))
            if (!res.exists()) {
                await setDoc(doc(db, "chats", combainedId), {
                    messages: arrayUnion({
                        id: uuid(),
                        text: "Hi👋",
                        senderId: user.uid,
                        date: Timestamp.now()
                    })
                })
                await updateDoc(doc(db, "chatList", user.uid), {
                    [combainedId + ".userInfo"]: {
                        uid: clickedUser.uid,
                        displayName: clickedUser.displayName
                    },
                    [combainedId + ".lastMessage"]: {
                        text: "Hi👋"
                    },
                    [combainedId + ".date"]: serverTimestamp()
                })
                await updateDoc(doc(db, "chatList", clickedUser.uid), {
                    [combainedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName
                    },
                    [combainedId + ".lastMessage"]: {
                        text: "Hi👋"
                    },
                    [combainedId + ".date"]: serverTimestamp()
                })
            }
            setSearchData([])
            setInput('')
        } catch (error) {
            setSearchData([])
            setInput('')
        }
    }
    const handleChangeInput = async (event) => {
        setInput(event.target.value)
        if (event.target.value.trim().length === 0) {
            setSearchData([])
            setSearchDataStatus(false)
            setInput('')
            return false
        }
        const q = query(collection(db, "users"),
            where("displayName", ">=", event.target.value),
            where("displayName", "<", event.target.value + "\uf8ff")
        )
        try {
            setSearchData([])
            setLoading(true)
            const querySnapshot = await getDocs(q)

            const data = querySnapshot.docs
                .filter((doc) => doc.data().uid !== user.uid)
                .map((doc) => (
                    {
                        id: doc.id,
                        ...doc.data()
                    }
                ))
            if (data && data.length) {
                setSearchDataStatus(false)
                setSearchData(data)
            } else {
                setSearchDataStatus(true)
                searchData([])
            }
            setLoading(false)
        }
        catch (error) {
            setLoading(false)
        }
    }
    return (
        <div className='p-2'>
            <input type="text" placeholder="🔍 Start a new chat" className="input input-bordered w-full h-10 placeholder:text-sm placeholder:text-gray-600 focus:outline-none" onChange={handleChangeInput} value={input || ""} />
            <div className='flex flex-col gap-1 p-2 px-0'>
                {
                    loading &&
                    (
                        <div className='flex gap-5 p-3 items-center justify-center cursor-pointer rounded-md'>
                            <span className="loading loading-spinner loading-sm"></span>
                        </div>
                    )
                }
                {
                    searchDataStatus && (
                        <div className='w-full text-center pt-2'>
                            <p className='text-lg font-medium'>user not found</p>
                        </div>
                    )
                }
                {searchData &&
                    searchData.map((element) => (
                        <div className='flex gap-5 p-3 items-center justify-between hover:bg-base-200 cursor-pointer rounded-md' key={element.id}>
                            <div className='flex gap-5 items-center'>
                                <div className="bg-transparent border-0 avatar placeholder cursor-pointer">
                                    <div className="bg-neutral text-neutral-content rounded-full w-12">
                                        {element.photoURL === "" ?
                                            <img src={element.photoURL} alt={element.displayName} className='object-cover' />
                                            :
                                            <span>{element.displayName.substring(0, 2).toUpperCase()}</span>
                                        }
                                    </div>
                                </div>
                                <span className='text-lg font-medium'>{element.displayName}</span>
                            </div>
                            <button onClick={() => handleOnClick(element)} className="btn btn-neutral h-10 min-h-0">Say hi
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    height="1.9em"
                                    width="1.9em">
                                    <path d="M7.03 4.95L3.5 8.5c-3.33 3.31-3.33 8.69 0 12s8.69 3.33 12 0l6-6c1-.97 1-2.56 0-3.54-.1-.12-.23-.23-.37-.32l.37-.39c1-.97 1-2.56 0-3.54-.14-.16-.33-.3-.5-.41.38-.92.21-2.02-.54-2.77-.87-.87-2.22-.96-3.2-.28a2.517 2.517 0 00-3.88-.42l-2.51 2.51c-.09-.14-.2-.27-.32-.39a2.53 2.53 0 00-3.52 0m1.41 1.42c.2-.2.51-.2.71 0s.2.51 0 .71l-3.18 3.18a3 3 0 010 4.24l1.41 1.41a5.004 5.004 0 001.12-5.36l6.3-6.3c.2-.2.51-.2.7 0s.21.51 0 .71l-4.59 4.6 1.41 1.41 6.01-6.01c.2-.2.51-.2.71 0 .2.2.2.51 0 .71l-6.01 6.01 1.41 1.41 4.95-4.95c.2-.2.51-.2.71 0 .2.2.2.51 0 .71l-5.66 5.65 1.41 1.42 3.54-3.54c.2-.2.51-.2.71 0 .2.2.2.51 0 .71l-6 6.01c-2.54 2.54-6.65 2.54-9.19 0s-2.54-6.65 0-9.19l3.53-3.54M23 17c0 3.31-2.69 6-6 6v-1.5c2.5 0 4.5-2 4.5-4.5H23M1 7c0-3.31 2.69-6 6-6v1.5c-2.5 0-4.5 2-4.5 4.5H1z" />
                                </svg>
                            </button>
                        </div>
                    ))
                }
            </div>
        </div >
    )
}

export default Search

