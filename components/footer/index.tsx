import Link from 'next/link'
import styles from './style.module.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type Props = {
    footer: string[]
}

export const Footer = ({ footer }: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.infos}>
                <Link href={`/`}><a><p>{footer[1]}<span>{footer[0]}</span></p></a></Link>
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
                <h2>{footer[2]}</h2>
                <ul>
                    <Link href={`/cars`}><li>{footer[3]}</li></Link>
                    <Link href={`/formula1`}><li>{footer[4]}</li></Link>
                    <Link href={`/food`}><li>{footer[5]}</li></Link>
                    <Link href={`/beauty`}><li>{footer[6]}</li></Link>
                    <Link href={`/cars`}><li>{footer[3]}</li></Link>
                    <Link href={`/formula1`}><li>{footer[4]}</li></Link>
                    <Link href={`/food`}><li>{footer[5]}</li></Link>
                    <Link href={`/beauty`}><li>{footer[6]}</li></Link>

                </ul>
            </div>
            <div className={styles.tags}>
                <h2>{footer[8]}</h2>
                <ul>
                    <Link href={`/cars`}><li>{footer[3]}</li></Link>
                    <Link href={`/formula1`}><li>{footer[4]}</li></Link>
                    <Link href={`/food`}><li>{footer[5]}</li></Link>
                    <Link href={`/beauty`}><li>{footer[6]}</li></Link>
                    <Link href={`/cars`}><li>{footer[3]}</li></Link>
                    <Link href={`/formula1`}><li>{footer[4]}</li></Link>
                    <Link href={`/food`}><li>{footer[5]}</li></Link>
                    <Link href={`/beauty`}><li>{footer[6]}</li></Link>

                </ul>
            </div>
            <div className={styles.links}>
                <h2>{footer[9]}</h2>
                <ul>
                    <Link href={`#`}><li><ArrowForwardIosIcon className={styles.icon} />{footer[10]}</li></Link>
                    <Link href={`#`}><li><ArrowForwardIosIcon className={styles.icon} />{footer[11]}</li></Link>
                    <Link href={`#`}><li><ArrowForwardIosIcon className={styles.icon} />{footer[12]}</li></Link>
                    <Link href={`/contact`}><li><ArrowForwardIosIcon className={styles.icon} />{footer[7]}</li></Link>
                </ul>
            </div>
        </div>
    )
}