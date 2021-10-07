import {useHistory} from "react-router";
import {useAuth} from "../contexts/authentication-provider";
import {useEffect} from "react";

export default function Logout() {
    const { clearAuth } = useAuth()

    const history = useHistory();

    useEffect(() => {
        console.log('Logging out')
        clearAuth()

        history.push('/login')
    }, [])

    return <></>
}
