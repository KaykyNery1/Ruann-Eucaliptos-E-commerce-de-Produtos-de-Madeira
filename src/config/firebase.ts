import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDmFrUkWrdMc2A5rHpLxyy4DGXj_TyUWxY",
  authDomain: "ruann-euc.firebaseapp.com",
  projectId: "ruann-euc",
  storageBucket: "ruann-euc.firebasestorage.app",
  messagingSenderId: "536420336214",
  appId: "1:536420336214:web:147fda7b97137d0731f1f7",
  measurementId: "G-TE0C1NCWP0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Admin email configuration
export const ADMIN_EMAIL = 'ruanneucaliptos@gmail.com';

// Debug para verificar se o email está correto
console.log('Admin email configurado:', ADMIN_EMAIL);

export default app;