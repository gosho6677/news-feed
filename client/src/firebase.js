import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    setPersistence,
    inMemoryPersistence
} from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyA0-0mrlnrUykFtaXey1uANgqbzHQwln2Y",
    authDomain: "news-feed-dc9fa.firebaseapp.com",
    projectId: "news-feed-dc9fa",
    storageBucket: "news-feed-dc9fa.appspot.com",
    messagingSenderId: "91185964160",
    appId: "1:91185964160:web:ef3ffa830617713e167265"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

const firebase = {
    login: signInWithEmailAndPassword,
    register: createUserWithEmailAndPassword,
    logout: signOut,
    setPersistence,
    inMemoryPersistence,
    updateProfile,
    app,
};

export default firebase;