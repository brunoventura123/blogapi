import Link from "next/link"
import styles from './style.module.css'
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from "next/router";
import { navigationLinks } from "../../utils/data";
import HomeIcon from '@mui/icons-material/Home';
import { signIn, signOut, useSession } from "next-auth/react";

export const NavBar = () => {
    const logged = true
    const { data: session } = useSession()
    const router = useRouter()
    return (
        <div className={styles.container}>
            <nav>
                <ul className={styles.contLink}>

                    <li style={{ width: '70px', textAlign: 'center', cursor: 'pointer', padding: 0 }} className={[styles.linkItem, navigationLinks[0].path.includes(router.pathname) ? styles.linkActive : null].join(' ')}><Link href={navigationLinks[0].path[0]}><HomeIcon fontSize="medium" /></Link></li>
                    <li className={[styles.linkItem, navigationLinks[1].path.includes(router.pathname) ? styles.linkActive : null].join(' ')}><Link href={navigationLinks[1].path[0]}>{navigationLinks[1].label}</Link></li>
                    <li className={[styles.linkItem, navigationLinks[2].path.includes(router.pathname) ? styles.linkActive : null].join(' ')}><Link href={navigationLinks[2].path[0]}>{navigationLinks[2].label}</Link></li>
                    <li className={[styles.linkItem, navigationLinks[3].path.includes(router.pathname) ? styles.linkActive : null].join(' ')}><Link href={navigationLinks[3].path[0]}>{navigationLinks[3].label}</Link></li>
                    <li className={[styles.linkItem, navigationLinks[4].path.includes(router.pathname) ? styles.linkActive : null].join(' ')}><Link href={navigationLinks[4].path[0]}>{navigationLinks[4].label}</Link></li>
                    <li className={[styles.linkItem, navigationLinks[5].path.includes(router.pathname) ? styles.linkActive : null].join(' ')}><Link href={navigationLinks[5].path[0]}>{navigationLinks[5].label}</Link></li>
                </ul>
            </nav>
            <div className={styles.areaLoginSearch}>
                <div className={styles.input}>
                    <input type="text" placeholder="Pesquisar" />
                    <div className={styles.icon}>
                        <SearchIcon />
                    </div>
                </div>
                {!session &&
                    <button onClick={() => signIn()}>Fazer login</button>
                }
                {session &&
                    <div style={{ paddingLeft: '20px', display: 'flex' }}>
                        Olá <div style={{ color: '#df1010', marginLeft: '5px' }}>{session.user?.name.split(' ').splice(0, 1)}</div>.
                        <button onClick={() => signOut()}>Sair</button>
                    </div>
                }
            </div>
        </div>
    )
}

/**{navigationLinks.map((i, k) => (
                         <li style={{}} className={[styles.linkItem, verifyActiveLink(i.path)].join(' ')} key={k}><Link href={i.path}>{i.label}</Link></li>
    <li key={k} className={[styles.linkItem, i.path.includes(router.pathname) ? styles.linkActive : null].join(' ')}><Link href={i.path[0]}>{i.label}</Link></li>
                        ))} 
                        */