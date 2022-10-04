import Head from 'next/head'
import Link from 'next/link'
import styles from './theme.module.css'
import { FormEvent, ReactNode, useState } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next/types'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth/next'


type Props = {
    children: ReactNode
    title: string
}

export const Theme = ({ children, title }: Props) => {

    return (
        <div className={styles.container}>
            <Head>
                <title>Painel de controle</title>
            </Head>
            <div className={styles.menuArea}>
                <div className={styles.infos}>
                    <Link href={`/`}><p>Sala de <span>Notícias</span></p></Link>
                    <ul className={styles.list}>
                        <Link href={'/dashboard'}><li>Criar novo post</li></Link>
                        <Link href={'/dashboard/postsArea'}><li>Pesquisar posts</li></Link>
                    </ul>
                </div>
            </div>
            <div className={styles.principalArea}>
                <h2 className={styles.title}>{title}</h2>
                {children}
            </div>
        </div>
    )
}
