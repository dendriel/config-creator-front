import React, {useContext, useState} from "react";
import userService from "../services/user.service";

const {createContext} = require("react");


const UserContext = createContext({});

export default function UserProvider({children}) {

    const userTxt = localStorage.getItem("usercc");
    let userObj = userTxt ? JSON.parse(userTxt) : {}

    const [user, setUser] = useState(userObj)

    const reloadUser = () => {
        return userService.getMyUser()
            .then(response => {
                const newUser = response.data;
                setUser(newUser)
                localStorage.setItem("usercc", JSON.stringify(newUser))
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
