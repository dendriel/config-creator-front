import LoginForm from "../components/LoginForm";
import styles from "./login.module.css"

export default function Login() {
    return (
        <div className={`col-md-12 ${styles.outer}`}>
            <LoginForm />
        </div>
    )
}
