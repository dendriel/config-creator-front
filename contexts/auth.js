import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'

//api here is an axios instance which has the baseURL set according to the env.
import api from '../services/Api';
import Login from "../pages/login";


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadTokenFromCookies() {
            const token = Cookies.get('token')
            if (token) {
                console.log("Got a token in the cookies, let's see if it is valid")
                api.defaults.headers.Authorization = `Bearer ${token}`
                setToken(token);
            }
            setLoading(false)
        }
        loadTokenFromCookies()
    }, [])

    const login = async (username, password) => {
        try {
            const { data: token } = await api.post('http://localhost:8080/authenticate', { username, password })
            if (!token) {
                console.log("Unexpected response from login")
                return false;
            }
            Cookies.set('token', token.jwt, { expires: 60 })
            api.defaults.headers.Authorization = `Bearer ${token.jwt}`
            setToken(token.jwt)
            console.log("Got token " + token.jwt)
            return true;
        } catch (error) {
            console.log("Failed to login! " + error)
        }
        return false;
    }

    const logout = () => {
        Cookies.remove('token')
        setToken(null)
        delete api.defaults.headers.Authorization
        window.location.pathname = '/login'
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!token, token, login, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)


export const ProtectRoute = ({ children }) => {
    if (typeof window === 'undefined') {
        return children;
    }

    const { isAuthenticated } = useAuth();

    console.log("auth: " + isAuthenticated)
    if (!isAuthenticated && window.location.pathname !== '/login') {
        console.log("Unauthenticated");
        return <Login />;
        // return children
    }
    return children;
};
