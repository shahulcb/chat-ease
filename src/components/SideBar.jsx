import React from 'react'
import NavBar from './NavBar'
import Chats from './Chats'
import { Route, Routes } from 'react-router-dom'
import Settings from '../pages/Settings'
import Search from './Search'

function SideBar() {
    return (
        <div className='md:flex-[1] relative shadow-xl shadow-base-300 bg-base-300 flex-none w-full'>
            <NavBar />
            <Routes>
                <Route index element={
                    <>
                        <Search />
                        <Chats />
                    </>
                } />
                <Route path='/settings' element={<Settings />} />
            </Routes>
        </div>
    )
}

export default SideBar
