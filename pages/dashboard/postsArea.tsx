import axios from 'axios'
import { FormEvent, useState } from 'react'
import { Post } from '../../types/posts'
import styles from './postArea.module.css'
import SearchIcon from '@mui/icons-material/Search';
import { Theme } from '../../components/dashTheme/theme';
import { Input } from '../../components/dashboard/input';
import { useRouter } from 'next/router';

const PostsArea = () => {
    const router = useRouter()
    const [search, setSearch] = useState('')
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [text, setText] = useState('')
    const [files, setFiles] = useState('')

    const handleFormSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { id } = router.query
        if (search) {
            const post: Post = await axios.get(`/api/posts?title=${search}`)
            if (post) {
                setTitle(post.title)
                setCategory(post.category)
                setText(post.body)
            }
        }
    }
    const handlePost = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { id } = router.query
        if (title && category && text) {
            const post = await axios.put(`/api/posts/${id}`, {
                title, body: text, category
            })

            if (post.status) {
                alert('Post atualizado com sucesso!')
                setTitle('')
                setCategory('')
                setText('')
                return
            }
        }
        return alert('Digite todos os campos')
    }
    return (
        <Theme title="Pesquisar posts">
            <div className={styles.container}>
                <form className={styles.formSearch} onSubmit={handleFormSearch}>
                    <input
                        type="text"
                        value={search}
                        placeholder="Pesquisar..."
                        onChange={e => setSearch(e.target.value)}
                    />
                    <button className={styles.icon}><SearchIcon /></button>

                </form>
            </div>
            <div className={styles.postsArea}>
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
                        <textarea
                            name=""
                            placeholder="Texto"
                            value={text}
                            onChange={e => setText(e.target.value)}
                        ></textarea>
                    </label>
                    <div className={styles.imageArea}>
                        <h3>Fotos</h3>

                    </div>
                    <label htmlFor="file" className={styles.label}>
                        Trocar as imagens <div style={{ fontSize: '11px', marginLeft: '5px' }}> (Apenas arquivos png, jpg e jpeg.)</div>
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
                    <button>Salvar</button>
                </form>
            </div>
        </Theme>
    )
}

export default PostsArea