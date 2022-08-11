import axios from "axios"
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
    food: Post[]
}

const Food = ({ food }: Props) => {
    const router = useRouter()
    const [showMore, setShowMore] = useState(true)
    const [loading, setLoading] = useState(false)
    const [postList, setPostList] = useState<Post[]>(food)
    const [pageCount, setPageCount] = useState(1)

    const handleMorePosts = async () => {
        setLoading(true)
        const json = await axios.get(`/api/posts?page=${pageCount + 1}&qt=3&cat=food`)
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
        <Theme>
            <div className={styles.container}>
                <Head>
                    <title>Sala de Notícias - Comida</title>
                </Head>
                <div className={styles.areaPosts}>
                    <TitleBar title="Comida" />
                    <div className={styles.cardsFeutered}>
                        {food.map((post, key) => (
                            <CardItem date={post.createdAt.toString()} key={key} id={post.id} category={post.category?.toString()} title={post.title} />
                        ))}

                    </div>
                    {showMore &&
                        <button className={styles.buttonMore} onClick={handleMorePosts}>Carregar mais</button>
                    }
                    {loading &&
                        <div>Carregando...</div>
                    }
                </div>
                <div className={styles.news}>
                    <NewsLetter />
                </div>
            </div>
        </Theme>
    )
}
export const getServerSideProps = async () => {
    // DRY = Dont Repeat Yourself
    const food = await api.getPostForCat(1, 8, 'food')
    return {
        props: {
            food: JSON.parse(JSON.stringify(food))
        }
    }
}
export default Food