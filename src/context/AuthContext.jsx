import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    })
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (data) => {
            setUser(data)
            if (data) {
                localStorage.setItem('user', JSON.stringify(data));
            } else {
                localStorage.removeItem('user');
            }
        })
        return unsubscribe
    }, [])
    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    )
}