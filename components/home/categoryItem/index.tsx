import Link from 'next/link'
import styles from './style.module.css'

type Props = {
    cat: string[]
}

export const CategoryItem = ({ cat }: Props) => {
    return (
        <section className={styles.container}>
            <ul className={styles.list}>
                <li className={styles.listItem}><Link href={`/cars`}><h2 className={styles.title}>{cat[0]}</h2></Link></li>
                <li className={styles.listItem}><Link href={`/formula1`}><h2 className={styles.title}>{cat[1]}</h2></Link></li>
                <li className={styles.listItem}><Link href={`/food`}><h2 className={styles.title}>{cat[3]}</h2></Link></li>
                <li className={styles.listItem}><Link href={`/beauty`}><h2 className={styles.title}>{cat[2]}</h2></Link></li>
            </ul>
        </section>
    )
}