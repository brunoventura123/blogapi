import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import styles from './style.module.css'

type Props = {
    news: string
}

export const NewsLetter = ({ news }: Props) => {
    const { t } = useTranslation()
    const [email, setEmail] = useState('')
    const [show, setShow] = useState(false)
    const handleSubmit = () => {
        setShow(true)
        setTimeout(() => {
            setEmail('')
        }, 500)
    }
    return (
        <div className={styles.container}>
            <h2>{news}</h2>
            <div className={styles.box}>
                <p className={styles.text}>{(news === 'News' ? 'Send your best email to receive first hand all notifications of new posts.' : 'Envie seu melhor e-mail para receber em primeira mão todas na notificações de novas postagens.')}</p>
                <form action="https://formsubmit.co/brunoventura70@gmail.com" method="POST" className={styles.input}>
                    <input
                        className={styles.input1}
                        type="email"
                        placeholder={t('yourEmail')}
                        name='email'
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input type="hidden" name="name" value={`Cadastro de e-mail.`} />
                    <input type="hidden" name="_next" value="http://localhost:3000/tanks" />
                    <input type="hidden" name="_captcha" value="false" />
                    <button className={styles.input2} onClick={handleSubmit}>{t('send')}</button>
                </form>
                {show && <div style={{ color: 'green', padding: '10px 0', textAlign: 'center' }}>E-mail cadastrado com sucesso!</div>}
                <p>{(news === 'News' ? 'You will only receive a maximum of one email per day' : 'Você só receberá no máximo um e-mail por dia')}</p>
            </div>
        </div>
    )
}