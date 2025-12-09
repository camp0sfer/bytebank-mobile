import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAeOkgwrFdihEgbmc3oE_Hy4dYhsx4gF6s",
  authDomain: "bytebank-mobile-df718.firebaseapp.com",
  projectId: "bytebank-mobile-df718",
  storageBucket: "bytebank-mobile-df718.firebasestorage.app",
  messagingSenderId: "80052404276",
  appId: "1:80052404276:web:03c05a1d8802c148138a61",
  measurementId: "G-L5BE8L885P"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
