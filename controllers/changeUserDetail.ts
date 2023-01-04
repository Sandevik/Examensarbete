import { collection, doc } from "firebase/firestore";
import { db } from "../firebase";
import { IDomainValues, IUserDetails } from "../types";

export const changeUserDetail = (user: IUserDetails, detail: string, value: string | string[] | number | null | boolean) => {
    const userRef = doc(db, "users", user.uid)
    

}