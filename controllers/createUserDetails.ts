import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { IUserDetails } from "../types";


export const createUserDetails = (user: IUserDetails) => {    
    const userRef = doc(db, "users", user.uid)
    setDoc(userRef, user);
}