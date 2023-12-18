import React, { useContext } from 'react'
import { ChatContext } from "../context/ChatContext"

function ChatHeader() {
    const { data, dispatch } = useContext(ChatContext)
    return (
        <div className='w-full h-16 border-b border-gray-700 backdrop-blur-[1px] flex items-center justify-between md:px-10 px-5'>
            <div className='flex items-center gap-2'>
                <div onClick={() => dispatch({ type: "REMOVE_USER", payload: {} })} className='md:hidden block cursor-pointer'>
                    <svg
                        fill="white"
                        viewBox="0 0 16 16"
                        height="1.9em"
                        width="1.9em">
                        <path
                            fillRule="evenodd"
                            d="M12 8a.5.5 0 01-.5.5H5.707l2.147 2.146a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 11.708.708L5.707 7.5H11.5a.5.5 0 01.5.5z"
                        />
                    </svg>
                </div>
                <span className='text-lg font-medium text-gray-300'>{data.user?.displayName}</span>
            </div>
            <div className='flex gap-5'>
                {/* <svg
                    viewBox="0 0 512 512"
                    fill="white"
                    height="1.5em"
                    width="1.5em">
                    <path
                        fill="none" stroke="white" strokeMiterlimit={10}
                        strokeWidth={32}
                        d="M451 374c-15.88-16-54.34-39.35-73-48.76-24.3-12.24-26.3-13.24-45.4.95-12.74 9.47-21.21 17.93-36.12 14.75s-47.31-21.11-75.68-49.39-47.34-61.62-50.53-76.48 5.41-23.23 14.79-36c13.22-18 12.22-21 .92-45.3-8.81-18.9-32.84-57-48.9-72.8C119.9 44 119.9 47 108.83 51.6A160.15 160.15 0 0083 65.37C67 76 58.12 84.83 51.91 98.1s-9 44.38 23.07 102.64 54.57 88.05 101.14 134.49S258.5 406.64 310.85 436c64.76 36.27 89.6 29.2 102.91 23s22.18-15 32.83-31a159.09 159.09 0 0013.8-25.8C465 391.17 468 391.17 451 374z" />
                </svg>
                <svg
                    fill="white"
                    viewBox="0 0 16 16"
                    height="1.5em"
                    width="1.5em">
                    <path
                        fillRule="evenodd"
                        d="M0 5a2 2 0 012-2h7.5a2 2 0 011.983 1.738l3.11-1.382A1 1 0 0116 4.269v7.462a1 1 0 01-1.406.913l-3.111-1.382A2 2 0 019.5 13H2a2 2 0 01-2-2V5zm11.5 5.175l3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 00-1 1v6a1 1 0 001 1h7.5a1 1 0 001-1V5a1 1 0 00-1-1H2z"
                    />
                </svg> */}
                {/* <div className="dropdown dropdown-end">
                    <svg
                        viewBox="0 0 24 24"
                        fill="white"
                        height="1.5em"
                        width="1.5em"
                        tabIndex={0}
                    >
                        <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52 mt-7">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div> */}
            </div>
        </div>
    )
}

export default ChatHeader
