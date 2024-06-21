// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCb0mIHTUnRsit3vKaYLWFLLkVi5pEot7k",
  authDomain: "medical-form-9281b.firebaseapp.com",
  projectId: "medical-form-9281b",
  storageBucket: "medical-form-9281b.appspot.com",
  messagingSenderId: "99999717833",
  appId: "1:99999717833:web:3b2ac5e3f85bb6b747b018"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);