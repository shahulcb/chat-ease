import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/config'
import { AuthContext } from '../context/AuthContext'

function NavBar() {
    const { user } = useContext(AuthContext)
    console.log(user);
    return (
        <div className="navbar static top-0 p-3">
            <div className="flex-1">
                <Link to={"/"} className='text-lg font-medium text-gray-300'>Super Chat</Link>
            </div>
            <div className="flex-none">
                {/* <h1 className='text-sm font-medium'>@ {user.displayName}</h1> */}
                <div className="dropdown dropdown-end">
                    <div className="avatar placeholder cursor-pointer" tabIndex={0}>
                        <div className="text-neutral-content rounded-full w-11 bg-gray-800 ring ring-gray-600">
                            {user.photoURL ?
                                <img src={user.photoURL} alt={user.displayName} className='object-cover' />
                                :
                                <span> {user.displayName.substring(0, 2).toUpperCase()}</span>
                            }
                        </div>
                    </div>
                    <ul className="mt-4 z-[1] p-2 shadow menu menu-sm dropdown-content bg-gray-800 rounded-md w-32 gap-1 text-gray-300">
                        <li>
                            <Link className='font-medium'>@ {user.displayName}</Link>
                        </li>
                        <li>
                            <Link to={"/settings"}>Settings</Link>
                        </li>
                        <li>
                            <button onClick={() => { localStorage.removeItem("user"); signOut(auth) }} className="btn min-h-full h-full btn-error hover:bg-red-500 justify-start rounded-md">Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default NavBar
