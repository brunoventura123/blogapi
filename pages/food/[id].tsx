import Image from "next/image"
import styles from '../cars/post.module.css'
import foodIcon from '../../public/images/food.jpg'
import beauty from '../../public/images/beauty.webp'
import avatar from '../../public/images/avatar.jpg'
import Link from "next/link"
import axios from "axios"
import apiPosts from "../../libs/apiPosts"
import Head from "next/head"

import { Theme } from "../../components/theme"
import { NewsLetter } from "../../components/newsletter"
import { CommentItem } from "../../components/commentItem"
import { FormEvent, useEffect, useState } from "react"
import { Comment } from "../../types/comment"
import { useRouter } from "next/router"
import { Post } from "../../types/posts"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { signIn, useSession } from "next-auth/react"
import { AuthUser } from "../../types/AuthUser"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"


type Props = {
    comments: Comment[]
    food: Post[]
    loggedUser: AuthUser
    posts: Post[]
}

const PostItem = ({ food, loggedUser, posts }: Props) => {
    const { t } = useTranslation()
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
        const { id } = router.query
        const res = await axios.get(`/api/comments?page=${countCom}&postId=${id}}`)
        if (res.data.status) {
            setShowMore(true)
            return setCommentList(res.data.comments)
        }
        setCountCom(countCom + 1)
    }
    const handleNewComment = async (e: FormEvent<HTMLElement>) => {
        e.preventDefault()
        if (menssage) {
            const newComment = await axios.post(`/api/comments`,
                { body: menssage, postId: postUni?.id, userId: session?.user.id })
            setMenssage('')
            getComments()
            setShowMore(true)
            return

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
        <Theme
            posts={posts}
            t={[t('news'), t('room')]}
            cat={[t('cars'), t('formula1'), t('beauty'), t('food'), t('contact'), t('hello'), t('logout'), t('login'), t('search')]}
            footer={[t('room'), t('news'), t('category'), t('cars'), t('formula1'), t('beauty'), t('food'), t('contact'), t('page'), t('moreLinks'), t('announce'), t('privacyPolicy'), t('terms')]}

        >
            <Head>
                <title>{`${t('title')} | ${router.locale === 'pt' ? postUni?.title : postUni?.titleen}`}</title>
            </Head>
            <div className={styles.linkLine}>
                <Link href={`/`}><span>{t('home')} /</span></Link>
                <Link href="/food"><span> {t('food')} /</span></Link>
                <span className={styles.blackTitle}> {router.locale === 'pt' ? postUni?.title : postUni?.titleen}</span>

            </div>
            <section className={styles.container}>
                <div className={styles.leftSide}>
                    <div className={styles.notice}>
                        <Image width={960} height={500} src={foodIcon} alt="" />
                        <section className={styles.areaPost}>
                            <div className={styles.infos}>
                                <span>
                                    <Link href={`/food`}>{t('food')}</Link>
                                </span> <div style={{ marginLeft: '10px' }}>
                                    {router.locale === 'en' ? postUni?.createdAt.toString().substring(0, 10) : newDate}
                                </div>
                            </div>
                            <h1 className={styles.h1}>{`${router.locale === 'pt' ? postUni?.title : postUni?.titleen}`}</h1>
                            <div className={styles.principal}>
                                <div className={styles.areaImage}><Image className={styles.img} width={300} height={180} src={foodIcon} alt="" /></div>
                                {router.locale === 'pt' ? postUni?.body : postUni?.bodyen}
                            </div>


                        </section>

                    </div>
                    <div>
                        <div className={styles.comments}>
                            <h2>{commentList.length} {commentList.length < 2 ? `${t('comment')}` : `${t('comment')}s`}</h2>

                            {commentList.map((i, k) => (
                                <CommentItem
                                    key={k}
                                    body={i.body}
                                    id={i.id}
                                    dateCom={JSON.parse(JSON.stringify(i.createdAt?.toString()))}
                                    name={i.User.name}
                                    avatar={i.User.avatar}
                                    userId={i.userId}
                                    del={t('delete')}
                                    load={getComments}
                                />
                            ))}

                            {showMore && commentList.length > 0 &&
                                <button className={styles.moreComments} onClick={handleMoreComments}>{t('loadMore')}</button>
                            }
                        </div>
                        {sessionStatus == 'authenticated' &&
                            <div className={styles.formComment}>
                                <h2>{t('leaveComment')}</h2>
                                <form className={styles.form} onSubmit={handleNewComment}>
                                    <textarea
                                        placeholder={t('message')}
                                        value={menssage}
                                        onChange={e => setMenssage(e.target.value)}
                                        maxLength={300}
                                    />
                                    <button >{t('postComment')}</button>
                                </form>
                            </div>
                        }
                        {sessionStatus == 'unauthenticated' && <h2 className={styles.login}>{t('make')}<button onClick={() => signIn()} className={styles.loginButton}>Login</button> {t('post')}</h2>}
                    </div>
                </div>
                <div className={styles.infoArea}>
                    <div className={styles.areaNews}>
                        <div><NewsLetter news={t('newsMail')} /></div>
                        <div className={styles.infoAreaImage}>
                            <Image src={beauty} alt="" />
                        </div>
                    </div>
                    <div className={styles.morePosts}>
                        <h2>{t('morePosts')}</h2>
                        {food.map((i, k) => (
                            <div
                                key={k}
                                className={styles.areaPostMore}>
                                <div>
                                    <Image src={avatar} width={80} height={80} alt="Avatar" />
                                </div>
                                <a className={styles.titlePost} href={`/cars/${i.id.toString()}`}>{router.locale === 'pt' ? i.title : i.titleen}</a>
                            </div>

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
    const posts = await apiPosts.getPostForCat(0, 20, undefined)
    return {
        props: {
            //loggedUser: session.user,
            food: JSON.parse(JSON.stringify(food)),
            posts: JSON.parse(JSON.stringify(posts)),
            ... (await serverSideTranslations(context.locale as string, ['common', 'logo']))
        }
    }
}


