// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhFryShO6AcmJWRdZ6XMrPAmGn2FMvSPs",
  authDomain: "bootcamp-final-ea411.firebaseapp.com",
  projectId: "bootcamp-final-ea411",
  storageBucket: "bootcamp-final-ea411.firebasestorage.app",
  messagingSenderId: "1018695489511",
  appId: "1:1018695489511:web:9d3d6215b8561a52c80f42",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
