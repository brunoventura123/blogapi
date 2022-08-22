import { GetServerSideProps } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import dance from '../public/images/dance.gif'


const Tanks = () => {
    const { t } = useTranslation()
    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            if (router.asPath === '/tanks') {
                router.back()
            }
        }, 3000)
    }, [])
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100vh',
            backgroundColor: '#333',
            color: '#FFF',
            paddingTop: '20px'
        }}>
            <Head>
                <title>{t('title')} | {t('tanks')}</title>
            </Head>
            <Image src={dance} alt="" />
            <h1>{t('success')}</h1>
            <div style={{ marginTop: '20px', fontSize: '20px', color: 'pink' }}>
                <Link href={'/'}><a style={{ color: '#df1010', textDecoration: 'none', }}>{t('comeback')}</a></Link>
            </div>
        </div>
    )
}
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    // DRY = Dont Repeat Yourself
    const t = await serverSideTranslations(locale as string, ['common'])
    return {
        props: {
            ...t
        }
    }
}
export default Tanks