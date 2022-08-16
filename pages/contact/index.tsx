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
import { useTranslation } from "next-i18next"
import { GetServerSideProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

const Contact = () => {
    const { t } = useTranslation()
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
        <Theme
            cat={[t('cars'), t('formula1'), t('beauty'), t('food'), t('contact'), t('hello'), t('logout'), t('search')]}
            t={[t('room'), t('news')]}
            footer={[t('room'), t('news'), t('category'), t('cars'), t('formula1'), t('beauty'), t('food'), t('contact'), t('page'), t('moreLinks'), t('announce'), t('privacyPolicy'), t('terms')]}

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
                        <form className={styles.form} action="" onSubmit={handleContactForm}>
                            <p>
                                <input
                                    className="input"
                                    type="text"
                                    placeholder={t('name')}
                                    value={name}
                                    onChange={e => setName(e.target.value)}

                                />
                                <input
                                    className="input"
                                    type="email"
                                    placeholder={t('yourEmail')}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}

                                />
                            </p>
                            <input
                                className="input"
                                type="text"
                                placeholder={t('subject')}
                                value={subject}
                                onChange={e => setSubject(e.target.value)}

                            />
                            <textarea
                                className="input"
                                placeholder={t('message')}
                                value={menssage}
                                onChange={e => setMenssage(e.target.value)}

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
    const t = await serverSideTranslations(locale as string, ['common'])
    return {
        props: {
            ...t
        }
    }
}
export default Contact