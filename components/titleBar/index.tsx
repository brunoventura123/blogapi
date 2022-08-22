import Link from 'next/link'
import styles from './styles.module.css'

type Props = {
    title: string
    slug?: string
    all?: string
}

const TitleBar = ({ title, slug, all }: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h2>{title}</h2>
                {slug &&
                    <Link href={`/${slug}`}><a>{all}</a></Link>
                }
            </div>
        </div>
    )
}
export default TitleBar