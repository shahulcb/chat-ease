import React, { useState } from 'react'
import { Timestamp, arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"
import { db } from "../firebase/config"
import { useContext } from 'react'
import { AuthContext } from "../context/AuthContext"
import { v4 as uuid } from 'uuid'

function Search() {
    const { user } = useContext(AuthContext)
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
        <div className='p-2 mt-2'>
            <input type="text" placeholder="🔍 Start a new chat" className="input border border-gray-700 focus:border-gray-600 w-full bg-transparent h-10 placeholder:text-sm placeholder:text-gray-300 focus:outline-none text-gray-300" onChange={handleChangeInput} value={input || ""} />
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
                    <div className='w-full text-center mt-3'>
                        <p className='text-md font-medium text-gray-300'>User not found</p>
                    </div>
                )
            }
            {searchData.length > 0 && (<div className='flex flex-col gap-1 p-2 px-0 border-b-2 border-gray-800'>
                {searchData.map((element) => (
                    <div className='flex gap-5 p-3 items-center justify-between cursor-pointer rounded-md' key={element.id}>
                        <div className='flex gap-5 items-center'>
                            <div className="bg-transparent border-0 avatar placeholder cursor-pointer">
                                <div className="bg-gray-800 text-neutral-content rounded-full w-12">
                                    {element.photoURL === "" ?
                                        <img src={element.photoURL} alt={element.displayName} className='object-cover' />
                                        :
                                        <span>{element.displayName.substring(0, 2).toUpperCase()}</span>
                                    }
                                </div>
                            </div>
                            <span className='text-lg text-gray-300 font-medium'>{element.displayName}</span>
                        </div>
                        <button onClick={() => handleOnClick(element)} className="btn bg-gray-800 border-none hover:bg-gray-700 h-10 min-h-0">Say hi 👋
                        </button>
                    </div>
                ))
                }
            </div>
            )}
        </div >
    )
}

export default Search

