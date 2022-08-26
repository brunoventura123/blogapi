import axios from "axios"
import { useTranslation } from "next-i18next"
import { FormEvent, useState } from "react"
import { Input } from "../../components/dashboard/input"
import { Theme } from "../../components/dashTheme/theme"
import styles from './styles.module.css'
import { PhotoApi } from '../../services/PhotoApi'
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
                //let newPhotoList = [photos];
                //newPhotoList.push(result.url);
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
                console.log('Url completa: ' + photos)
                console.log('Token: ' + token, 'Url: ' + url)
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

                    <input type="file" name="image" />

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

                <button>Postar</button>
            </form>

        </Theme>
    )
}
export default Dashboard
