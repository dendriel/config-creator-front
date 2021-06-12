import LoginForm from "../components/LoginForm";
import styles from "../global.css"

export default function Login() {
    return (
        <div className={`container col-md-12 ${styles.outer}`}>
            <LoginForm />
        </div>
    )
}
