import React from 'react'
import { Link } from 'react-router-dom'
import { googleSignin } from '../firebase/config'


function Login() {
    return (
        <div className='w-full h-screen flex items-center justify-center bg-gray-800 text-gray-300'>
            <div className='max-w-md p-5 flex flex-col gap-5 text-center'>
                <h1 className='text-3xl'>Chat Ease</h1>
                <p className='text-base'>Chat instantly with [Your App Name] for easy and enjoyable conversations.</p>
                <div className='flex gap-5 justify-center'>
                    <div className='w-full border border-gray-500 p-3 rounded-md flex gap-5 cursor-pointer hover:bg-gray-700' onClick={googleSignin}>
                        <svg
                            viewBox="0 0 1024 1024"
                            fill="currentColor"
                            height="1.5em"
                            width="1.5em">
                            <path d="M881 442.4H519.7v148.5h206.4c-8.9 48-35.9 88.6-76.6 115.8-34.4 23-78.3 36.6-129.9 36.6-99.9 0-184.4-67.5-214.6-158.2-7.6-23-12-47.6-12-72.9s4.4-49.9 12-72.9c30.3-90.6 114.8-158.1 214.7-158.1 56.3 0 106.8 19.4 146.6 57.4l110-110.1c-66.5-62-153.2-100-256.6-100-149.9 0-279.6 86-342.7 211.4-26 51.8-40.8 110.4-40.8 172.4S151 632.8 177 684.6C240.1 810 369.8 896 519.7 896c103.6 0 190.4-34.4 253.8-93 72.5-66.8 114.4-165.2 114.4-282.1 0-27.2-2.4-53.3-6.9-78.5z" />
                        </svg>
                        <p>Login with Google</p>
                    </div>
                </div>
                <p>You dont have an account? <Link to={"/signup"} className='text-blue-800 font-semibold'>Sign up</Link></p>
            </div>
        </div>
    )
}

export default Login
