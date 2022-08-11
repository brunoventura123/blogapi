import Link from "next/link"
import { useRouter } from "next/router"


const Tanks = () => {
    const router = useRouter()
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100vh',
            backgroundColor: '#333',
            color: '#FFF'
        }}>
            <h1>Obrigado por enviar o e-mail!</h1>
            <div style={{ marginTop: '20px', fontSize: '20px', color: 'pink' }}>
                <Link href={'/'}><a style={{ color: 'green', textDecoration: 'none', }}>Voltar ao site</a></Link>
            </div>
        </div>
    )
}
export default Tanks