import React from 'react'

function Chats() {
    return (
        <div className='flex flex-col gap-1 p-2'>
            <div className='flex gap-5 p-3 items-center hover:bg-base-200 cursor-pointer rounded-md'>
                <div className="avatar">
                    <div className="w-12 rounded-full">
                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt='' />
                    </div>
                </div>
                <div>
                    <span className='text-lg font-medium'>ancy joy</span>
                    <p className='text-sm text-gray-400'>last messages</p>
                </div>
            </div>
            <div className='flex gap-5 p-3 items-center hover:bg-base-200 cursor-pointer rounded-md'>
                <div className="avatar">
                    <div className="w-12 rounded-full">
                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt='' />
                    </div>
                </div>
                <div>
                    <span className='text-lg font-medium'>ancy joy</span>
                    <p className='text-sm text-gray-400'>last messages</p>
                </div>
            </div>
        </div>
    )
}

export default Chats
