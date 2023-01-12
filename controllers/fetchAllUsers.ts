import { collection, getDocs, query } from "firebase/firestore"
import { db } from "../firebase"
import { IUserDetails } from "../types";

export const fetchAllUsers = async () => {
    const users: IUserDetails[] = []
    const q = query(collection(db, "users"));
    const usersSnaphot = await getDocs(q);
    usersSnaphot.forEach(doc => {
        const user: IUserDetails = {...doc.data()} as IUserDetails;
        users.push(user);
    })
    return users
}