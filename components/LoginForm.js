import {useState} from 'react'
import styles from './login.module.css'
import { useRouter } from "next/router";
import {useAuth} from "../contexts/auth";

export default function LoginForm () {
    const [loginError, setLoginError] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { setToken, login } = useAuth()

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const success = await login(username, password)

        if (success) {
            router.push('/');
        }
        else {
            setLoginError("Invalid username or password");
        }

        // fetch('http://localhost:8080/authenticate', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         username,
        //         password,
        //     }),
        // })
        // .then((r) => {
        //     return r.json();
        // })
        // .then((data) => {
        //     if (data && data.error) {
        //         setLoginError(data.message);
        //     }
        //     if (data && data.jwt) {
        //         console.log("Got jwt " + data.jwt);
        //         setToken(data.jwt);
        //         router.push('/');
        //     }
        // })
        //     .catch(r => {
        //         setLoginError("Can't login right now. " + r);
        //     });
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
