import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const fetchUserDetails = async(uid: string) => {
    const userRef = doc(db, "users", uid)
    const details = await getDoc(userRef)
    .then(userSnap => (userSnap.data()))
    return details;
}