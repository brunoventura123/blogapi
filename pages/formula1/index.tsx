import axios from "axios"
import { GetServerSideProps } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import CardItem from "../../components/cardItem"
import { NewsLetter } from "../../components/newsletter"
import { Theme } from "../../components/theme"
import TitleBar from "../../components/titleBar"
import api from "../../libs/apiPosts"
import { Post } from "../../types/posts"
import styles from '../cars/styles.module.css'

type Props = {
    formula1: Post[]
    posts: Post[]
}

const Fomula1 = ({ formula1, posts }: Props) => {
    const router = useRouter()
    const { t } = useTranslation()
    const [showMore, setShowMore] = useState(true)
    const [loading, setLoading] = useState(false)
    const [postList, setPostList] = useState<Post[]>(formula1)
    const [pageCount, setPageCount] = useState(1)

    const handleMorePosts = async () => {
        setLoading(true)
        const json = await axios.get(`/api/posts?page=${pageCount + 1}&qt=4&cat=formula1`)
        if (json.data.status) {
            if (json.data.postForCat.length === 0) {
                setShowMore(false)
            }
            setPostList([...postList, ...json.data.postForCat])
        }
        setLoading(false)
        setPageCount(pageCount + 1)

    }

    return (
        <Theme
            posts={posts}
            t={[t('news'), t('room')]}
            cat={[t('cars'), t('formula1'), t('beauty'), t('food'), t('contact'), t('hello'), t('logout'), t('login'), t('search')]}
            footer={[t('room'), t('news'), t('category'), t('cars'), t('formula1'), t('beauty'), t('food'), t('contact'), t('page'), t('moreLinks'), t('announce'), t('privacyPolicy'), t('terms')]}

        >
            <div className={styles.container}>
                <Head>
                    <title>{t('title')} | {t('formula1').toUpperCase()}</title>
                </Head>
                <div className={styles.areaPosts}>
                    <TitleBar title={t('formula1')} />
                    <div className={styles.cardsFeutered}>
                        {postList.map((post, key) => (
                            <CardItem date={post.createdAt.toString()} key={key} id={post.id} category={post.category?.toString()} title={router.locale === 'pt' ? post.title : post.titleen} />
                        ))}

                    </div>
                    {showMore &&
                        <button className={styles.buttonMore} onClick={handleMorePosts}>{t('loadMore')}</button>
                    }
                    {loading &&
                        <div style={{ textAlign: 'center', color: '#df1010', fontWeight: 'bold' }}>Carregando...</div>
                    }
                </div>
                <div className={styles.news}>
                    <NewsLetter news={t('newsMail')} />
                </div>
            </div>
        </Theme>
    )
}
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    // DRY = Dont Repeat Yourself
    const formula1 = await api.getPostForCat(1, 8, 'formula1')
    const posts = await api.getPostForCat(0, 20, undefined)
    const t = await serverSideTranslations(locale as string, ['common'])

    return {
        props: {
            formula1: JSON.parse(JSON.stringify(formula1)),
            posts: JSON.parse(JSON.stringify(posts)),
            ...t
        }
    }
}
export default Fomula1