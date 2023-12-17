import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth"
import { auth, db, storage } from '../firebase/config'
import { doc, setDoc } from "firebase/firestore"
import Loading from '../components/Loading'
import Alert from '../components/Alert'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

function Signup() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [inputs, setInputs] = useState({})
    const [error, setError] = useState('')
    const [image, setImage] = useState(null)
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
            const userCredential = await createUserWithEmailAndPassword(auth, inputs.email, inputs.password)
            const storageRef = ref(storage, userCredential.user.uid)
            await uploadBytes(storageRef, image)
            const downloadURL = await getDownloadURL(storageRef)
            await updateProfile(userCredential.user, {
                photoURL: downloadURL,
                displayName: inputs.name
            })
            await setDoc(doc(db, "users", userCredential.user.uid), {
                uid: userCredential.user.uid,
                displayName: inputs.name,
                email: inputs.email,
                photoURL: downloadURL
            })
            await setDoc(doc(db, "chatList", userCredential.user.uid), {})
            // await sendEmailVerification(userCredential.user)

            navigate("/")

        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // setInputs({})
            setLoading(false)
            setError(errorMessage)
        }
    }
    return (
        <div className='w-full h-screen flex items-center justify-center bg-gray-800 text-gray-300'>
            {loading && <Loading />}
            {error && <Alert error={error} />}
            <div className='max-w-md p-5 flex flex-col gap-5 text-center' onClick={() => setError('')}>
                <h1 className='text-3xl'>Super Chat</h1>
                <p className='text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, numquam.</p>
                <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" className="input input-bordered input-md w-full bg-gray-800" name='name' value={inputs.name || ""} onChange={handleInputs} required />
                    <input type="email" placeholder="Email" className="input input-bordered input-md w-full bg-gray-800" name='email' value={inputs.email || ""} onChange={handleInputs} required />
                    <input type="password" placeholder="Password" className="input input-bordered input-md w-full bg-gray-800" name='password' value={inputs.password || ""} onChange={handleInputs} required />
                    <input type="file" className='hidden' id='file' required onChange={(event) => setImage(event.target.files[0])} />
                    <div className='flex justify-between px-1'>
                        <label htmlFor="file" className='text-base font-medium flex items-center gap-3'>
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                height="2em"
                                width="2em"
                            >
                                <path d="M8.998999999999999 9.5 A1.5 1.5 0 0 1 7.499 11 A1.5 1.5 0 0 1 5.999 9.5 A1.5 1.5 0 0 1 8.998999999999999 9.5 z" />
                                <path d="M10.499 14l-1.5-2-3 4h12l-4.5-6z" />
                                <path d="M19.999 4h-16c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-16 14V6h16l.002 12H3.999z" />
                            </svg>
                            Add profile image</label>
                        {image &&
                            <div className='w-14 h-14'>
                                <img src={URL.createObjectURL(image)} alt="" />
                            </div>
                        }
                    </div>
                    <button className="btn hover:bg-gray-900 bg-gray-900 border-none">Sign up</button>
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
                <p>You do have an account? <Link to={"/login"} className='text-blue-800 font-semibold'>Login</Link></p>
            </div>
        </div>
    )
}

export default Signup
