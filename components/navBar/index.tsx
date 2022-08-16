import Link from "next/link"
import styles from './style.module.css'
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from "next/router";
import { navigationLinks } from "../../utils/data";
import HomeIcon from '@mui/icons-material/Home';
import { signIn, signOut, useSession } from "next-auth/react";

type Props = {
    cat: string[]
}

export const NavBar = ({ cat }: Props) => {
    const logged = true
    const { data: session } = useSession()
    const router = useRouter()

    return (
        <div className={styles.container}>
            <nav>
                <ul className={styles.contLink}>

                    <li style={{ width: '70px', textAlign: 'center', cursor: 'pointer', padding: 0 }} className={[styles.linkItem, navigationLinks[0].path.includes(router.pathname) ? styles.linkActive : null].join(' ')}><Link href={navigationLinks[0].path[0]}><HomeIcon fontSize="medium" /></Link></li>
                    <li className={[styles.linkItem, navigationLinks[1].path.includes(router.pathname) ? styles.linkActive : null].join(' ')}><Link href={navigationLinks[1].path[0]}>{cat[0]}</Link></li>
                    <li className={[styles.linkItem, navigationLinks[2].path.includes(router.pathname) ? styles.linkActive : null].join(' ')}><Link href={navigationLinks[2].path[0]}>{cat[1]}</Link></li>
                    <li className={[styles.linkItem, navigationLinks[3].path.includes(router.pathname) ? styles.linkActive : null].join(' ')}><Link href={navigationLinks[3].path[0]}>{cat[3]}</Link></li>
                    <li className={[styles.linkItem, navigationLinks[4].path.includes(router.pathname) ? styles.linkActive : null].join(' ')}><Link href={navigationLinks[4].path[0]}>{cat[2]}</Link></li>
                    <li className={[styles.linkItem, navigationLinks[5].path.includes(router.pathname) ? styles.linkActive : null].join(' ')}><Link href={navigationLinks[5].path[0]}>{cat[4]}</Link></li>
                </ul>
            </nav>

            <div className={styles.areaLoginSearch}>
                <div className={styles.input}>
                    <input type="text" placeholder={cat[8]} />
                    <div className={styles.icon}>
                        <SearchIcon />
                    </div>
                </div>
                {!session &&
                    <button onClick={() => signIn()}>{cat[7]}</button>
                }
                {session &&
                    <div style={{ paddingLeft: '20px', display: 'flex' }}>
                        {cat[5]} <div style={{ color: '#df1010', marginLeft: '5px' }}>{session.user?.name.split(' ').splice(0, 1)}</div>.
                        <button onClick={() => signOut()}>{cat[6]}</button>
                    </div>
                }
            </div>
            <ul className={styles.locale} style={{}}>
                {router.locales?.map((i, k) => (
                    <li key={k} >
                        <Link locale={i} href={router.asPath}>
                            {i.toUpperCase()}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

/**{navigationLinks.map((i, k) => (
                         <li style={{}} className={[styles.linkItem, verifyActiveLink(i.path)].join(' ')} key={k}><Link href={i.path}>{i.label}</Link></li>
    <li key={k} className={[styles.linkItem, i.path.includes(router.pathname) ? styles.linkActive : null].join(' ')}><Link href={i.path[0]}>{i.label}</Link></li>
                        ))} 
                        */