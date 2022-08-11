import { useState } from 'react'
import styles from './style.module.css'

export const NewsLetter = () => {
    const [email, setEmail] = useState('')
    return (
        <div className={styles.container}>
            <h2>Notícias</h2>
            <div className={styles.box}>
                <p className={styles.text}>Envie seu melhor e-mail para receber em primeira mão todas na notificações de novas postagens.</p>
                <form action="https://formsubmit.co/brunoventura70@gmail.com" method="POST" className={styles.input}>
                    <input
                        className={styles.input1}
                        type="email"
                        placeholder='SEU E-MAIL'
                        name='email'
                        required
                    />
                    <input type="hidden" name="name" value={`Bruno`} />
                    <input type="hidden" name="_next" value="http://localhost:3000/tanks" />
                    <input type="hidden" name="_captcha" value="false" />
                    <input className={styles.input2} type="submit" value="ENVIAR" />
                </form>
                <p>Você só receberá no máximo um e-mail por dia</p>
            </div>
        </div>
    )
}