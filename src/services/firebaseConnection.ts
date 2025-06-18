import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyBip1zP63odZR77BRnFIGEX6-ceVgfKkDI",
  authDomain: "linktree-a5ad9.firebaseapp.com",
  projectId: "linktree-a5ad9",
  storageBucket: "linktree-a5ad9.firebasestorage.app",
  messagingSenderId: "1063291594871",
  appId: "1:1063291594871:web:fa3ee701e19797cefb3e72"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db};