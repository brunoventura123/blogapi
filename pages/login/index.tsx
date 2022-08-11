import Head from "next/head"
import styles from './styles.module.css'
import bg from '../../public/images/f2.jpg'
import Link from "next/link"
import React, { FormEvent, ReactEventHandler, useState } from "react"
import { Router, useRouter } from "next/router"
import axios from "axios"
import { signIn, useSession } from "next-auth/react"

const Login = () => {
    const { data: session, status: sessionStatus } = useSession()
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberPassword, setRememberPassword] = useState(false)
    const [error, setError] = useState('')
    const [disebled, setDisebled] = useState(false)
    const [loading, setLoading] = useState(false)


    // Function for user enter in the comments
    const handleSignIn = async (e: FormEvent<HTMLElement>) => {
        e.preventDefault()
        if (!email || !password) {
            setError('Preencha os campos.')
            return
        }
        setError('')
        setLoading(true)
        const request = await signIn('credentials', {
            redirect: false,
            email, password
        })
        setLoading(false)
        console.log(request)
        if (request && request.ok) {
            if (router.query.callbackUrl) {
                router.back()
            } else {
                router.push('/')
            }
        } else {
            setError('Acesso negado')
        }

    }
    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>

            <div style={{ backgroundImage: `url(${bg})` }} className={styles.container}>
                <h1 style={{ margin: '50px 0 30px 0' }}>Faça seu login</h1>
                {error &&
                    <p className={styles.error}>{error}</p>
                }
                {loading && <p className={styles.error}>Carregando...</p>}
                <form className={styles.form}>
                    <label htmlFor="" className={styles.inputArea}>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="E-mail"
                            disabled={loading}
                            className={styles.input}
                            required
                        />
                    </label>
                    <label htmlFor="" className={styles.inputArea}>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Senha"
                            disabled={loading}
                            className={styles.input}
                            required
                        />
                    </label>

                    <label htmlFor="remember" style={{ color: '#FFF', cursor: 'pointer' }}>
                        <input
                            id="remember"
                            checked={rememberPassword}
                            onChange={() => setRememberPassword(!rememberPassword)}
                            type="checkbox"
                            disabled={loading}
                            className={styles.check}
                        />
                        Lembrar minha senha
                    </label>
                    <button
                        className={styles.loginButton}
                        disabled={disebled}
                        onClick={handleSignIn}
                    >Entrar</button>

                </form>
                <p className={styles.redirect}>Se não tem uma conta, faça seu cadastro<Link href={`${session ? '/login' : '/register'}`}> clicando aqui!</Link></p>
            </div>
        </div>
    )
}

export default Login