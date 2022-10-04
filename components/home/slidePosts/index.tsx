import styles from './style.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '../../../types/posts';
import { useRouter } from 'next/router';

type Props = {
    posts: Post[]
}

const SliderPosts = ({ posts }: Props) => {
    const router = useRouter()
    return (
        <section className={styles.container}>
            <ul className={styles.posts}>
                {posts.map((post, key) => (
                    <li
                        key={key}
                        className={styles.postItem}>
                        <Image src={`${post.photos[0].url}${post.photos[0].token}`} width={90} height={80} alt="Avatar" />
                        <Link href={`/${post.category}/${post.id}`}>
                            <p className={styles.title}>
                                {router.locale === 'pt' ? (post.title.length > 50) ? post.title.substring(0, 50) + '...' : post.title
                                    : (post.titleen.length > 50) ? post.titleen.substring(0, 50) + '...' : post.titleen}
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default SliderPosts