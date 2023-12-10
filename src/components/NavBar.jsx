import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/config'
import { AuthContext } from '../context/AuthContext'

function NavBar() {
    const user = useContext(AuthContext)
    return (
        <div className="navbar bg-base-300 static top-0">
            <div className="flex-1">
                <Link to={"/"} className="btn btn-ghost text-xl">Super Chat</Link>
            </div>
            <div className="flex-none gap-2">
                <h1 className='text-xl font-normal'>@{user.displayName}</h1>
                <div className="dropdown dropdown-end">
                    <div className="btn bg-transparent border-0 avatar placeholder cursor-pointer" tabIndex={0}>
                        <div className="bg-neutral text-neutral-content rounded-full w-10 ring ring-primary ring-offset-base-100 ring-offset-2">
                            {user.photoURL === "" ?
                                <img src={user.photoURL} alt={user.displayName} className='object-cover' />
                                :
                                <span> {user.displayName.substring(0, 2).toUpperCase()}</span>
                            }
                        </div>
                    </div>
                    <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-md w-32 gap-1">
                        <li>
                            <Link to={"/search"}>Search people</Link>
                        </li>
                        <li>
                            <Link to={"/profile"}>Profile</Link>
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
