import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../firebase/config'
import Loading from '../components/Loading'
import VerifyEmail from '../components/VerifyEmail'



function Login() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [emailSend, setEmailSend] = useState(false)
    const [inputs, setInputs] = useState({})
    const handleInputs = (event) => {
        setInputs(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            setLoading(true)
            const userCredential = await signInWithEmailAndPassword(auth, inputs.email, inputs.password)

            if (!userCredential.user.emailVerified) {
                await sendEmailVerification(userCredential.user)
                setEmailSend(true)
                let intervel = setInterval(async () => {
                    if (userCredential.user.emailVerified) {
                        clearInterval(intervel)
                        navigate("/")
                    }
                    await userCredential.user.reload()
                }, 2000);
            } else {
                navigate("/")
            }
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            setInputs({})
            setLoading(false)
            setEmailSend(false)
        }
    }
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            {loading && <Loading />}
            {emailSend && <VerifyEmail />}
            <div className='max-w-md p-5 flex flex-col gap-5 text-center'>
                <h1 className='text-3xl'>Super Chat</h1>
                <p className='text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, numquam.</p>
                <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" className="input input-bordered input-md w-full" name='email' value={inputs.email || ""} onChange={handleInputs} />
                    <input type="password" placeholder="Password" className="input input-bordered input-md w-full" name='password' value={inputs.password || ""} onChange={handleInputs} />
                    <button className="btn">Login</button>
                </form>
                <div className='flex gap-5 justify-center'>
                    <svg
                        viewBox="0 0 1024 1024"
                        fill="currentColor"
                        height="1.5em"
                        width="1.5em">
                        <path d="M881 442.4H519.7v148.5h206.4c-8.9 48-35.9 88.6-76.6 115.8-34.4 23-78.3 36.6-129.9 36.6-99.9 0-184.4-67.5-214.6-158.2-7.6-23-12-47.6-12-72.9s4.4-49.9 12-72.9c30.3-90.6 114.8-158.1 214.7-158.1 56.3 0 106.8 19.4 146.6 57.4l110-110.1c-66.5-62-153.2-100-256.6-100-149.9 0-279.6 86-342.7 211.4-26 51.8-40.8 110.4-40.8 172.4S151 632.8 177 684.6C240.1 810 369.8 896 519.7 896c103.6 0 190.4-34.4 253.8-93 72.5-66.8 114.4-165.2 114.4-282.1 0-27.2-2.4-53.3-6.9-78.5z" />
                    </svg>
                    <svg fill="none" viewBox="0 0 24 24" height="1.5em" width="1.5em">
                        <path
                            fill="currentColor"
                            d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 011-1h3v-4h-3a5 5 0 00-5 5v2.01h-2l-.396 3.98h2.396v8.01z"
                        />
                    </svg>
                </div>
                <p>You dont have an account? <Link to={"/signup"} className='text-blue-800 font-semibold'>Sign up</Link></p>
            </div>
        </div>
    )
}

export default Login
