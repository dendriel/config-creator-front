import LoginForm from "../components/LoginForm";
import styles from "./login.module.css"
import authService from "../services/auth.service";
import cookies from "js-cookie";
import restService from "../services/rest.service";
import {useEffect, useState} from "react";
import {useAuth} from "../contexts/authentication-provider";
import {useHistory} from "react-router";
import userService from "../services/user.service";

export default function Login() {
    const [loginError, setLoginError] = useState('')
    const { isAuthenticated, setToken } = useAuth()
    const [tryingLogin, setTryingLogin] = useState(false)

    const history = useHistory();

    useEffect(() => {
        console.log(isAuthenticated)
        if (!isAuthenticated) {
            return;
        }

        console.log("Already logged in")

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

                restService.api.defaults.headers.Authorization = `Bearer ${token.jwt}`
                userService.getMyUser()
                    .then(response => {

                        setToken(token.jwt)
                        cookies.set('token', token.jwt, { expires: 60 })
                        console.log("Got token " + token.jwt)

                        localStorage.setItem("user", JSON.stringify(response.data))
                        console.log(response.data)

                        setTryingLogin(false)

                        history.push('/')
                    })
            })
            .catch((error) => {
                console.log(JSON.stringify(error))
                if (error.response.status === 401 || error.response.status === 403) {
                    setLoginError("Invalid username or password");
                }
                else {
                    setLoginError("Unable to login right now")
                }

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
