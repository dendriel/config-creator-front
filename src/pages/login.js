import LoginForm from "../components/LoginForm";
import styles from "./login.module.css"
import authService from "../services/auth.service";
import {useAuth} from "../contexts/authentication-provider";
import {useHistory} from "react-router";
import userService from "../services/user.service";
import {useState} from "react";

export default function Login() {
    const [loginError, setLoginError] = useState('')
    const { isAuthenticated, setAuthToken, setAuthUser, clearAuth } = useAuth()
    const [tryingLogin, setTryingLogin] = useState(false)

    const history = useHistory();

    const loadUser = () => {
        userService.getMyUser()
            .then(response => {
                setAuthUser(JSON.stringify(response.data))
                setTryingLogin(false)
                history.push('/')
            })
            .catch(() => {
                clearAuth()
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
                    return;
                }

                setAuthToken(token.jwt)
                loadUser()

            })
            .catch((error) => {
                console.log(JSON.stringify(error))
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    setLoginError("Invalid username or password");
                }
                else {
                    setLoginError("Unable to login right now")
                }

                setTryingLogin(false)
            })
    }

    if (isAuthenticated()) {
        history.push('/')
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
