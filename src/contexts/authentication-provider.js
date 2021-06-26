import React, { createContext, useState, useContext, useEffect } from 'react'
import cookies from "js-cookie"
import restService from "../services/rest.service";

const AuthContext = createContext({});

export default function AuthenticationProvider({children} ) {

    const [token, setToken] = useState('')

    restService.setToken = setToken

    useEffect(() => {
        async function loadTokenFromCookies() {
            const token = cookies.get('token')
            if (token) {
                console.log("Got a token in the cookies " + token)
                restService.api.defaults.headers.Authorization = `Bearer ${token}`
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
