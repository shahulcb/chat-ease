import React, { useContext } from 'react'
import SideBar from '../components/SideBar'
import Chat from './Chat'
import { ChatContext } from '../context/ChatContext'

function Home() {
    const { data, dispatch } = useContext(ChatContext)

    return (
        <div className='w-full h-screen flex'>
            <SideBar />
            <div className={`md:flex-[2] md:relative overflow-hidden bg-base-100 ${data.chatId !== "" && "flex-none w-full absolute h-full"}`}>
                {data.chatId !== "" && <Chat />}
            </div>
        </div>
    )
}

export default Home
