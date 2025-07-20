// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjoev6AEjyWpj0cPDIKq65V7NRFOP_ivA",
  authDomain: "coffeeup-2341e.firebaseapp.com",
  projectId: "coffeeup-2341e",
  storageBucket: "coffeeup-2341e.firebasestorage.app",
  messagingSenderId: "449705488632",
  appId: "1:449705488632:web:16a5cc5ea9f87e95ad4b0d",
  measurementId: "G-TDE4DPQX57",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
