import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const fetchUserDetailsByUid = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  const user = userSnap.data();
  return user;
};
