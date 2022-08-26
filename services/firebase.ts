import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCaxBHeHfjlOSosRAf0LES_tnYzWK8Fz40",
  authDomain: "blog-38d30.firebaseapp.com",
  projectId: "blog-38d30",
  storageBucket: "blog-38d30.appspot.com",
  messagingSenderId: "132886310033",
  appId: "1:132886310033:web:343e9f6c614e5ec1a2a330"
};

const firebaseApp = initializeApp(firebaseConfig)

export const storage = getStorage(firebaseApp)