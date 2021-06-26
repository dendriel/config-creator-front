import React, {useContext, useEffect, useState} from "react";
import userService from "../services/user.service";

const {createContext} = require("react");


const UserContext = createContext({});

export default function UserProvider({children}) {
    const [user, setUser] = useState({})

    const loadFromStorage = () => {
        const userTxt = localStorage.getItem("user");
        if (userTxt) {
            setUser(JSON.parse(userTxt))
        }
    }

    useEffect(() => {
        loadFromStorage()
    }, [])

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
