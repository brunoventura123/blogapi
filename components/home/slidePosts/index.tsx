
import styles from './style.module.css'
import Image from 'next/image';
import avatar from '../../../public/images/woman.jpg'
import Link from 'next/link';
import { Post } from '../../../types/posts';
import { useRouter } from 'next/router';

import w from '../../../public/images/w.jpg'
import woman from '../../../public/images/woman.jpg'
import man from '../../../public/images/man.jpg'
import car from '../../../public/images/carred.jpg'


type Props = {
    posts: Post[]
}

const SliderPosts = ({ posts }: Props) => {
    const photos = [w, woman, man, car]
    const router = useRouter()
    return (
        <div className={styles.container}>
            <ul className={styles.posts}>
                {posts.map((post, key) => (
                    <li
                        key={key}
                        className={styles.postItem}>
                        <Image src={`${post.photos[0].url}${post.photos[0].token}`} width={80} height={80} alt="Avatar" />
                        <Link href={`/${post.category}/${post.id}`}>
                            <p className={styles.title}>
                                {router.locale === 'pt' ? (post.title.length > 50) ? post.title.substring(0, 50) + '...' : post.title : (post.title.length > 50) ? post.titleen.substring(0, 50) + '...' : post.titleen}
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SliderPosts