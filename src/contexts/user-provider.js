import React, {useContext, useEffect, useState} from "react";
import userService from "../services/user.service";
import {useAuth} from "./authentication-provider";

const {createContext} = require("react");


const UserContext = createContext({});

export default function UserProvider({children}) {
    const [user, setUser] = useState({})

    const {token} = useAuth();

    const loadFromStorage = () => {
        const userTxt = localStorage.getItem("user");
        if (userTxt) {
            setUser(JSON.parse(userTxt))
        }
    }

    useEffect(() => {
        console.log("loadFromStorage()")
        loadFromStorage()
    }, [token])

    const reloadUser = () => {
        return userService.getMyUser()
            .then(response => {
                const newUser = response.data;
                setUser(newUser)
                localStorage.setItem("user", JSON.stringify(newUser))
            })
    }

    return(
            <UserContext.Provider
                value={
                    {
                        user: user,
                        reloadUser: reloadUser
                    }
                }
            >
                {children}
            </UserContext.Provider>)
}

export const useUser = () => useContext(UserContext)
