import { Theme } from "../../components/theme"
import styles from './contact.module.css'
import Image from "next/image"
import phoneIcon from '../../public/images/phone.svg'
import emailIcon from '../../public/images/email.svg'
import localIcon from '../../public/images/local.svg'
import Head from "next/head"
import { FormEvent, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"

const Contact = () => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [menssage, setMenssage] = useState('')
    const [error, setError] = useState('')

    const handleContactForm = async (e: FormEvent<HTMLElement>) => {
        e.preventDefault()
        setError('')
        if (name && email && subject && menssage) {
            const res = await axios.post(`/api/contact`, {
                name, email, subject, menssage
            })
            if (res.data.status) {
                alert('Formulário enviado com sucesso!')
                router.push('/')
            }

        } else {
            setError('Preencha todos os campos.')
            return
        }


    }
    return (
        <Theme>
            <div className={styles.container}>
                <Head>
                    <title>Sala de Notícias - Contato</title>
                </Head>
                <div className={styles.linkLine}>
                    <span>Início </span>/ Contato
                </div>
                <h2 className={styles.title}>Entre em Contato</h2>
                <div className={styles.contactArea}>
                    <div className={styles.address}>
                        <h3>Entrar em contato</h3>
                        <p>Vero blanditiis expedita aspernatur consectetur distinctio esse dignissimos, cumque neque delectus error nostrum mollitia hic voluptatum asperiores assumenda.</p>
                        <div className={styles.iconText}>
                            <div className={styles.areaImage}><Image className={styles.icon} src={phoneIcon} alt="" /></div>
                            <span>
                                <h3>Nosso Escritório</h3>
                                <p>Rua Nova nº23, Maria Lúcia, Manaus</p>
                            </span>
                        </div>
                        <div className={styles.iconText}>
                            <div className={styles.areaImage}><Image className={styles.icon} src={emailIcon} alt="" /></div>
                            <span>
                                <h3>Nosso E-mail</h3>
                                <p>suporte@nossaloja.com.br</p>
                            </span>
                        </div>
                        <div className={styles.iconText}>
                            <div className={styles.areaImage}><Image className={styles.icon} src={localIcon} alt="" /></div>
                            <span>
                                <h3>Ligue para nós</h3>
                                <p>55 (33) 99999-8888</p>
                            </span>
                        </div>
                    </div>
                    <div className={styles.contactForm}>
                        {error &&
                            <p className={styles.error}>{error}</p>
                        }
                        <form className={styles.form} action="" onSubmit={handleContactForm}>
                            <p>
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Seu nome"
                                    value={name}
                                    onChange={e => setName(e.target.value)}

                                />
                                <input
                                    className="input"
                                    type="email"
                                    placeholder="Seu e-mail"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}

                                />
                            </p>
                            <input
                                className="input"
                                type="text"
                                placeholder="Assunto"
                                value={subject}
                                onChange={e => setSubject(e.target.value)}

                            />
                            <textarea
                                className="input"
                                placeholder="Menssagem"
                                value={menssage}
                                onChange={e => setMenssage(e.target.value)}

                            ></textarea>
                            <button>Enviar Menssagem</button>
                        </form>
                    </div>
                </div>
            </div>
        </Theme>
    )
}
export default Contact