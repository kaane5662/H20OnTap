import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuxmzhFKU2FJTLproshqAwqsDDoGxhuOA",
  authDomain: "h20ntap.firebaseapp.com",
  projectId: "h20ntap",
  storageBucket: "h20ntap.appspot.com",
  messagingSenderId: "61552478448",
  appId: "1:61552478448:web:6db886142d0c471fef9a35",
  measurementId: "G-EYDJX6PNGZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
module.exports = {db,auth}
