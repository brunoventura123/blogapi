import Link from 'next/link'
import styles from './style.module.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.infos}>
                <Link href={`/`}><a><p>Sala de <span>Notícias</span></p></a></Link>
                <p className={styles.text}>Volup amet magna clita tempor. Tempor sea eos vero ipsum. Lorem lorem sit sed elitr sed kasd et</p>
                <div className={styles.social}>
                    <TwitterIcon className={styles.icon} />
                    <FacebookIcon className={styles.icon} />
                    <LinkedInIcon className={styles.icon} />
                    <InstagramIcon className={styles.icon} />
                    <YouTubeIcon className={styles.icon} />
                </div>
            </div>
            <div className={styles.categories}>
                <h2>Categorias</h2>
                <ul>
                    <Link href={`/cars`}><li>Carros</li></Link>
                    <Link href={`/formula1`}><li>Formula 1</li></Link>
                    <Link href={`/food`}><li>Comida</li></Link>
                    <Link href={`/beauty`}><li>Beleza</li></Link>
                    <Link href={`/cars`}><li>Automóveis</li></Link>
                    <Link href={`/formula1`}><li>Formula 1</li></Link>
                    <Link href={`/food`}><li>Comida</li></Link>
                    <Link href={`/beauty`}><li>Beleza</li></Link>

                </ul>
            </div>
            <div className={styles.tags}>
                <h2>Páginas</h2>
                <ul>
                    <Link href={`/cars`}><li>Carros</li></Link>
                    <Link href={`/formula1`}><li>Formula 1</li></Link>
                    <Link href={`/food`}><li>Comida</li></Link>
                    <Link href={`/beauty`}><li>Beleza</li></Link>
                    <Link href={`/cars`}><li>Carros</li></Link>
                    <Link href={`/formula1`}><li>Formula 1</li></Link>
                    <Link href={`/food`}><li>Comida</li></Link>
                    <Link href={`/beauty`}><li>Beleza</li></Link>

                </ul>
            </div>
            <div className={styles.links}>
                <h2>Mais Links</h2>
                <ul>
                    <Link href={`#`}><li><ArrowForwardIosIcon className={styles.icon} />Anunciar</li></Link>
                    <Link href={`#`}><li><ArrowForwardIosIcon className={styles.icon} />Politica de Privacidade</li></Link>
                    <Link href={`#`}><li><ArrowForwardIosIcon className={styles.icon} />Termos & Condições</li></Link>
                    <Link href={`/contact`}><li><ArrowForwardIosIcon className={styles.icon} />Contato</li></Link>
                </ul>
            </div>
        </div>
    )
}