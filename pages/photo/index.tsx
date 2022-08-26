import { useState, useEffect, FormEvent } from 'react';
import styles from './App.module.css';
import * as Photos from '../../services/photos';
import { PhotoApi } from '../../services/PhotoApi';
import { PhotoItem } from '../../components/PhotoItem';

const Photo = () => {
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<PhotoApi[]>([]);

  useEffect(() => {
    getPhotos();
  }, []);

  const getPhotos = async () => {
    setLoading(true);
    setPhotos(await Photos.getAll());
    setLoading(false);
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get('image') as File;

    if (file && file.size > 0) {
      setUploading(true);
      let result = await Photos.insert(file);
      setUploading(false);

      if (result instanceof Error) {
        alert(`${result.name} - ${result.message}`);
      } else {
        let newPhotoList = [...photos];
        newPhotoList.push(result);
        setPhotos(newPhotoList);
      }
    }
  }

  const handleDeleteClick = async (name: string) => {
    await Photos.deletePhoto(name);
    getPhotos();
  }

  return (

    <div className={styles.container}>
      <div className={styles.area}>
        <h1 className={styles.header}>Galeria de Fotos</h1>

        <form className={styles.uploadForm} method="POST" onSubmit={handleFormSubmit}>
          <input type="file" name="image" />
          <input type="submit" value="Enviar" />
          {uploading && "Enviando..."}
        </form>

        {loading &&
          <div className={styles.screenWarning}>
            <div className={styles.emoji}>🤚</div>
            <div>Carregando...</div>
          </div>
        }

        {!loading && photos.length > 0 &&
          <div className={styles.photoList}>
            {photos.map((item, index) => (
              <PhotoItem
                key={index}
                url={item.url}
                name={item.name}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        }

        {!loading && photos.length === 0 &&
          <div className={styles.screenWarning}>
            <div className={styles.emoji}>😞</div>
            <div >Não há fotos cadastradas.</div>
          </div>
        }
      </div>
    </div>

  );
}

export default Photo;