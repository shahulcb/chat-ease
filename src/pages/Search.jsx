import React from 'react'

function Search() {
    return (
        <div className='p-2'>
            <input type="text" placeholder="Search here" className="input input-bordered w-full" />
            <div className='flex flex-col gap-1 p-2 px-0'>
                <div className='flex gap-5 p-3 items-center justify-between hover:bg-base-200 cursor-pointer rounded-md'>
                    <div className='flex gap-5 items-center'>
                        <div className="avatar">
                            <div className="w-12 rounded-full">
                                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt='' />
                            </div>
                        </div>
                        <span className='text-lg font-medium'>ancy joy</span>
                    </div>
                    <button className="btn btn-neutral h-8 min-h-0">Start chat</button>
                </div>
            </div>

        </div>
    )
}

export default Search
