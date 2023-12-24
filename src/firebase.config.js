// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDAdL9QHLqI6uNseJZGNHFVcq5f4otob-w",
    authDomain: "user-email-password-auth-27659.firebaseapp.com",
    projectId: "user-email-password-auth-27659",
    storageBucket: "user-email-password-auth-27659.appspot.com",
    messagingSenderId: "926597159405",
    appId: "1:926597159405:web:cfc7eab4ba0b9537932fe4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth