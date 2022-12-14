import Image from "next/image"
import styles from './post.module.css'
import beauty from '../../public/images/beauty.webp'
import Link from "next/link"
import axios from "axios"
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
import apiPosts from "../../libs/apiPosts"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import { CurseWords } from '../../utils/curseWords'

type Props = {
    cars: Post[]
    loggedUser: AuthUser
    allPosts: Post[]
}

const PostItem = ({ cars, loggedUser, allPosts }: Props) => {

    const { t } = useTranslation()
    const { data: session, status: sessionStatus } = useSession()
    const router = useRouter()
    const [menssage, setMenssage] = useState('')
    const [showMore, setShowMore] = useState(true)
    const [loading, setLoading] = useState(false)
    const [pageCount, setPageCount] = useState(1)
    const [commentList, setCommentList] = useState<Comment[]>([])
    const [post, setPost] = useState<Post>()
    const [countCom, setCountCom] = useState(1)
    const [error, setError] = useState('')


    const postUnique = async () => {
        const { id } = router.query
        const res = await axios.get(`/api/posts/${id}`)

        if (res.data.status) {
            return setPost(JSON.parse(JSON.stringify(res.data.post)))
        } else {
            alert('Post não encontrado.')
        }

    }
    const getComments = async () => {
        const { id, page } = router.query
        const res = await axios.get(`/api/comments?page=${page}&postId=${id}}`)
        if (res.data.status) {
            return setCommentList(res.data.comments)
        }
        setCountCom(countCom + 1)
    }

    const handleNewComment = async (e: FormEvent<HTMLElement>) => {
        e.preventDefault()
        setError('')
        if (menssage) {
            if (CurseWords(menssage)) {
                const newComment = await axios.post(`/api/comments`,
                    { body: menssage, postId: post?.id, userId: session?.user.id })
                setMenssage('')
                getComments()
                setShowMore(true)
            } else {
                setError('Não são aceitos esse tipo de linguagem')
                setMenssage('')
            }

        } else {
            setError('Preencha o campo com seu comentário.')
        }

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
        getComments()
    }, [])
    const newDate = post?.createdAt.toString().substring(0, 10).split('-').reverse().join('/') as string
    return (
        <Theme
            posts={allPosts}
            t={[t('news'), t('room')]}
            cat={[t('cars'), t('formula1'), t('beauty'), t('food'), t('contact'), t('hello'), t('logout'), t('login'), t('search')]}

        >
            <Head>
                <title>{`${t('title')} - ${router.locale === 'pt' ? post?.title : post?.titleen}`}</title>
            </Head>
            <div className={styles.linkLine}>
                <Link href={`/`}><span>{t('home')} /</span></Link>
                <Link href="/cars"><span> {t('cars')} /</span></Link>
                <span className={styles.blackTitle}> {router.locale === 'pt' ? post?.title : post?.titleen}</span>
            </div>
            <div className={styles.container}>
                <section className={styles.leftSide}>
                    <div className={styles.notice}>
                        <img className={styles.noticeImg} src={`${post?.photos[0].url}${post?.photos[0].token}`} alt="" />
                        <div className={styles.areaPost}>
                            <div className={styles.infos}>
                                <span>
                                    <Link href={`/cars`}>{t('cars')}</Link>
                                </span>
                                <div style={{ marginLeft: '10px' }}>
                                    {router.locale === 'en' ? post?.createdAt.toString().substring(0, 10) : newDate}
                                </div>
                            </div>
                            <h1 className={styles.h1}>{`${router.locale === 'pt' ? post?.title : post?.titleen}`}</h1>
                            <div className={styles.principal}>
                                <div className={styles.areaImage}><img className={styles.img} src={`${post?.photos[0].url}${post?.photos[0].token}`} alt="" /></div>
                                {router.locale === 'pt' ? post?.body : post?.bodyen}
                            </div>
                        </div>
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

                            {showMore && commentList.length !== 0 &&
                                <button className={styles.moreComments} onClick={handleMoreComments}>{t('loadMore')}</button>
                            }
                        </div>
                        {sessionStatus == 'authenticated' &&
                            <div className={styles.formComment}>
                                <h2>{t('leaveComment')}</h2>
                                {error &&
                                    <div style={{ color: '#FFF', marginBottom: 10, marginLeft: 30, backgroundColor: '#df1010', width: 'fit-content', padding: 5 }}>{error}</div>
                                }
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
                </section>
                <section className={styles.infoArea}>
                    <div className={styles.areaNews}>
                        <div><NewsLetter news={t('newsMail')} /></div>
                        <div className={styles.infoAreaImage}>
                            <Image src={beauty} alt="" />
                        </div>
                    </div>
                    <div className={styles.morePosts}>
                        <h2>{t('morePosts')}</h2>
                        {cars.map((i, k) => (
                            <div
                                key={k}
                                className={styles.areaPostMore}>
                                <img width={100} height={70} src={`${i.photos[0].url}${i.photos[0].token}`} alt="Avatar" />
                                <a href={`/cars/${i.id}`} className={styles.titlePost}>{router.locale === 'pt' ? i.title : i.titleen}</a>
                            </div>

                        ))}
                    </div>
                </section>
            </div>
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

    const cars = await apiPosts.getPostForCat(1, 9, 'cars')
    const allPosts = await apiPosts.getPostForCat(1, 20, undefined)
    return {
        props: {
            //loggedUser: session.user,
            cars: JSON.parse(JSON.stringify(cars)),
            allPosts: JSON.parse(JSON.stringify(allPosts)),
            ... (await serverSideTranslations(context.locale as string, ['common', 'logo']))
        }
    }
}


