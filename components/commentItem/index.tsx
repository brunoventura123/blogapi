
import styles from './styles.module.css'
//import avatar from '../../public/images/woman.jpg'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

type Props = {
    body: string
    id: number
    dateCom: string
    name: string
    avatar: string
    userId: number
    del: string
}

export const CommentItem = ({ body, id, dateCom, name, avatar, userId, del }: Props) => {
    const newDate = dateCom.toString().substring(0, 10).split('-').reverse().join('/') as string
    const router = useRouter()
    const { data: session, status: sessionStatus } = useSession()
    const handleDelete = async () => {
        await axios.delete(`/api/comments/${id}`)
        window.location.href = `/cars/${router.query.id}`
    }

    return (
        <div className={styles.container}>
            <div className={styles.areaPhoto}>
                <img src={avatar} width={30} height={30} alt="" />
            </div>
            <div className={styles.areaInfo}>
                <div className={styles.areaData}>
                    <p className={styles.name}><span>{`${name.substring(0, 1).toUpperCase()}${name.substring(1).split(' ').splice(0, 1)}`} </span>|  {router.locale === 'en' ? dateCom.toString().substring(0, 10) : newDate}</p>
                    <p className={styles.text}>{body}</p>
                </div>
                {session?.user.id === userId &&
                    <button onClick={handleDelete}>{del}</button>
                }
            </div>
        </div>
    )
}