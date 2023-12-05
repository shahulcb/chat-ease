import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (data) => {
            setUser(data)
        })
        return unsubscribe
    }, [])
    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    )
}