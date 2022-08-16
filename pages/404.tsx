import { Theme } from "../components/theme"

const Custom404 = () => {
    return (
        <Theme>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: 50 }}>
                <h1>404</h1>
                <h3>Página não encontrada.</h3>
            </div>
        </Theme>
    )
}
export default Custom404