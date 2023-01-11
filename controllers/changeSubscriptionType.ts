import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { IUserDetails } from "../types";
import { fetchUserDetailsByUid } from "./fetchUserDetailsByUid";


export const changeSubscriptionType = async(user: IUserDetails, value: "premium" | "standard") => {
    try {
        const userRef = doc(db, "users", user.uid)
        const newUser: IUserDetails = {...user, subscriptionType: value}
        await setDoc(userRef, newUser)
    } catch (error) {
        console.log(error)
    }

}