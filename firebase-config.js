// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDaP755gsLV7SGlY0oGwRMTmSoX06dJ5Qo",
    authDomain: "multi-user-website.firebaseapp.com",
    projectId: "multi-user-website",
    storageBucket: "multi-user-website.appspot.com",
    messagingSenderId: "912203168936",
    appId: "1:912203168936:web:fc8d45a250a9d3f151d69d",
    measurementId: "G-J86Y3N0Q0D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);