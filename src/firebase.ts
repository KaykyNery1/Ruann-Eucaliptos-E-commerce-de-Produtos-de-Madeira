// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Sua configuração do Firebase (copie do console)
const firebaseConfig = {
  apiKey: "AIzaSyDfICHDvsembV5MWDNcQ1sBLh8Z5wnjwf0",
  authDomain: "ruann-eucaliptos-3d605.firebaseapp.com",
  projectId: "ruann-eucaliptos-3d605",
  storageBucket: "ruann-eucaliptos-3d605.appspot.com",
  messagingSenderId: "539829166736",
  appId: "1:539829166736:web:748b14b536faf03e7aae15"
};

// Inicializa o app
const app = initializeApp(firebaseConfig);

// Inicializa o Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
