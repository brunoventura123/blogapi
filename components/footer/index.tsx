import Link from 'next/link'
import styles from './style.module.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTranslation } from 'next-i18next';

export const Footer = () => {
    const { t } = useTranslation()
    return (
        <footer className={styles.container}>
            <div className={styles.infos}>
                <Link href={`/`}><p>{t('news')}<span>{t('room')}</span></p></Link>
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
                <h2>{t('category')}</h2>
                <ul>
                    <Link href={`/cars`}><li>{t('cars')}</li></Link>
                    <Link href={`/formula1`}><li>{t('formula1')}</li></Link>
                    <Link href={`/food`}><li>{t('food')}</li></Link>
                    <Link href={`/beauty`}><li>{t('beauty')}</li></Link>
                    <Link href={`/cars`}><li>{t('cars')}</li></Link>
                    <Link href={`/formula1`}><li>{t('formula1')}</li></Link>
                    <Link href={`/food`}><li>{t('food')}</li></Link>
                    <Link href={`/beauty`}><li>{t('beauty')}</li></Link>

                </ul>
            </div>
            <div className={styles.tags}>
                <h2>{'Tags'}</h2>
                <ul>
                    <Link href={`/cars`}><li>{t('cars')}</li></Link>
                    <Link href={`/formula1`}><li>{t('formula1')}</li></Link>
                    <Link href={`/food`}><li>{t('food')}</li></Link>
                    <Link href={`/beauty`}><li>{t('beauty')}</li></Link>
                    <Link href={`/cars`}><li>{t('cars')}</li></Link>
                    <Link href={`/formula1`}><li>{t('formula1')}</li></Link>
                    <Link href={`/food`}><li>{t('food')}</li></Link>
                    <Link href={`/beauty`}><li>{t('beauty')}</li></Link>

                </ul>
            </div>
            <div className={styles.links}>
                <h2>{t('moreLinks')}</h2>
                <ul>
                    <Link href={`#`}><li><ArrowForwardIosIcon className={styles.icon} />{t('announce')}</li></Link>
                    <Link href={`#`}><li><ArrowForwardIosIcon className={styles.icon} />{t('privacyPolicy')}</li></Link>
                    <Link href={`#`}><li><ArrowForwardIosIcon className={styles.icon} />{t('terms')}</li></Link>
                    <Link href={`/contact`}><li><ArrowForwardIosIcon className={styles.icon} />{t('contact')}</li></Link>
                </ul>
            </div>
        </footer>
    )
}