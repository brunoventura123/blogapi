import styles from './styles.module.css'
import car from '../../public/images/car.jpeg'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {
    id: number
    image?: string
    category: string
    title: string
    date: string
}

const CardItem = ({ id, image, category, title, date }: Props) => {
    const router = useRouter()
    let newDate = date.substring(0, 10).split('-').reverse().join('/') as string
    const catNew: string = `${category.substring(0, 1).toUpperCase()}${category.substring(1)}` as string
    const catTitle = `${(catNew === 'Cars' ? 'Carros' : (catNew === 'Beauty') ? 'Beleza' : (catNew === 'Formula1') ? 'Formula 1' : (catNew === 'Food' ? 'Comida' : ''))}`
    return (
        <div className={styles.container}>
            <Link href={`/${category}/${id}`}>
                <div className={styles.card} >
                    <div className={styles.image}>
                        <Image src={car} alt="" />
                    </div>

                    <div className={styles.areaInfos}>
                        <div className={styles.category}>
                            <p><span className={styles.linkCat}><Link href={`/${category?.toString()}`}>{catTitle}</Link></span> - {newDate}</p>
                        </div>

                        <div className={styles.title}>
                            <h2>{title.length > 90 ? title.substring(0, 70) + '...' : title}</h2>
                        </div>

                    </div>

                </div>
            </Link>
        </div>
    )
}
export default CardItem