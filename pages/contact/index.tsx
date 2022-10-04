import { Theme } from "../../components/theme"
import styles from './contact.module.css'
import Image from "next/image"
import phoneIcon from '../../public/images/phone.svg'
import emailIcon from '../../public/images/email.svg'
import localIcon from '../../public/images/local.svg'
import Head from "next/head"
import { FormEvent, useState } from "react"
import axios from "axios"
import { useTranslation } from "next-i18next"
import { GetServerSideProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { Post } from "../../types/posts"
import apiPosts from "../../libs/apiPosts"

type Props = {
    posts: Post[]
}

const Contact = ({ posts }: Props) => {
    const { t } = useTranslation()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [menssage, setMenssage] = useState('')
    const [error, setError] = useState('')
    const [sure, setSure] = useState('')

    const handleContactForm = async (e: FormEvent<HTMLElement>) => {
        e.preventDefault()
        setError('')
        setSure('')
        if (name && email && subject && menssage) {
            const res = await axios.post(`/api/contact`, {
                name, email, subject, menssage
            })
            if (res.data.status) {
                setSure('Formulário enviado com sucesso!')
                setName('')
                setEmail('')
                setSubject('')
                setMenssage('')

                setTimeout(() => {
                    window.location.href = '/'
                }, 1000)
            }

        } else {
            setError('Preencha todos os campos.')
            return
        }


    }
    return (
        <Theme
            posts={posts}
            t={[t('news'), t('room')]}
            cat={[t('cars'), t('formula1'), t('beauty'), t('food'), t('contact'), t('hello'), t('logout'), t('login'), t('search')]}
        >
            <div className={styles.container}>
                <Head>
                    <title>{t('title')} | {t('contact')}</title>
                </Head>
                <div className={styles.linkLine}>
                    <span>{t('home')} </span>/ {t('contact')}
                </div>
                <h2 className={styles.title}>{t('contactNow')}</h2>
                <div className={styles.contactArea}>
                    <div className={styles.address}>
                        <h3>{t('contactNow')}</h3>
                        <p>Vero blanditiis expedita aspernatur consectetur distinctio esse dignissimos, cumque neque delectus error nostrum mollitia hic voluptatum asperiores assumenda.</p>
                        <div className={styles.iconText}>
                            <div className={styles.areaImage}><Image className={styles.icon} src={phoneIcon} alt="" /></div>
                            <span>
                                <h3>{t('ourOffice')}</h3>
                                <p>Rua Nova nº23, Maria Lúcia, Manaus</p>
                            </span>
                        </div>
                        <div className={styles.iconText}>
                            <div className={styles.areaImage}><Image className={styles.icon} src={emailIcon} alt="" /></div>
                            <span>
                                <h3>{t('ourEmail')}</h3>
                                <p>suporte@nossaloja.com.br</p>
                            </span>
                        </div>
                        <div className={styles.iconText}>
                            <div className={styles.areaImage}><Image className={styles.icon} src={localIcon} alt="" /></div>
                            <span>
                                <h3>{t('callUs')}</h3>
                                <p>55 (33) 99999-8888</p>
                            </span>
                        </div>
                    </div>
                    <div className={styles.contactForm}>
                        {error &&
                            <p className={styles.error}>{error}</p>
                        }
                        {sure &&
                            <p className={styles.sure}>{sure}</p>
                        }
                        <form className={styles.form} action="" onSubmit={handleContactForm}>
                            <p className={styles.areaName}>
                                <input
                                    className="input"
                                    type="text"
                                    placeholder={t('name')}
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    id="name"
                                />
                                <input
                                    className="input"
                                    type="email"
                                    placeholder={t('yourEmail')}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    id="email"
                                />
                            </p>
                            <input
                                className="input"
                                type="text"
                                placeholder={t('subject')}
                                value={subject}
                                onChange={e => setSubject(e.target.value)}
                                id="subject"
                            />
                            <textarea
                                className="input"
                                placeholder={t('message')}
                                value={menssage}
                                onChange={e => setMenssage(e.target.value)}
                                id="message"
                            ></textarea>
                            <button>{t('sendM')}</button>
                        </form>
                    </div>
                </div>
            </div>
        </Theme>
    )
}
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    // DRY = Dont Repeat Yourself
    const posts = await apiPosts.getPostForCat(0, 20, undefined)
    const t = await serverSideTranslations(locale as string, ['common'])
    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts)),
            ...t
        }
    }
}
export default Contact