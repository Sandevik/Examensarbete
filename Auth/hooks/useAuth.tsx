import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import type { IUserDetails } from "../../types";
import { fetchUserDetailsByUid } from "../../controllers/fetchUserDetailsByUid";

export default function useAuth() {
  const [currentUser, setCurrentUser] = useState<IUserDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unSub = () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setLoading(true);
          const details = await fetchUserDetailsByUid(user.uid);
          const changedUser: IUserDetails = {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            email: user.email,
            lastSignInTime: user.metadata.lastSignInTime
              ? user.metadata.lastSignInTime
              : null,
            creationTime: user.metadata.creationTime
              ? user.metadata.creationTime
              : null,
            name: details?.name ? details.name : null,
            subscriptionType: details?.subscriptionType,
            userType: details?.userType ? details.userType : "user",
            phoneNumber: details?.phoneNumber ? details.phoneNumber : null,
            
          };
          setCurrentUser(changedUser);
          setLoading(false);
        } else {
          setCurrentUser(null);
          setLoading(false)
        }
      });
    };
    return () => unSub();
  }, []);

  return { user: currentUser, loading };
}
