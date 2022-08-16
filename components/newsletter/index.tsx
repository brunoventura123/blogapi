import { useState } from 'react'
import styles from './style.module.css'

type Props = {
    news: string
}

export const NewsLetter = ({ news }: Props) => {
    const [email, setEmail] = useState('')
    return (
        <div className={styles.container}>
            <h2>{news}</h2>
            <div className={styles.box}>
                <p className={styles.text}>{(news === 'News' ? 'Send your best email to receive first hand all notifications of new posts.' : 'Envie seu melhor e-mail para receber em primeira mão todas na notificações de novas postagens.')}</p>
                <form action="https://formsubmit.co/brunoventura70@gmail.com" method="POST" className={styles.input}>
                    <input
                        className={styles.input1}
                        type="email"
                        placeholder={(news === 'News' ? 'YOUR EMAIL' : 'SEU E-MAIL')}
                        name='email'
                        required
                    />
                    <input type="hidden" name="name" value={`Bruno`} />
                    <input type="hidden" name="_next" value="http://localhost:3000/tanks" />
                    <input type="hidden" name="_captcha" value="false" />
                    <input className={styles.input2} type="submit" value={(news === 'News' ? 'SUBMIT' : 'ENVIAR')} />
                </form>
                <p>{(news === 'News' ? 'You will only receive a maximum of one email per day' : 'Você só receberá no máximo um e-mail por dia')}</p>
            </div>
        </div>
    )
}