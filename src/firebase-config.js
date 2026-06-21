import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAk0GjwWtwq03gWg5tNIFO4mzEbeBvgMSc",
    authDomain: "movie-app-e70fa.firebaseapp.com",
    projectId: "movie-app-e70fa",
    storageBucket: "movie-app-e70fa.firebasestorage.app",
    messagingSenderId: "21238505577",
    appId: "1:21238505577:web:5fd5bbe0248be689ee82f8",
    measurementId: "G-BXHLWRKB5Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);