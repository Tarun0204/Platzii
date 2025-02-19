// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEtQv6hm21GjYjeKHPgDzyM2ihOPy0tEM",
  authDomain: "platzi-44a52.firebaseapp.com",
  projectId: "platzi-44a52",
  storageBucket: "platzi-44a52.firebasestorage.app",
  messagingSenderId: "714234691930",
  appId: "1:714234691930:web:8c99ae5ffbca9846e6b363",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); 
export default app;
