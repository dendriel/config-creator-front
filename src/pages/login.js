import LoginForm from "../components/LoginForm";
import styles from "./login.module.css"
import authService from "../services/auth.service";
import cookies from "js-cookie";
import restService from "../services/rest.service";
import {useEffect, useState} from "react";
import {useAuth} from "../contexts/authentication-provider";
import {useHistory} from "react-router";

export default function Login() {
    const [loginError, setLoginError] = useState('')
    const { isAuthenticated, setToken } = useAuth()
    const [tryingLogin, setTryingLogin] = useState(false)

    const history = useHistory();

    useEffect(() => {
        console.log(isAuthenticated)
        if (isAuthenticated) {
            console.log("Already logged in")
            history.push('/')
        }
    }, [history, isAuthenticated]);

    const login = (username, password) => {
        setLoginError('')
        setTryingLogin(true)
        authService.authenticate(username, password)
            .then((response) => {
                const token = response.data
                if (!token) {
                    console.log("Unexpected response from login")
                    return false;
                }

                setToken(token.jwt)
                cookies.set('token', token.jwt, { expires: 60 })
                restService.api.defaults.headers.Authorization = `Bearer ${token.jwt}`
                console.log("Got token " + token.jwt)
            })
            .catch((error) => {
                console.log(JSON.stringify(error))
                if (error.response.status === 401 || error.response.status === 403) {
                    setLoginError("Invalid username or password");
                }
                else {
                    setLoginError("Unable to login right now")
                }
            })
            .finally(() => {
                setTryingLogin(false)
            })
    }

    return (
        <div className={`col-md-12 ${styles.outer}`}>
            <LoginForm
                setLoginError={setLoginError}
                login={login}
                loginError={loginError}
                tryingLogin={tryingLogin}
            />
        </div>
    )
}
