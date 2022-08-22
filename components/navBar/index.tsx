import Link from "next/link"
import styles from './style.module.css'
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from "next/router";
import { navigationLinks } from "../../utils/data";
import HomeIcon from '@mui/icons-material/Home';
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { Post } from "../../types/posts";
import MenuIcon from '@mui/icons-material/Menu';

type Props = {
    cat: string[]
    postss: Post[]
}

export const NavBar = ({ cat, postss }: Props) => {
    const logged = true
    const { data: session } = useSession()
    const router = useRouter()
    const [search, setSearch] = useState('')
    const [focus, setFocus] = useState(false)
    const lower = search.toLowerCase()
    const [show, setShow] = useState(false)

    return (
        <div className={styles.container}>

            <nav className={styles.nav}>
                <div onClick={() => setShow(!show)} className={styles.menuIcon}>
                    <MenuIcon />
                </div>
                <ul className={styles.contLink} style={{ display: show ? 'flex' : 'flex' }}>
                    <li className={[styles.linkItem, navigationLinks[0].path.includes(router.pathname) ? styles.linkActive : null].join(' ')}><Link href={navigationLinks[0].path[0]}><a><HomeIcon fontSize="small" /></a></Link></li>
                    <li className={[styles.linkItem, navigationLinks[1].path.includes(router.pathname) ? styles.linkActive : null].join(' ')}><Link href={navigationLinks[1].path[0]}><a>{cat[0]}</a></Link></li>
                    <li className={[styles.linkItem, navigationLinks[2].path.includes(router.pathname) ? styles.linkActive : null].join(' ')}><Link href={navigationLinks[2].path[0]}><a>{cat[1]}</a></Link></li>
                    <li className={[styles.linkItem, navigationLinks[3].path.includes(router.pathname) ? styles.linkActive : null].join(' ')}><Link href={navigationLinks[3].path[0]}><a>{cat[3]}</a></Link></li>
                    <li className={[styles.linkItem, navigationLinks[4].path.includes(router.pathname) ? styles.linkActive : null].join(' ')}><Link href={navigationLinks[4].path[0]}><a>{cat[2]}</a></Link></li>
                    <li className={[styles.linkItem, navigationLinks[5].path.includes(router.pathname) ? styles.linkActive : null].join(' ')}><Link href={navigationLinks[5].path[0]}><a>{cat[4]}</a></Link></li>
                </ul>

            </nav>
            <div className={styles.areaLoginSearch}>
                <div className={styles.areaInput}>
                    <div className={styles.input}>
                        <input
                            type="text"
                            placeholder={cat[8]}
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            onFocus={() => setFocus(true)}
                            onBlur={() => { }}
                        />
                        <div className={styles.icon}>
                            <SearchIcon />
                        </div>
                    </div>
                    {focus &&
                        <ul className={styles.list} style={{ display: (search.length > 2 ? 'block' : 'none') }}>
                            {postss?.map((p, k) => (
                                <>
                                    {router.locale === 'pt' && search.length > 2 && p.title.toLowerCase().includes(lower) && router.asPath != `/${p.category}/${p.id}` &&
                                        <li className={styles.li} key={k}>
                                            <Link href={`/${p.category}/${p.id}`}>{p.title.toLowerCase().includes(lower) ? p.title : ''}</Link>
                                        </li>
                                    }
                                    {router.locale === 'en' && search.length > 2 && p.titleen.toLowerCase().includes(lower) && router.asPath != `/${p.category}/${p.id}` &&
                                        <li className={styles.li} key={k}>
                                            <Link href={`/${p.category}/${p.id}`}>{p.titleen.toLowerCase().includes(lower) ? p.titleen : ''}</Link>
                                        </li>
                                    }

                                </>
                            ))}
                        </ul>
                    }
                </div>

                <div className={styles.areaUser}>
                    {!session &&
                        <button style={{ color: '#999' }} onClick={() => signIn()}>{cat[7]}</button>
                    }
                    {session &&
                        <div className={styles.hello}>
                            {cat[5]} <div style={{ color: '#df1010', marginLeft: '5px' }}>{session.user?.name.split(' ').splice(0, 1)}</div>.
                            <button style={{ color: '#999' }} onClick={() => signOut()}>{cat[6]}</button>
                        </div>
                    }
                    <ul className={styles.locale} style={{}}>
                        {router.locales?.map((i, k) => (
                            <li key={k} className={styles.language}>
                                <Link locale={i} href={router.asPath}>
                                    {i.toUpperCase()}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    )
}

/**{navigationLinks.map((i, k) => (
                         <li style={{}} className={[styles.linkItem, verifyActiveLink(i.path)].join(' ')} key={k}><Link href={i.path}>{i.label}</Link></li>
    <li key={k} className={[styles.linkItem, i.path.includes(router.pathname) ? styles.linkActive : null].join(' ')}><Link href={i.path[0]}>{i.label}</Link></li>
                        ))} 
                        */