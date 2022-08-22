import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import SliderPosts from '../components/home/slidePosts'
import api from '../libs/apiPosts'
import TitleBar from '../components/titleBar'
import CardItem from '../components/cardItem'

import woman from '../public/images/woman.jpg'
import foodIcon from '../public/images/food.jpg'
import car from '../public/images/carred.jpg'
import f1 from '../public/images/carsImages/1.jpg'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation'
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from 'swiper';
import { CategoryItem } from '../components/home/categoryItem'
import { NewsLetter } from '../components/newsletter'
import { Post } from '../types/posts'
import { Theme } from '../components/theme'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

type Props = {
  posts: Post[]
  cars: Post[]
  beauty: Post[]
  food: Post[]
  formula1: Post[]
  allPosts: Post[]
}
const Home = ({ posts, cars, beauty, formula1, food, allPosts }: Props) => {
  const photos = [woman, f1, car, foodIcon]
  const router = useRouter()
  const { t } = useTranslation('common')

  return (
    <Theme
      posts={allPosts}
      t={[t('news'), t('room')]}
      cat={[t('cars'), t('formula1'), t('beauty'), t('food'), t('contact'), t('hello'), t('logout'), t('login'), t('search')]}
      footer={[t('room'), t('news'), t('category'), t('cars'), t('formula1'), t('beauty'), t('food'), t('contact'), t('page'), t('moreLinks'), t('announce'), t('privacyPolicy'), t('terms')]}
    >
      <div className={styles.container}>
        <Head>
          <title>{t('title')}</title>
          <meta name="description" content="Blog in the Katheriny Ventura" />
          <link rel="shortcut icon" type="image/x-icon" href="..\public\images\iconFive.ico" />
        </Head>

        <main className={styles.main}>
          <div className={styles.slidePosts}>
            <SliderPosts posts={posts} />
          </div>
          <div className={styles.bannerAreaHome}>
            <Swiper
              slidesPerView={1}
              loop
              modules={[Navigation, Pagination, Autoplay]}
              autoplay={{
                delay: 4500,
                disableOnInteraction: true
              }}
              className={styles.swiperHome}
            >
              {posts.map((post, key) => (
                <SwiperSlide key={key} className={styles.slideHome}>
                  <div className={styles.areaSlide}>
                    <Image src={photos[key]} width={960} height={500} alt="Avatar" />
                    <Link href={`/${post.category}/${post.id}`}>
                      <div className={styles.infos}>
                        <span
                          className={styles.span}>{`${router.locale === 'pt' ? (post.category === 'cars' ? 'Carros' : (post.category === 'beauty') ? 'Beleza' : (post.category === 'formula1') ? 'Fórmula 1' : (post.category === 'food' ? 'Comida' : '')) : (post.category === 'cars' ? 'Cars' : (post.category === 'beauty') ? 'Beauty' : (post.category === 'formula1') ? 'Formula 1' : (post.category === 'food' ? 'Food' : ''))} `}
                          | {` ${router.locale === 'pt' ? post.createdAt.toString().substring(0, 10).split('-').reverse().join('/') : post.createdAt.toString().substring(0, 10).split('-').join('/')}`}
                        </span>
                        <h2 className={styles.title}>{router.locale === 'pt' ? post.title : post.titleen}</h2>
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}

            </Swiper>

            <div className={styles.categoriesArea}>
              <div className={styles.title}>
                <h2>{t('category')}</h2>
              </div>
              <CategoryItem cat={[t('cars'), t('formula1'), t('beauty'), t('food')]} />
            </div>
          </div>
          <section className={styles.section}>
            <div>
              <TitleBar title={t('highlights')} all={t('all')} />
              <div className={styles.cardsFeutered}>
                {posts.map((post, key) => (
                  <CardItem
                    key={key}
                    date={post.createdAt.toString()}
                    id={post.id} category={post.category?.toString()}
                    title={router.locale === 'pt' ? post?.title : post?.titleen}
                    image={''}

                  />
                ))}

              </div>
            </div>
            <div className={styles.boxArea}>
              <div className={`${styles.areaItem}`}>
                <TitleBar title={t('cars')} slug={cars[0]?.category} all={t('all')} />
                <div className={styles.cards}>

                  {cars.map((post, key) => (
                    <CardItem
                      key={key}
                      date={post.createdAt.toString()}
                      id={post.id} category={post.category?.toString()}
                      title={router.locale === 'pt' ? post?.title : post?.titleen}
                      image={''}
                    />
                  ))}

                </div>
              </div>

              <div className={styles.areaItem}>
                <TitleBar title={t('formula1')} slug={t('formula1')} all={t('all')} />
                <div className={styles.cards}>

                  {formula1.map((post, key) => (
                    <CardItem
                      key={key}
                      date={post.createdAt.toString()}
                      id={post.id}
                      category={post.category?.toString()}
                      title={router.locale === 'pt' ? post?.title : post?.titleen}
                      image={''}
                    />
                  ))}

                </div>
              </div>
              <div className={styles.areaItem}>
                <TitleBar title={t('food')} slug={t('food')} all={t('all')} />
                <div className={styles.cards}>
                  {food.map((post, key) => (
                    <CardItem
                      key={key}
                      date={post.createdAt.toString()}
                      id={post.id}
                      category={post.category?.toString()}
                      title={router.locale === 'pt' ? post?.title : post?.titleen}
                      image={''}
                    />
                  ))}

                </div>
              </div>
              <div className={styles.areaItem}>
                <TitleBar title={t('beauty')} slug={t('beauty')} all={t('all')} />
                <div className={styles.cards}>
                  {beauty.map((post, key) => (
                    <CardItem
                      key={key}
                      date={post.createdAt.toString()}
                      id={post.id}
                      category={post.category?.toString()}
                      title={router.locale === 'pt' ? post?.title : post?.titleen}
                      image={''}
                    />
                  ))}

                </div>
              </div>
            </div>
            <div className={styles.cardNewsLetter}>
              <div className={styles.areaItem}>
                <TitleBar title={t('morePosts')} all={t('all')} />
                <div className={styles.cardsMore}>
                  {posts.map((post, key) => (
                    <CardItem
                      key={key}
                      date={post.createdAt.toString()}
                      id={post.id}
                      category={post.category?.toString()}
                      title={router.locale === 'pt' ? post?.title : post?.titleen}
                      image={''}
                    />
                  ))}


                </div>
              </div>
              <div className={styles.newsLetter}>
                <NewsLetter news={t('newsMail')} />
              </div>
            </div>
          </section>
        </main>
      </div>
    </Theme>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  // DRY = Dont Repeat Yourself
  const posts = await api.getPostForCat(1, 4, undefined)
  const allPosts = await api.getPostForCat(1, 20, undefined)
  const cars = await api.getPostForCat(1, 2, 'cars')
  const beauty = await api.getPostForCat(1, 2, 'beauty')
  const food = await api.getPostForCat(1, 2, 'food')
  const formula1 = await api.getPostForCat(1, 2, 'formula1')
  const t = await serverSideTranslations(locale as string, ['common'])
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      allPosts: JSON.parse(JSON.stringify(allPosts)),
      cars: JSON.parse(JSON.stringify(cars)),
      beauty: JSON.parse(JSON.stringify(beauty)),
      food: JSON.parse(JSON.stringify(food)),
      formula1: JSON.parse(JSON.stringify(formula1)),
      ...t
    }
  }
}

export default Home
