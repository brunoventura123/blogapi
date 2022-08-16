import { Logo } from '../logo'
import { ReactNode } from "react"
import { Footer } from "../footer"
import { NavBar } from "../navBar"
import { SSRConfig, useTranslation } from 'next-i18next'
import { GetServerSideProps, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'


type Props = {
    children: ReactNode,
    t: string[],
    cat: string[]
    footer: string[]
}

export const Theme = ({ children, t, cat, footer }: Props) => {
    return (
        <div>
            <Logo t={t} />
            <NavBar cat={cat} />
            <div className="container">
                {children}
            </div>
            <Footer footer={footer} />
        </div>
    )
}
