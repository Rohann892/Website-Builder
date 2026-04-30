// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "apexcraft-c2d98.firebaseapp.com",
    projectId: "apexcraft-c2d98",
    storageBucket: "apexcraft-c2d98.firebasestorage.app",
    messagingSenderId: "241257400890",
    appId: "1:241257400890:web:67613330e58f23bc118303",
    measurementId: "G-3DW0YL2WT8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
