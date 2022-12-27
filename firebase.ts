import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC3gmxC_gHVtC-zc7WzaWjxK7JylLZgNBU",
  authDomain: "examensarbete-a4732.firebaseapp.com",
  projectId: "examensarbete-a4732",
  storageBucket: "examensarbete-a4732.appspot.com",
  messagingSenderId: "198327788774",
  appId: "1:198327788774:web:72c09aee6db63cfc908727",
  measurementId: "G-EYCF856E3F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
