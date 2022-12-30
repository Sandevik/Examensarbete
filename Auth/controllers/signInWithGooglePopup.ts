import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { createUserDetails } from "../../controllers/createUserDetails";
import { fetchUserDetailsByUid } from "../../controllers/fetchUserDetailsByUid";
import { auth } from '../../firebase'
import { IUserDetails } from "../../types";

export const signInWithGooglePopup = async () => {
    auth.languageCode = "sv"
    const provider = new GoogleAuthProvider();
    const response = await signInWithPopup(auth, provider)
    .then(res => {
        return res.user;
    })
    .catch(error => {
        return error
    })
    
    
    if (response.uid){
        const dbUser = await fetchUserDetailsByUid(response.uid)
        if (!dbUser){
            const newUser: IUserDetails = {
               uid: response.uid,
               name: response.displayName,
               photoURL: response.photoURL,
               email: response.email,
               lastSignInTime: response.lastSignInTime,
               creationTime: response.creationTime,
               displayName: response.displayName,
               subscriptionType: "standard",
               userType: "user",
               phoneNumber: response.phoneNumber
            }
            createUserDetails(newUser)
        }
    }

}