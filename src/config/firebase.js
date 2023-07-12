// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

    apiKey: "AIzaSyBtplFKmOz2Otkhjq2kd4MsrNDEUiSzrKk",

    authDomain: "e-commerce-proj-ba753.firebaseapp.com",

    projectId: "e-commerce-proj-ba753",

    storageBucket: "e-commerce-proj-ba753.appspot.com",

    messagingSenderId: "528376703259",

    appId: "1:528376703259:web:0174750b1d8d0bbc35cbbe",

    measurementId: "G-80W12YPFX7"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);