// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Configuração do seu Firebase (pegue do seu projeto Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyDfICHDvsembV5MWDNcQ1sBLh8Z5wnjwf0",
  authDomain: "ruann-eucaliptos-3d605.firebaseapp.com",
  projectId: "ruann-eucaliptos-3d605",
  storageBucket: "ruann-eucaliptos-3d605.appspot.com",
  messagingSenderId: "539829166736",
  appId: "1:539829166736:web:748b14b536faf03e7aae15",
  measurementId: "G-EBB48BKKDD"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Autenticação
const auth = getAuth(app);

// Provider do Google
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
