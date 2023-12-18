import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAdditionalUserInfo, getAuth, signInWithPopup } from "firebase/auth"
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCFGpXWDfRhlwNuB_iy1RgFySOqExcir04",
    authDomain: "superchat-2fc01.firebaseapp.com",
    projectId: "superchat-2fc01",
    storageBucket: "superchat-2fc01.appspot.com",
    messagingSenderId: "168950539121",
    appId: "1:168950539121:web:63cd0a8104f20e57434cd0"
};

export const googleSignin = async () => {
    const provider = new GoogleAuthProvider()
    try {
        const userCredential = await signInWithPopup(auth, provider)
        const details = getAdditionalUserInfo(userCredential)
        if (details.isNewUser) {
            await setDoc(doc(db, "users", userCredential.user.uid), {
                uid: userCredential.user.uid,
                displayName: userCredential.user.displayName,
                email: userCredential.user.email,
                photoURL: userCredential.user.photoURL
            })
            await setDoc(doc(db, "chatList", userCredential.user.uid), {})
        }
    } catch (error) {
        console.log(error);
    }

}
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()