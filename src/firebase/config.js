import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCFGpXWDfRhlwNuB_iy1RgFySOqExcir04",
    authDomain: "superchat-2fc01.firebaseapp.com",
    projectId: "superchat-2fc01",
    storageBucket: "superchat-2fc01.appspot.com",
    messagingSenderId: "168950539121",
    appId: "1:168950539121:web:63cd0a8104f20e57434cd0"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore()