import React, { createContext, useState, useContext, useEffect } from 'react'
import api from "../services/api";
import cookies from "js-cookie"

const AuthContext = createContext({});

export default function AuthenticationProvider({children} ) {

    const [token, setToken] = useState('')

    useEffect(() => {
        async function loadTokenFromCookies() {
            const token = cookies.get('token')
            if (token) {
                console.log("Got a token in the cookies " + token)
                api.defaults.headers.Authorization = `Bearer ${token}`
                setToken(token);
            }
        }
        loadTokenFromCookies()
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!token, setToken}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext)
