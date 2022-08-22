import axios from "axios"
import { useTranslation } from "next-i18next"
import { FormEvent, useState } from "react"
import { Input } from "../../components/dashboard/input"
import { Theme } from "../../components/dashTheme/theme"
import styles from './styles.module.css'

const Dashboard = () => {
    const { t } = useTranslation()
    const [title, setTitle] = useState('')
    const [titleEn, setTitleEn] = useState('')
    const [category, setCategory] = useState('')
    const [text, setText] = useState('')
    const [textEn, setTextEn] = useState('')
    const [files, setFiles] = useState('')

    const handlePost = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const avatar = `https://logodownload.org/wp-content/uploads/2014/09/google-logo-0.png`
        if (title && titleEn && category && text && textEn) {
            const post = await axios.post(`/api/posts`, {
                title, titleen: titleEn, body: text, bodyen: textEn, category, avatar
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
                        label="TítuloPt"
                        value={title}
                        onChange={setTitle}
                    />
                </label>
                <label htmlFor="">
                    <Input
                        type="text"
                        label="TítuloEn"
                        value={titleEn}
                        onChange={setTitleEn}
                    />
                </label>
                <label htmlFor="">
                    <Input
                        type="text"
                        label="Categoria (cars, food, beauty, formula1)"
                        value={category}
                        onChange={setCategory}
                    />
                </label>

                <label htmlFor="">
                    <textarea
                        name=""
                        placeholder="TextoPt"
                        value={text}
                        onChange={e => setText(e.target.value)}
                    ></textarea>
                </label>
                <label htmlFor="">
                    <textarea
                        name=""
                        placeholder="TextoEn"
                        value={textEn}
                        onChange={e => setTextEn(e.target.value)}
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
