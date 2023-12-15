import React, { useContext, useState } from 'react'
import { AuthContext } from "../context/AuthContext"
import { updateProfile } from 'firebase/auth'
import { auth } from '../firebase/config'
import { storage } from "../firebase/config"
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'

function Settings() {
    const { user } = useContext(AuthContext)
    const [profileImage, setProfileImage] = useState(null)
    const [profileImageURL, setProfileImageURL] = useState(null)
    const [displayName, setDisplayName] = useState(user.displayName)
    const [changed, setChanged] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleDisplayName = (event) => {
        setDisplayName(event.target.value)
        if (event.target.value !== user.displayName) {
            setChanged(true)
        } else {
            setChanged(false)
        }
    }
    const handleProfileImage = (event) => {
        setProfileImage(event.target.files[0])
        setChanged(true)
        if (event.target.files[0]) {
            setProfileImageURL(URL.createObjectURL(event.target.files[0]))
        }
    }
    const handleDiscard = () => {
        setDisplayName(user.displayName)
        setProfileImage(null)
        setChanged(false)
    }
    const saveChanges = async () => {
        try {
            setLoading(true)
            if (user.displayName !== displayName) {
                await updateProfile(auth.currentUser, {
                    displayName,
                })
            }
            if (profileImage) {
                const storageRef = ref(storage, user.uid)
                const existingProfileImageExists = await getDownloadURL(storageRef).then(() => true).catch(() => false);
                if (existingProfileImageExists) {
                    // console.log("already exist");
                    await deleteObject(storageRef);
                    // console.log("already exist deleted");
                }
                // console.log("start upload task");
                const uploadTask = await uploadBytes(storageRef, profileImage)
                const downloadURL = await getDownloadURL(storageRef)
                await updateProfile(auth.currentUser, {
                    photoURL: downloadURL
                })
                // console.log("completed upload task");
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error.message);

        }
    }
    return (
        <div className='flex flex-col gap-5 items-center p-5'>
            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-12">
                        {profileImage ?
                            (
                                <img src={profileImageURL} />
                            )
                            :
                            (
                                user.photoURL === "" ?
                                    <img src={user.photoURL} alt={user.displayName} className='object-cover' />
                                    :
                                    <span> {user.displayName.substring(0, 2).toUpperCase()}</span>
                            )
                        }
                    </div>
                </div>
                <div className="avatar placeholder">
                    <div className="w-12 bg-neutral text-neutral-content">
                        <label htmlFor="imgfile" className='cursor-pointer'>
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                                height="1.5em"
                                width="1.5em">
                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                            </svg>
                        </label>
                        <input type="file" hidden id='imgfile' onChange={handleProfileImage} />
                    </div>
                </div>
            </div>
            <p className='text-gray-300'>Change profile image</p>
            <input type="text" placeholder="Type here" className="input border border-gray-700 focus:border-gray-600 w-full bg-transparent h-10 placeholder:text-sm placeholder:text-gray-300 focus:outline-none text-gray-300" value={displayName} onChange={handleDisplayName} />
            {changed && (
                <div className='flex gap-3'>
                    <button className="btn btn-error h-10 min-h-full" onClick={handleDiscard}>Discard</button>
                    <button className="btn btn-active btn-primary h-10 min-h-full" onClick={saveChanges}>
                        {loading ? (<span className="loading loading-spinner loading-md"></span>) : "Save"}

                    </button>
                </div>
            )
            }
        </div>
    )
}

export default Settings
