import { useRouter } from 'next/router'

import styles from './styles.module.css'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
    id: number
    url: string
    token: string
    category: string
    title: string
    date: string
}

const CardItem = ({ id, url, category, title, date, token }: Props) => {
    const router = useRouter()
    let newDate = date.substring(0, 10).split('-').reverse().join('/') as string
    const catNew = `${category.substring(0, 1).toUpperCase()}${category.substring(1)}` as string
    const catTitle = `${router.locale === 'pt' ? ((catNew === 'Cars' ? 'Carros' : (catNew === 'Beauty') ? 'Beleza' : (catNew === 'Formula1') ? 'Fórmula 1' : (catNew === 'Food' ? 'Comida' : ''))) : ((catNew === 'Cars' ? 'Cars' : (catNew === 'Beauty') ? 'Beauty' : (catNew === 'Formula1') ? 'Formula 1' : (catNew === 'Food' ? 'Food' : '')))}`

    return (
        <article className={styles.container}>
            <Link href={`/${category}/${id}`}>
                <div className={styles.card} >
                    <div className={styles.image}>
                        <Image height={150} width={300} src={`${url}${token}`} alt={title} layout="fill" />
                    </div>

                    <div className={styles.areaInfos}>
                        <div className={styles.category}>
                            <p><span className={styles.linkCat}><Link href={`/${category?.toString()}`}>{catTitle}</Link></span> | {router.locale === 'pt' ? newDate : date.substring(0, 10)}</p>
                        </div>

                        <div className={styles.title}>
                            <h2>{title.length > 70 ? title.substring(0, 70) + '...' : title}</h2>
                        </div>

                    </div>

                </div>
            </Link>
        </article>
    )
}
export default CardItem