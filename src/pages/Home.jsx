import React, { useContext } from 'react'
import SideBar from '../components/SideBar'
import Chat from './Chat'
import { ChatContext } from '../context/ChatContext'
import doodleBG from "../assets/doodleBG.png"
import { Route, Routes } from 'react-router-dom'

function Home() {
    const { data } = useContext(ChatContext)

    return (
        <div className='w-full h-screen flex'>
            <SideBar />
            <div className={`md:flex-[2] md:relative bg-gray-800 ${data.chatId !== "" && "flex-none w-full absolute"}`} style={{ backgroundImage: `url(${doodleBG})`, backgroundSize: "380px 380px", backgroundRepeat: "repeat" }}>
                {data.chatId !== "" ? <Chat /> : (
                    <Routes>
                        <Route index element={
                            <div className='w-full h-full text-center md:flex items-center justify-center hidden'>
                                <p className='w-80 text-gray-400 text-lg font-medium'>"Ready to chat? Pick a friend from your list or find new connections for a fun conversation!"</p>
                            </div>}
                        />
                    </Routes>
                )}
            </div>
        </div>
    )
}

export default Home
