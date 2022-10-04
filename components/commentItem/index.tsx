
import styles from './styles.module.css'
//import avatar from '../../public/images/woman.jpg'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

type Props = {
    body: string
    id: number
    dateCom: string
    name: string
    avatar: string
    userId: number
    del: string
    load: () => void
}

export const CommentItem = ({ body, id, dateCom, name, avatar, userId, del, load }: Props) => {
    const newDate = dateCom.toString().substring(0, 10).split('-').reverse().join('/') as string
    const router = useRouter()
    const { data: session, status: sessionStatus } = useSession()

    const handleDelete = async () => {
        await axios.delete(`/api/comments/${id}`)
        load()
    }

    return (
        <div className={styles.container}>
            <div className={styles.areaNameAndPhoto}>
                <div className={styles.areaPhoto}>
                    <Image src={avatar} width={40} height={40} blurDataURL='blur' className={styles.photoImg} alt="" layout='responsive' />
                </div>
                <p className={styles.name}><span>{`${name.substring(0, 1).toUpperCase()}${name.substring(1).split(' ').splice(0, 1)}`} </span>|  {router.locale === 'en' ? dateCom.toString().substring(0, 10) : newDate}</p>

            </div>

            <div className={styles.areaInfo}>
                <div className={styles.areaData}>
                    <p className={styles.text}>{body}</p>
                </div>

            </div>
            {session?.user.id === userId &&
                <div className={styles.areaButton}><button className={styles.button} onClick={handleDelete}>{del}</button></div>
            }
        </div>
    )
}