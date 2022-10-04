import axios from "axios"
import { useTranslation } from "next-i18next"
import { FormEvent, useState } from "react"
import { Input } from "../../components/dashboard/input"
import { Theme } from "../../components/dashTheme/theme"
import styles from './styles.module.css'
import * as Photos from '../../services/photos';


const Dashboard = () => {
    const { t } = useTranslation()
    const [title, setTitle] = useState('')
    const [titleEn, setTitleEn] = useState('')
    const [category, setCategory] = useState('')
    const [text, setText] = useState('')
    const [textEn, setTextEn] = useState('')
    const [files, setFiles] = useState<File>()
    const [photos, setPhotos] = useState('');
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData(e.currentTarget);
        const file = formData.get('image') as File;

        if (file && file.size > 0) {
            setUploading(true);
            let result = await Photos.insert(file);
            setUploading(false);

            if (result instanceof Error) {
                alert(`${result.name} - ${result.message}`);
            } else {
                setLoading(false)
                return setPhotos(result.url);
            }
        }

    }
    const handlePost = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (title && titleEn && category && text && textEn) {
            const post = await axios.post(`/api/posts`, {
                title, titleen: titleEn, body: text, bodyen: textEn, category
            })

            if (post.data.status) {
                alert('Post salvo com sucesso!')
                setTitle('')
                setTitleEn('')
                setCategory('')
                setText('')
                setTextEn('')
                let token = photos.slice(-43)
                let url = photos.slice(0, -43)
                const photoPost = await axios.post(`/api/photos`, {
                    url, token, postId: post.data.newPost.id
                })
                return photoPost
            }
        }
        return alert('Digite todos os campos')
    }

    return (
        <Theme title="Criar novo post">
            <form action="" method="POST" style={{ marginBottom: '20px' }} onSubmit={handleFormSubmit}>
                <label htmlFor="file" className={styles.label}>
                    Escolha suas imagens <div style={{ fontSize: '11px', marginLeft: '5px' }}> (Apenas arquivos png, jpg e jpeg.)</div>

                    <input type="file" name="image" multiple />

                </label>
                <input type="submit" value="Enviar" />
            </form>
            {loading && <div style={{ color: 'red', textAlign: 'center' }}>Carregando...</div>}
            <form action="" method="POST" className={styles.formPost} onSubmit={handlePost}>
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
                    <select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        placeholder="Categorias"
                        style={{
                            width: '100%',
                            padding: 10,
                            outline: 'none',
                            marginBottom: 20
                        }}
                    >
                        <option value="cars">cars</option>
                        <option value="beauty">beauty</option>
                        <option value="formula1">formula1</option>
                        <option value="food">food</option>
                    </select>
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

                <button>Postar</button>
            </form>

        </Theme>
    )
}
export default Dashboard
