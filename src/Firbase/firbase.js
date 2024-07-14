
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "shopsphere-d07bd.firebaseapp.com",
  projectId: "shopsphere-d07bd",
  storageBucket: "shopsphere-d07bd.appspot.com",
  messagingSenderId: "618790070648",
  appId: "1:618790070648:web:f6232f96edb56ec7e6008d",
  measurementId: "G-FL4F9T7HDD"
};

// Initializing Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth()

export const googleProvider = new GoogleAuthProvider();


export {auth ,app}
