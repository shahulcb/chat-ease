import React from 'react'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/config'

function NavBar() {
    return (
        <div className="navbar bg-base-300 static top-0">
            <div className="flex-1">
                <Link to={"/"} className="btn btn-ghost text-xl">Super Chat</Link>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input type="text" placeholder="@ancyjoy" className="input input-bordered w-24 md:w-auto" />
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-md w-32 gap-1">
                        <li>
                            <Link to={"/profile"}>Profile</Link>
                        </li>
                        <li>
                            <button onClick={() => signOut(auth)} className="btn min-h-full h-full btn-error hover:bg-red-500 justify-start rounded-md">Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar
