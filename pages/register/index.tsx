import Head from "next/head"
import styles from '../login/styles.module.css'
import bg from '../../public/images/f2.jpg'
import Link from "next/link"
import React, { FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useSession } from "next-auth/react"
import { GetServerSideProps } from "next"
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]"
import { FileHandle } from "fs/promises"

const Register = () => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState('')
    const [file, setFile] = useState()
    const [showPassword, setShowPassword] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)



    const handleSaveForm = async (e: FormEvent<HTMLFormElement>) => {
        const avatar = `https://logodownload.org/wp-content/uploads/2014/09/google-logo-0-1536x1536.png`
        e.preventDefault()
        setDisabled(true)

        if (name && email && password && confirmPassword && avatar) {

            if (password !== confirmPassword) {
                setError('As senhas precisam ser iguais!')
                return
            }
            const json = await axios.post(`/api/users`, {
                name, email, password, avatar
            })
            if (json.data.status) {
                router.push('/login')
            } else {
                setError(json.data.error)
            }
        } else {
            setError('Preencha todos os campos.')
        }

        setDisabled(false)
    }

    return (
        <div>
            <Head>
                <title>Cadastro</title>
            </Head>

            <div style={{ backgroundImage: `url(${bg})` }} className={styles.container}>
                <h1>Faça seu Cadastro</h1>
                {error &&
                    <p className={styles.error}>{error}</p>
                }
                <form className={styles.form} action="" onSubmit={handleSaveForm}>
                    <label htmlFor="" className={styles.inputArea}>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Nome"
                            disabled={disabled}
                            className={styles.input}
                        />
                    </label>
                    <label htmlFor="" className={styles.inputArea}>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="E-mail"
                            disabled={disabled}
                            className={styles.input}
                        />
                    </label>

                    <label htmlFor="file" className={styles.inputArea} style={{ cursor: 'pointer', alignItems: 'center', padding: '13px 15px' }} >
                        <p style={{ flex: 1 }}>Sua foto <span style={{ fontSize: '12px' }}> (Apenas aquivos png, jpg e jpeg)</span></p>
                        <input
                            id="file"
                            type="file"
                            name="file"
                            value={file}
                            disabled={disabled}
                            style={{ width: '200px', cursor: 'pointer', }}
                        />
                    </label>
                    <label htmlFor="" className={styles.inputArea}>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Senha"
                            disabled={disabled}
                            className={styles.input}
                        />
                        <div
                            onClick={() => setShowPassword(!showPassword)}
                            className={styles.showPassword}>
                            {showPassword && <VisibilityIcon color="error" fontSize="small" />}
                            {!showPassword && <VisibilityOffIcon color="error" fontSize="small" />}
                        </div>
                    </label>
                    <label htmlFor="" className={styles.inputArea}>
                        <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type={showPassword2 ? 'text' : 'password'}
                            placeholder="Confirmar Senha"
                            disabled={disabled}
                            className={styles.input}
                        />
                        <div
                            onClick={() => setShowPassword2(!showPassword2)}
                            className={styles.showPassword}>
                            {showPassword2 && <VisibilityIcon color="error" fontSize="small" />}
                            {!showPassword2 && <VisibilityOffIcon color="error" fontSize="small" />}
                        </div>
                    </label>
                    <input
                        disabled={disabled}
                        className={styles.button}
                        type="submit"
                        value="Cadastrar"
                    />

                </form>
                <p className={styles.redirect}>Se já tem uma conta, faça seu login<Link href={`/login`}> clicando aqui!</Link></p>

            </div>
        </div>
    )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    // DRY = Dont Repeat Yourself
    const session = await unstable_getServerSession(
        context.req, context.res, authOptions
    )
    if (session) return { redirect: { destination: '/', permanent: true } }

    return {
        props: {

        }
    }
}
export default Register