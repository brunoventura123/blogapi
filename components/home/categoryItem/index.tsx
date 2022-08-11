import Link from 'next/link'
import styles from './style.module.css'

export const CategoryItem = () => {
    return (
        <section className={styles.container}>
            <ul className={styles.list}>
                <li className={styles.listItem}><Link href={`/cars`}><h2 className={styles.title}>Carros</h2></Link></li>
                <li className={styles.listItem}><Link href={`/formula1`}><h2 className={styles.title}>Formula 1</h2></Link></li>
                <li className={styles.listItem}><Link href={`/food`}><h2 className={styles.title}>Comida</h2></Link></li>
                <li className={styles.listItem}><Link href={`/beauty`}><h2 className={styles.title}>Beleza</h2></Link></li>
            </ul>
        </section>
    )
}