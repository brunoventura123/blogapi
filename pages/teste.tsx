import Head from "next/head"
import { useEffect, useState } from "react"

type Post = {
    userId: number
    id: number
    title: string
    body: string
}

const Teste = () => {

    let texto = 'Esse é um texto padrão para tentar encontrar algum palavrão dentro de um comentário, como por exemplo tezuda'




    const [count, setCount] = useState(10)
    const [post, setPost] = useState<Post[]>([])
    const [loading, setLoading] = useState(false)
    const url = `https://jsonplaceholder.typicode.com/posts`;

    const posts = async () => {
        setLoading(true)
        const res = await fetch(`${url}`);
        const json = await res.json();
        setPost(json)
        setLoading(false)
    };

    useEffect(() => {
        posts()

    }, [])
    return (
        <div style={{
            padding: 50
        }}>
            <Head>
                <title>Teste</title>
            </Head>
            <h1>Contagem é: {count}</h1>
            <button onClick={() => setCount(count + 1)}>Aumentar</button>
            <hr />
            <h2 style={{ textAlign: 'center', marginTop: 20, fontSize: 30 }}>Posts</h2>
            {loading && <div style={{ color: 'red', padding: 50 }}>Carregando...</div>}

            <ul style={{ padding: 50, maxWidth: 900, margin: 'auto' }}>
                {post.sort((a, b) => b.id - a.id).filter((item) => item.title.length < 20).map((i, k) => (
                    <li style={{
                        paddingBottom: 20, borderBottom: '1px solid #333'
                    }} key={k}>{i.title} <br />
                        {i.body}
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Teste