import React from 'react'
import NavBar from './NavBar'
import Chats from './Chats'

function SideBar() {
    return (
        <div className='flex-[1] relative shadow-xl shadow-base-300 bg-base-300'>
            <NavBar />
            <Chats />
        </div>
    )
}

export default SideBar
