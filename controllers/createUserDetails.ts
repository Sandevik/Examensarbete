import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { IUserDetails } from "../types";


export const createUserDetails = (user: IUserDetails) => {    
    const userRef = doc(db, "users", user.uid)
    setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        name: user.name,
        subscriptionType: user.subscriptionType,
        userType: user.userType,
    });
}