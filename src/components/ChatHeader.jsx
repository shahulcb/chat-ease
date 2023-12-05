import React from 'react'

function ChatHeader() {
    return (
        <div className='w-full h-16 bg-base-200 sticky top-0 z-50 flex items-center justify-between px-10'>
            <span className='text-lg font-medium'>ancy joy</span>
            <div className='flex gap-5'>
                <svg
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    height="1.5em"
                    width="1.5em">
                    <path
                        fill="none" stroke="currentColor" strokeMiterlimit={10}
                        strokeWidth={32}
                        d="M451 374c-15.88-16-54.34-39.35-73-48.76-24.3-12.24-26.3-13.24-45.4.95-12.74 9.47-21.21 17.93-36.12 14.75s-47.31-21.11-75.68-49.39-47.34-61.62-50.53-76.48 5.41-23.23 14.79-36c13.22-18 12.22-21 .92-45.3-8.81-18.9-32.84-57-48.9-72.8C119.9 44 119.9 47 108.83 51.6A160.15 160.15 0 0083 65.37C67 76 58.12 84.83 51.91 98.1s-9 44.38 23.07 102.64 54.57 88.05 101.14 134.49S258.5 406.64 310.85 436c64.76 36.27 89.6 29.2 102.91 23s22.18-15 32.83-31a159.09 159.09 0 0013.8-25.8C465 391.17 468 391.17 451 374z"
                    />
                </svg>
                <svg
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    height="1.5em"
                    width="1.5em"
                >
                    <path
                        fillRule="evenodd"
                        d="M0 5a2 2 0 012-2h7.5a2 2 0 011.983 1.738l3.11-1.382A1 1 0 0116 4.269v7.462a1 1 0 01-1.406.913l-3.111-1.382A2 2 0 019.5 13H2a2 2 0 01-2-2V5zm11.5 5.175l3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 00-1 1v6a1 1 0 001 1h7.5a1 1 0 001-1V5a1 1 0 00-1-1H2z"
                    />
                </svg>

                <div className="dropdown dropdown-end">
                    <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        height="1.5em"
                        width="1.5em"
                        tabIndex={0}
                    >
                        <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52 mt-7">
                        <li><a href>Item 1</a></li>
                        <li><a href>Item 2</a></li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default ChatHeader
