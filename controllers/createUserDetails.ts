import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { IUserDetails } from "../types";


export const createUserDetails = async (user: IUserDetails) => {
    const userRef = doc(db, "users", user.uid)
    await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        name: user.name,
        subscriptionType: user.subscriptionType,
        userType: user.userType
    });
}