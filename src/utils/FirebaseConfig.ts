// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { collection, getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFoax6RN1ymvp_UQEERV7Htaa_GWjQUII",
  authDomain: "apni-meet.firebaseapp.com",
  projectId: "apni-meet",
  storageBucket: "apni-meet.appspot.com",
  messagingSenderId: "79067580645",
  appId: "1:79067580645:web:76061a7ea67999fd342c0c",
  measurementId: "G-2H99KVF07B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const userRef = collection( firebaseDB, "users");
export const meetingsRef =collection( firebaseDB, "meetings");