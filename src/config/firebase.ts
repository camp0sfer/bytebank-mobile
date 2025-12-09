/**
 * Configuração Firebase - ByteBank Mobile
 * 
 * ✅ Configuração segura com variáveis de ambiente
 * ✅ Compatível com Hermes JavaScript Engine
 * ✅ Compatível com React Native
 */

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { initializeAuth, getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuração Firebase usando variáveis de ambiente
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Validar credenciais obrigatórias (apenas em desenvolvimento)
if (__DEV__) {
  Object.entries(firebaseConfig).forEach(([key, value]) => {
    if (!value || value === `your-${key.toLowerCase()}`) {
      console.warn(`⚠️ Firebase: Variável ${key} não configurada corretamente`);
    }
  });
}

// Inicializar Firebase App (evitar múltiplas inicializações)
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Inicializar Auth com persistência React Native
let auth: Auth;
try {
  // Importar dinamicamente o React Native Persistence
  const { getReactNativePersistence } = require('firebase/auth/react-native');
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} catch (error: any) {
  // Se já foi inicializado ou módulo não disponível, usar getAuth
  if (error.code === 'auth/already-initialized' || error.code === 'MODULE_NOT_FOUND') {
    auth = getAuth(app);
  } else {
    console.warn('Firebase Auth initialization warning:', error.message);
    auth = getAuth(app);
  }
}

// Inicializar serviços Firebase
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

export { auth, db, storage };
export default app;
