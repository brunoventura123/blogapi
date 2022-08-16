import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import SliderPosts from '../components/home/slidePosts'
import { Theme } from '../components/theme'
import styles from '../styles/Home.module.css'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation'
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from 'swiper';
import { CategoryItem } from '../components/home/categoryItem'
import TitleBar from '../components/titleBar'
import CardItem from '../components/cardItem'
import { NewsLetter } from '../components/newsletter'
import api from '../libs/apiPosts'
import { Post } from '../types/posts'

import car1 from '../public/images/carsImages/1.jpg'
import car2 from '../public/images/carsImages/2.jpg'
import car3 from '../public/images/carsImages/3.jpg'
import car4 from '../public/images/carsImages/4.jpg'
import car5 from '../public/images/carsImages/5.jpg'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

type Props = {
  posts: Post[]
  cars: Post[]
  beauty: Post[]
  food: Post[]
  formula1: Post[]
}
const Home = ({ posts, cars, beauty, food, formula1 }: Props) => {
  const carsSlide = [car1, car2, car3, car4, car5]
  const { t } = useTranslation('common')
  return (
    <Theme
      cat={[t('cars'), t('formula1'), t('beauty'), t('food'), t('contact'), t('hello'), t('logout'), t('login'), t('search')]}
      t={[t('room'), t('news')]}
      footer={[t('room'), t('news'), t('category'), t('cars'), t('formula1'), t('beauty'), t('food'), t('contact'), t('page'), t('moreLinks'), t('announce'), t('privacyPolicy'), t('terms')]}
    >
      <div className={styles.container}>
        <Head>
          <title>{t('title')}</title>
          <meta name="description" content="Blog in the Katheriny Ventura" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className={styles.slidePosts}>
            <SliderPosts posts={posts} />
          </div>
          <div className={styles.bannerAreaHome}>
            {/*<Swiper
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
                    <Image src={carsSlide[key]} width={960} height={500} alt="Avatar" />
                    <Link href={`/${post.category}/${post.id}`}>
                      <p className={styles.infos}>
                        <span
                          className={styles.span}>{`${(post.category === 'cars' ? 'Carros' : (post.category === 'beauty') ? 'Beleza' : (post.category === 'formula1') ? 'Formula 1' : (post.category === 'food' ? 'Comida' : ''))} `}
                          - {` ${post.createdAt.toString().substring(0, 10).split('-').reverse().join('/')}`}
                        </span>
                        <h2 className={styles.title}>{post.title}</h2>
                      </p>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}

            </Swiper>*/}

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
                    title={post.title}
                    image={carsSlide[key].toString()}

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
                      title={post.title}
                      image={carsSlide[key].toString()}
                    />
                  ))}

                </div>
              </div>
              <div className={styles.areaItem}>
                <TitleBar title={t('formula1')} slug={formula1[0].category} all={t('all')} />
                <div className={styles.cards}>

                  {formula1.map((post, key) => (
                    <CardItem
                      key={key}
                      date={post.createdAt.toString()}
                      id={post.id}
                      category={post.category?.toString()}
                      title={post.title}
                      image={carsSlide[key].toString()}
                    />
                  ))}

                </div>
              </div>
              <div className={styles.areaItem}>
                <TitleBar title={t('food')} slug={food[0].category} all={t('all')} />
                <div className={styles.cards}>
                  {food.map((post, key) => (
                    <CardItem
                      key={key}
                      date={post.createdAt.toString()}
                      id={post.id}
                      category={post.category?.toString()}
                      title={post.title}
                      image={carsSlide[key].toString()}
                    />
                  ))}

                </div>
              </div>
              <div className={styles.areaItem}>
                <TitleBar title={t('beauty')} slug={beauty[0].category} all={t('all')} />
                <div className={styles.cards}>
                  {beauty.map((post, key) => (
                    <CardItem
                      key={key}
                      date={post.createdAt.toString()}
                      id={post.id}
                      category={post.category?.toString()}
                      title={post.title}
                      image={carsSlide[key].toString()}
                    />
                  ))}

                </div>
              </div>
            </div>
            <div className={styles.cardNewsLetter}>
              <div className={styles.areaItem}>
                <TitleBar title={t('morePosts')} slug={posts[0].category} all={t('all')} />
                <div className={styles.cardsMore}>
                  {posts.map((post, key) => (
                    <CardItem
                      key={key}
                      date={post.createdAt.toString()}
                      id={post.id}
                      category={post.category?.toString()}
                      title={post.title}
                      image={carsSlide[key].toString()}
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
  const posts = await api.getPostForCat(1, 4, undefined, locale as string)
  const cars = await api.getPostForCat(1, 2, 'cars', locale as string)
  const beauty = await api.getPostForCat(1, 2, 'beauty', locale as string)
  const food = await api.getPostForCat(1, 2, 'food', locale as string)
  const formula1 = await api.getPostForCat(1, 2, 'formula1', locale as string)
  const t = await serverSideTranslations(locale as string, ['common'])
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      cars: JSON.parse(JSON.stringify(cars)),
      beauty: JSON.parse(JSON.stringify(beauty)),
      food: JSON.parse(JSON.stringify(food)),
      formula1: JSON.parse(JSON.stringify(formula1)),
      ...t
    }
  }
}

export default Home
