import React, { createContext, useState, useContext } from 'react'
import cookies from "js-cookie"
import restService from "../services/rest.service";

const AuthContext = createContext({});

export default function AuthenticationProvider({children} ) {
    const [token, setToken] = useState(cookies.get('token'))

    restService.setToken = setToken

    if (token) {
        console.log("Got a token in the cookies")
        restService.api.defaults.headers.Authorization = `Bearer ${token}`
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!token, token, setToken}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext)
