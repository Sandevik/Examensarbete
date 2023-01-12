import { deleteUser } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { IUserDetails } from "../types";


export const removeUser = async (user: IUserDetails) => {
    const uid = user.uid;
    const userRef = doc(db, "users", user.uid)
    await deleteDoc(userRef);

}