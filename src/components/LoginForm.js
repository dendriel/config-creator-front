import {useState} from "react";
import styles from './LoginForm.module.css'


export default function LoginForm (props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!username) {
            props.setLoginError("Please, enter a username")
            return
        }

        if (!password) {
            props.setLoginError("Please, enter a password")
            return
        }

        props.login(username, password)
        setUsername('')
        setPassword('')
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
                        disabled={props.tryingLogin}
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
                        disabled={props.tryingLogin}
                    />
                    <br/>
                </div>
                <div className={`row float-end ${styles.submit}`}>
                    <div className="col-md-12">
                        <button
                            type="submit"
                            className="btn btn-primary float-right"
                            disabled={props.tryingLogin}
                        >
                        {props.tryingLogin ?
                            <span className="spinner-border spinner-border-sm" />
                            : null
                        }
                            Login
                        </button>
                    </div>
                </div>
                {props.loginError && <p style={{color: 'red'}}>{props.loginError}</p>}
            </div>
        </form>
    )
}
