// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7PN9T8NKhjoSCrTXXnrI77H3CdkZ3ADA",
  authDomain: "foodrush-website.firebaseapp.com",
  projectId: "foodrush-website",
  storageBucket: "foodrush-website.firebasestorage.app",
  messagingSenderId: "725644807206",
  appId: "1:725644807206:web:9bda26d016fe18e3586ae7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;