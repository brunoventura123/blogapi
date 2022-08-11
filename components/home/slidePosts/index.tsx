
import styles from './style.module.css'
import Image from 'next/image';
import avatar from '../../../public/images/woman.jpg'
import Link from 'next/link';
import { Post } from '../../../types/posts';
import { useRouter } from 'next/router';



type Props = {
    posts: Post[]
}

const SliderPosts = ({ posts }: Props) => {

    const router = useRouter()
    return (
        <div className={styles.container}>
            <ul className={styles.posts}>
                {posts.map((post, key) => (
                    <li
                        key={key}
                        className={styles.postItem}>
                        <Image src={avatar} width={80} height={80} alt="Avatar" />
                        <Link href={`/${post.category}/${post.id}`}>
                            <p className={styles.title}>
                                {(post.title.length > 60) ? post.title.substring(0, 60) + '...' : post.title}
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SliderPosts