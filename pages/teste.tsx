import Head from "next/head"
import { useState } from "react"
const Teste = () => {
    const [count, setCount] = useState(10)
    return (
        <div>
            <Head>
                <title>Teste</title>
            </Head>
            <h1>Contagem é: {count}</h1>
            <button onClick={() => setCount(count + 1)}>Aumentar</button>
        </div>
    )
}
export default Teste