import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './styles.module.css'

type Props = {
    title: string
    slug?: string
}

const TitleBar = ({ title, slug }: Props) => {
    const router = useRouter()
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h2>{title}</h2>
                {slug &&
                    <Link href={`/${slug}`}>Ver Todos</Link>
                }
            </div>
        </div>
    )
}
export default TitleBar