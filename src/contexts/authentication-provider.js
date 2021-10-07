import React, {createContext, useState, useContext} from 'react'
import cookies from "js-cookie"

const AuthContext = createContext({});

export default function AuthenticationProvider({children} ) {
    const [token, setToken] = useState(cookies.get('AUCC'))
    const [user, setUser] = useState(localStorage.getItem("usercc"))

    const isAuthenticated = () => {
        return token && user
    }

    const setAuthToken = (token) => {
        cookies.set('AUCC', token, { expires: 60 })
        setToken(token)
    }

    const setAuthUser = (user) => {
        localStorage.setItem("usercc", user)
        setUser(user)
    }

    const clearAuth = () => {
        cookies.remove('AUCC')
        setToken(null)
        localStorage.removeItem("usercc")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated: isAuthenticated, setAuthToken, setAuthUser, clearAuth}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext)
