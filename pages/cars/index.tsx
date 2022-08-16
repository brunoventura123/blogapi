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
import styles from './styles.module.css'

type Props = {
    cars: Post[]
}

const Cars = ({ cars }: Props) => {
    const { t } = useTranslation()
    const router = useRouter()
    const [showMore, setShowMore] = useState(true)
    const [loading, setLoading] = useState(false)
    const [postList, setPostList] = useState<Post[]>(cars)
    const [pageCount, setPageCount] = useState(1)

    const handleMorePosts = async () => {
        setLoading(true)
        const json = await axios.get(`/api/posts?page=${pageCount + 1}&qt=3&cat=cars`)
        console.log(json.data.posts)
        if (json.status) {
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
            cat={[t('cars'), t('formula1'), t('beauty'), t('food'), t('contact'), t('hello'), t('logout'), t('search')]}
            t={[t('room'), t('news')]}
            footer={[t('room'), t('news'), t('category'), t('cars'), t('formula1'), t('beauty'), t('food'), t('contact'), t('page'), t('moreLinks'), t('announce'), t('privacyPolicy'), t('terms')]}
        >
            <div className={styles.container}>
                <Head>
                    <title>{t('title')} | {t('cars')}</title>
                </Head>
                <div className={styles.areaPosts}>
                    <TitleBar title={t('cars')} />
                    <div className={styles.cardsFeutered}>
                        {postList.map((post, key) => (
                            <CardItem date={post.createdAt.toString()} key={key} id={post.id} category={post.category?.toString()} title={post.title} />
                        ))}

                    </div>
                    {showMore &&
                        <button className={styles.buttonMore} onClick={handleMorePosts}>{t('loadMore')}</button>
                    }
                    {loading &&
                        <div>Carregando...</div>
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
    const cars = await api.getPostForCat(1, 8, 'cars', locale as string)
    const t = await serverSideTranslations(locale as string, ['common'])
    return {
        props: {
            cars: JSON.parse(JSON.stringify(cars)),
            ...t
        }
    }
}
export default Cars