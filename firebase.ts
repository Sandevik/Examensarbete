import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

/* 
Riktig

const firebaseConfig = {
  apiKey: "AIzaSyC3gmxC_gHVtC-zc7WzaWjxK7JylLZgNBU",
  authDomain: "examensarbete-a4732.firebaseapp.com",
  projectId: "examensarbete-a4732",
  storageBucket: "examensarbete-a4732.appspot.com",
  messagingSenderId: "198327788774",
  appId: "1:198327788774:web:72c09aee6db63cfc908727",
  measurementId: "G-EYCF856E3F"
};
*/

//   vv test db vv   //
const firebaseConfig = {
  apiKey: "AIzaSyDEneGm1OhMkteQdt9XVawkt5WJIGbdmhQ",
  authDomain: "testdb-d6b0d.firebaseapp.com",
  projectId: "testdb-d6b0d",
  storageBucket: "testdb-d6b0d.appspot.com",
  messagingSenderId: "371963720804",
  appId: "1:371963720804:web:33898daa09ebb0ea2b5b71"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
