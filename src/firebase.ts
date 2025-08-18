// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfICHDvsembV5MWDNcQ1sBLh8Z5wnjwf0",
  authDomain: "ruann-eucaliptos-3d605.firebaseapp.com",
  projectId: "ruann-eucaliptos-3d605",
  storageBucket: "ruann-eucaliptos-3d605.firebasestorage.app",
  messagingSenderId: "539829166736",
  appId: "1:539829166736:web:748b14b536faf03e7aae15"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
