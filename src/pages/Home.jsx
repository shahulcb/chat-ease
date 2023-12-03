import React from 'react'
import SideBar from '../components/SideBar'
import Chat from '../components/Chat'

function Home() {
    return (
        <div className='w-full h-screen flex'>
            <SideBar />
            <Chat />
        </div>
    )
}

export default Home
