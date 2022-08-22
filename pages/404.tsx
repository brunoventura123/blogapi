import { GetServerSideProps } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { Theme } from "../components/theme"
import apiPosts from "../libs/apiPosts"
import { AuthUser } from "../types/AuthUser"
import { Post } from "../types/posts"

type Props = {
    allPosts: Post[]
}

const Custom404 = ({ allPosts }: Props) => {
    const { t } = useTranslation()
    return (
        <Theme
            posts={allPosts}
            t={[t('news'), t('room')]}
            cat={[t('cars'), t('formula1'), t('beauty'), t('food'), t('contact'), t('hello'), t('logout'), t('login'), t('search')]}
            footer={[t('room'), t('news'), t('category'), t('cars'), t('formula1'), t('beauty'), t('food'), t('contact'), t('page'), t('moreLinks'), t('announce'), t('privacyPolicy'), t('terms')]}

        >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: 50 }}>
                <h1>404</h1>
                <h3>Página não encontrada.</h3>
            </div>
        </Theme>
    )
}
export const getServerSideProps: GetServerSideProps = async (context) => {

    const allPosts = await apiPosts.getPostForCat(1, 20, undefined)
    return {
        props: {
            allPosts: JSON.parse(JSON.stringify(allPosts)),
            ... (await serverSideTranslations(context.locale as string, ['common', 'logo']))
        }
    }
}
export default Custom404