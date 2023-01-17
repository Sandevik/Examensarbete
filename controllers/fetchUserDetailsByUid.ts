import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { IUserDetails } from "../types";

export const fetchUserDetailsByUid = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();
  if (userData){
    const user: IUserDetails = {
      uid: await userData?.uid,
      displayName: await userData?.displayName,
      photoURL: await userData?.photoURL,
      email: await userData?.email,
      name: await userData?.name,
      subscriptionType: await userData?.subscriptionType,
      userType: await userData?.userType,
      phoneNumber: await userData?.phoneNumber,
      liked: await userData?.liked,
      creationTime: await userData?.creationTime ? userData?.creationTime : null,
      lastSignInTime: await userData?.lastSignInTime ? userData?.lastSignInTime : null
    }
    return user;
  }else{
    return undefined
  }
};
