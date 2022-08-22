import { useRouter } from "next/router"

const Custom404 = () => {
    const router = useRouter()
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: 50, fontSize: '30px', textAlign: 'center' }}>
            <h1>404</h1>
            <h3>Página não encontrada. <br />
                <button
                    style={{ padding: '10px', cursor: 'pointer' }}
                    onClick={() => { router.push('/') }}>Voltar</button>
            </h3>
        </div>
    )
}

export default Custom404