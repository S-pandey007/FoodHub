// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhWePkBmrl3prwPv0w89JkEgNElnQ95wo",
  authDomain: "fir-app-4faed.firebaseapp.com",
  databaseURL: "https://fir-app-4faed-default-rtdb.firebaseio.com",
  projectId: "fir-app-4faed",
  storageBucket: "fir-app-4faed.firebasestorage.app",
  messagingSenderId: "470557632017",
  appId: "1:470557632017:web:d2e6f3b22072cc276ef3b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)

