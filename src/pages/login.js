import LoginForm from "../components/LoginForm";
import styles from "./login.module.css"
import authService from "../services/auth.service";
import cookies from "js-cookie";
import restService from "../services/rest.service";
import {useAuth} from "../contexts/authentication-provider";
import {useHistory} from "react-router";
import userService from "../services/user.service";
import {useState} from "react";

export default function Login() {
    const [loginError, setLoginError] = useState('')
    const { setToken } = useAuth()
    const [tryingLogin, setTryingLogin] = useState(false)

    const history = useHistory();

    const loadUser = (token) => {
        userService.getMyUser()
            .then(response => {

                console.log("Got token " + token.jwt)
                localStorage.setItem("user", JSON.stringify(response.data))
                setToken(token.jwt)
                cookies.set('token', token.jwt, { expires: 60 })

                setTryingLogin(false)
                history.push('/')
            })
            .catch(() => {
                restService.api.defaults.headers.Authorization = null
                setLoginError("Unable to login right now")
                setTryingLogin(false)
            })
    }

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
                loadUser(token)

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
