import {useState} from "react";
import restService from "../services/api"
import cookies from 'js-cookie'
import styles from './LoginForm.module.css'
import {useHistory} from "react-router";
import {useAuth} from "../contexts/authentication-provider";
import {useEffect} from "react";


export default function LoginForm () {
    const [loginError, setLoginError] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { isAuthenticated, setToken } = useAuth()

    const history = useHistory();

    useEffect(() => {
        console.log(isAuthenticated)
        if (isAuthenticated) {
            console.log("Already logged in")
            history.push('/')
        }
    }, [history, isAuthenticated]);

    const login = async (username, password) => {
        try {
            const { data: token } = await restService.api.post('http://localhost:8080/authenticate', { username, password })
            if (!token) {
                console.log("Unexpected response from login")
                return false;
            }

            setToken(token.jwt)
            cookies.set('token', token.jwt, { expires: 60 })
            restService.api.defaults.headers.Authorization = `Bearer ${token.jwt}`
            console.log("Got token " + token.jwt)
            return true;
        } catch (error) {
            console.log("Failed to login! " + error)
        }
        return false;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const success = await login(username, password)

        if (success) {
            history.push('/');
            console.log("Success");
        }
        else {
            setLoginError("Invalid username or password");
        }
    }

    return (
        <form onSubmit={handleSubmit} className={`form-group col-md-2 ${styles.form}`}>
            <div className="col-md-12">
                <div className="row">
                    <label htmlFor="usernameInput">Username:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <br />
                </div>
                <div className="row">
                    <label htmlFor="passwordInput">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br/>
                </div>
                <div className={`row float-end ${styles.submit}`}>
                    <div className="col-md-12">
                        <button type="submit">Log in</button>
                    </div>
                </div>
                {loginError && <p style={{color: 'red'}}>{loginError}</p>}
            </div>
        </form>
    )
}
