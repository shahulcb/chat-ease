import React from 'react'

function VerifyEmail() {
    return (
        <div className='w-full h-screen flex items-center justify-center fixed backdrop-blur-sm'>
            <div className='max-w-md w-full px-5 py-10 rounded-md bg-base-200 flex flex-col gap-6 text-center'>
                {/* <h3 className='text-2xl font-medium'>Super Chat</h3> */}
                <p className='text-xl font-medium'>"Thank you for signing up! Please check your email and click the confirmation link to activate your account."</p>
                <button className="btn btn-accent">
                    Waiting for your confirmation
                </button>
            </div>
        </div >
    )
}

export default VerifyEmail
