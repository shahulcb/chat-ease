import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";



export const ChatContext = createContext()

export const ChatContextProvider = ({ children }) => {
    const { user } = useContext(AuthContext)
    const INITAIL_STATE = {
        chatId: "",
        user: {}
    }
    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHAHNGE_USER":
                return {
                    chatId: user.uid > action.payload.uid ? user.uid + action.payload.uid : action.payload.uid + user.uid,
                    user: action.payload,
                }
            case "REMOVE_USER":
                return {
                    chatId: "",
                    user: {}
                }
            default:
                return state
        }
    }
    const [state, dispatch] = useReducer(chatReducer, INITAIL_STATE)
    return (
        <ChatContext.Provider value={{ data: state, dispatch }}>
            {children}
        </ChatContext.Provider>
    )
}