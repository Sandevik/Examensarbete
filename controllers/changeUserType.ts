import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { IUserDetails } from "../types";

export const changeUserType = (user: IUserDetails, value: "admin" | "user" | undefined) => {
    const userRef = doc(db, "users", user.uid)
    if (value !== undefined){
        updateDoc(userRef, {...user, userType: value});
    }
}