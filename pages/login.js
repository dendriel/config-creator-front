import LoginForm from "../components/LoginForm";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Login() {
    return (
        <div className="container col-md-12 outer">
            <Head>
                <title>NPC Data Manager</title>
                <meta name="description" content="Create and manage data for game projects." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={`form-group col-md-12 ${styles.main}`}>
                <h1 className={styles.title}>
                    NPC Data Manager
                </h1>

                <p className={styles.description}>
                    Create and manage data for game projects
                </p>

                <LoginForm />

            </main>

            <footer className={styles.footer}>
                <a
                    href="https://github.com/dendriel"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
                </a>
            </footer>
        </div>
    )
}
