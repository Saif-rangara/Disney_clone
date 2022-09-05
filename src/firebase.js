import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore/lite'
import { getAuth, GoogleAuthProvider } from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyCQSOAHzytj150WXOgnC2UbYUsHm2-YR8k",
    authDomain: "disneyplus-clone-1bff9.firebaseapp.com",
    projectId: "disneyplus-clone-1bff9",
    storageBucket: "disneyplusclone-1bff9.appspot.com",
    messagingSenderId: "217824238711",
    appId: "1:217824238711:web:97b276fc742bab8e0dfa72",
    measurementId: "G-4V7KN3TEC4"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const storage = getStorage(app);

  export {auth, provider, storage}
  export default db; 