// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxVZwyaDeyNsToCL_famWyyyXPIkuoGNA",
  authDomain: "bakexpert-9818d.firebaseapp.com",
  projectId: "bakexpert-9818d",
  storageBucket: "bakexpert-9818d.firebasestorage.app",
  messagingSenderId: "647561989598",
  appId: "1:647561989598:web:99621098bce64dd72de14f",
  measurementId: "G-TK9XHFJVQG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
