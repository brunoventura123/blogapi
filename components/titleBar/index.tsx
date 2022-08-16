import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './styles.module.css'

type Props = {
    title: string
    slug?: string
    all?: string
}

const TitleBar = ({ title, slug, all }: Props) => {
    const router = useRouter()
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h2>{title}</h2>
                {slug &&
                    <Link href={`/${slug}`}>{all}</Link>
                }
            </div>
        </div>
    )
}
export default TitleBar