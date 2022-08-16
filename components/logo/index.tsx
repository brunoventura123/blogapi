import Link from 'next/link'
import styles from './styles.module.css'
import bkpnet from '../../public/images/bkpnet1.svg'
import Image from 'next/image'

type Props = {
    t: string[]
}

export const Logo = ({ t }: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.infos}>
                <Link href={`/`}><p>{t[1]}<span>{t[0]}</span></p></Link>
            </div>
            <div className={styles.ad}>
                <Image src={bkpnet} alt="" width={300} height={68} />
            </div>
        </div>
    )
}
