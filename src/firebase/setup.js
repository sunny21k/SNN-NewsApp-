import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA8tQpg0bKdYKpS6oF73LYbJ5Sl8lJRKEk",
  authDomain: "snn-news-f91cf.firebaseapp.com",
  projectId: "snn-news-f91cf",
  storageBucket: "snn-news-f91cf.appspot.com",
  messagingSenderId: "383912623425",
  appId: "1:383912623425:web:3b64621924f56a0b4bb5c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider(app)
export const database  =getFirestore(app)