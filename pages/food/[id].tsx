import Image from "next/image"
import styles from '../cars/post.module.css'
import f1 from '../../public/images/f1.jpg'
import beauty from '../../public/images/beauty.webp'
import avatar from '../../public/images/avatar.jpg'
import Link from "next/link"
import axios from "axios"
import apiPosts from "../../libs/apiPosts"
import Head from "next/head"

import { Theme } from "../../components/theme"
import { NewsLetter } from "../../components/newsletter"
import { CommentItem } from "../../components/commentItem"
import { useEffect, useState } from "react"
import { Comment } from "../../types/comment"
import { useRouter } from "next/router"
import { Post } from "../../types/posts"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { signIn, useSession } from "next-auth/react"
import { AuthUser } from "../../types/AuthUser"


type Props = {
    comments: Comment[]
    food: Post[]
    loggedUser: AuthUser
}

const PostItem = ({ food, loggedUser }: Props) => {
    const { data: session, status: sessionStatus } = useSession()
    const router = useRouter()
    const [menssage, setMenssage] = useState('')
    const [showMore, setShowMore] = useState(true)
    const [loading, setLoading] = useState(false)
    const [pageCount, setPageCount] = useState(1)
    const [commentList, setCommentList] = useState<Comment[]>([])
    const [postUni, setPostUni] = useState<Post>()
    const [countCom, setCountCom] = useState(1)

    const postUnique = async () => {
        const { id } = router.query
        const res = await axios.get(`/api/posts/${id}`)
        if (res.data.status) {
            return setPostUni(JSON.parse(JSON.stringify(res.data.post)))
        } else { alert('Post não encontrados.') }

    }
    const getComments = async () => {
        const { id, page } = router.query
        const res = await axios.get(`/api/comments?page=${page}&postId=${id}}`)
        if (res.data.status) {
            return setCommentList(JSON.parse(JSON.stringify(res.data.comments)))
        }
        setCountCom(countCom + 1)
    }
    const handleNewComment = async () => {
        if (menssage) {
            const newComment = await axios.post(`/api/comments`,
                { body: menssage, postId: postUni?.id, userId: session?.user.id })
            return setCommentList([...commentList, ...newComment.data.newComment])
        }
        return alert('Preencha o campo com seu comentário.')
    }
    const handleMoreComments = async () => {
        const { id } = router.query
        if (!loading) {
            setLoading(true)
            const json = await axios.get(`/api/comments?page=${pageCount + 1}&postId=${id}`)

            if (json.data.status) {
                if (json.data.comments.length === 0) {
                    setShowMore(false)
                }
                setCommentList([...commentList, ...json.data.comments])
            }
            setLoading(false)
            setPageCount(pageCount + 1)
        }
    }

    useEffect(() => {
        postUnique()
        //getPhotos()
        getComments()
    }, [])
    const catNew: string = `${postUni?.category.substring(0, 1).toUpperCase()}${postUni?.category.substring(1)}` as string
    let newDate = postUni?.createdAt.toString().substring(0, 10).split('-').reverse().join('/')
    return (
        <Theme>
            <Head>
                <title>{`Sala de Notícias - ${postUni?.title}`}</title>
            </Head>
            <div className={styles.linkLine}>
                <Link href={`/`}><span>Início /</span></Link>
                <Link href="/food"><span> {(catNew === 'Food' ? 'Comida' : '')} /</span></Link>
                <span className={styles.blackTitle}> {postUni?.title}</span>

            </div>
            <section className={styles.container}>
                <div className={styles.leftSide}>
                    <div className={styles.notice}>
                        <Image width={960} height={500} src={f1} alt="" />
                        <section className={styles.areaPost}>
                            <div className={styles.infos}>
                                <span
                                    style={{ fontSize: '16px' }}>
                                    <Link href={`/food`}>{(catNew === 'Food' ? 'Comida' : '')}</Link>
                                </span>
                                <div style={{ marginLeft: '10px', fontSize: '16px' }}>
                                    {newDate}
                                </div>
                            </div>
                            <h1>{`${postUni?.title}`}</h1>
                            <div className={styles.principal}>
                                <div><Image className={styles.img} width={300} height={180} src={f1} alt="" /></div>
                                {postUni?.body}
                            </div>


                        </section>

                    </div>
                    <div>
                        <div className={styles.comments}>
                            <h2>{commentList.length} {commentList.length < 2 ? 'Comentário' : 'Comentários'}</h2>

                            {commentList.map((i, k) => (
                                <CommentItem
                                    key={k}
                                    body={i.body}
                                    id={i.id}
                                    dateCom={JSON.parse(JSON.stringify(i.createdAt?.toString()))}
                                    name={i.User.name}
                                    avatar={i.User.avatar}
                                    userId={i.userId}
                                />
                            ))}

                            {showMore && commentList.length > 0 &&
                                <button className={styles.moreComments} onClick={handleMoreComments}>Carregar mais</button>
                            }
                        </div>
                        {sessionStatus == 'authenticated' &&
                            <div className={styles.formComment}>
                                <h2>Deixe um comentário </h2>
                                <form className={styles.form} action="">
                                    <textarea
                                        placeholder="Mensagem"
                                        value={menssage}
                                        onChange={e => setMenssage(e.target.value)}
                                        maxLength={300}
                                    />
                                    <button onClick={handleNewComment}>Postar comentário</button>
                                </form>
                            </div>
                        }
                        {sessionStatus == 'unauthenticated' && <h2 className={styles.login}>Faça <button onClick={() => signIn()} className={styles.loginButton}>login</button> para postar comentários!</h2>}
                    </div>
                </div>
                <div className={styles.infoArea}>
                    <NewsLetter />
                    <div className={styles.infoAreaImage}>
                        <Image src={beauty} alt="" />
                    </div>
                    <div className={styles.morePosts}>
                        <h2>Mais Posts</h2>
                        {food.map((i, k) => (
                            <div key={k} className={styles.areaPostMore}><div><Image src={avatar} width={80} height={80} alt="Avatar" /></div><a className={styles.titlePost} href={`/food/${i.id.toString()}`}>{i.title}</a></div>
                        ))}
                    </div>
                </div>
            </section>
        </Theme>
    )
}
export default PostItem

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    // DRY = Dont Repeat Yourself
    /*const session = await unstable_getServerSession(
        context.req, context.res, authOptions
    )
    if (!session) return { redirect: { destination: '/', permanent: true } }*/

    const food = await apiPosts.getPostForCat(1, 9, 'food')
    return {
        props: {
            //loggedUser: session.user,
            food: JSON.parse(JSON.stringify(food))
        }
    }
}


