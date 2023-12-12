import React, { useContext } from 'react'
import SideBar from '../components/SideBar'
import Chat from './Chat'
import { ChatContext } from '../context/ChatContext'

function Home() {
    const { data } = useContext(ChatContext)

    return (
        <div className='w-full h-screen flex'>
            <SideBar />
            <div className={`md:flex-[2] md:relative bg-base-100 ${data.chatId !== "" && "flex-none w-full absolute"}`}>
                {data.chatId !== "" && <Chat />}
            </div>
        </div>
    )
}

export default Home
