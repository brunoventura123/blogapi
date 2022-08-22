import { Logo } from '../logo'
import { ReactNode } from "react"
import { Footer } from "../footer"
import { NavBar } from "../navBar"
import { SSRConfig, useTranslation } from 'next-i18next'
import { GetServerSideProps, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Post } from '../../types/posts'
import { Up } from '../up'


type Props = {
    children: ReactNode,
    cat: string[]
    footer: string[]
    t: string[]
    posts: Post[]
}

export const Theme = ({ children, cat, footer, t, posts }: Props) => {
    return (
        <div>
            <Logo t={t} />
            <NavBar cat={cat} postss={posts} />
            <div className="container">
                {children}
            </div>
            <Footer footer={footer} />
            <Up />
        </div>
    )
}