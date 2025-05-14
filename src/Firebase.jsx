// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZNmFJIFq9FEP9khNl1-cUh2R585rNUsc",
    authDomain: "readriot-6a96f.firebaseapp.com",
    projectId: "readriot-6a96f",
    storageBucket: "readriot-6a96f.firebasestorage.app",
    messagingSenderId: "495935166561",
    appId: "1:495935166561:web:78110c764f9fce58773220",
    measurementId: "G-FV3YT8WJZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore -> je connectie
export const db = getFirestore(app);