import axios from "axios"
import { FormEvent, useState } from "react"
import { Input } from "../../components/dashboard/input"
import { Theme } from "../../components/dashTheme/theme"
import styles from './styles.module.css'

const Dashboard = () => {
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [text, setText] = useState('')
    const [language, setLanguage] = useState('')
    const [files, setFiles] = useState('')

    const handlePost = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const avatar = `https://logodownload.org/wp-content/uploads/2014/09/google-logo-0.png`
        if (title && category && text && language) {
            const post = await axios.post(`/api/posts`, {
                title, body: text, category, avatar, language
            })

            if (post.status) {
                alert('Post salvo com sucesso!')
                setTitle('')
                setCategory('')
                setText('')
                return
            }
        }
        return alert('Digite todos os campos')
    }

    return (
        <Theme title="Criar novo post">

            <form action="" className={styles.formPost} onSubmit={handlePost}>
                <label htmlFor="">
                    <Input
                        type="text"
                        label="Título"
                        value={title}
                        onChange={setTitle}
                    />
                </label>
                <label htmlFor="">
                    <Input
                        type="text"
                        label="Categoria"
                        value={category}
                        onChange={setCategory}
                    />
                </label>
                <label htmlFor="">
                    <Input
                        type="text"
                        label="Idioma"
                        value={language}
                        onChange={setLanguage}
                    />
                </label>
                <label htmlFor="">
                    <textarea
                        name=""
                        placeholder="Texto"
                        value={text}
                        onChange={e => setText(e.target.value)}
                    ></textarea>
                </label>
                <label htmlFor="file" className={styles.label}>
                    Escolha suas imagens <div style={{ fontSize: '11px', marginLeft: '5px' }}> (Apenas arquivos png, jpg e jpeg.)</div>
                    <div>
                        <Input
                            multiple
                            type="file"
                            label="Imagens"
                            name={'file'}
                            onChange={setFiles}
                        />
                    </div>
                </label>
                <button>Postar</button>
            </form>
        </Theme>
    )
}
export default Dashboard
