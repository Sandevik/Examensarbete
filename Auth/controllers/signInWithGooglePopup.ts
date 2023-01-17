import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { createUserDetails } from "../../controllers/createUserDetails";
import { fetchUserDetailsByUid } from "../../controllers/fetchUserDetailsByUid";
import { auth } from '../../firebase'
import { IUserDetails } from "../../types";

export const signInWithGooglePopup = async () => {
    auth.languageCode = "sv"
    const provider = new GoogleAuthProvider();
   await signInWithPopup(auth, provider)
    .then( async (res) => {
        const dbUser = await fetchUserDetailsByUid(res.user.uid)
        if (!dbUser){
            const newUser: IUserDetails = {
               uid: res.user.uid,
               name: res.user.displayName,
               photoURL: res.user.photoURL,
               email: res.user.email,
               lastSignInTime: res.user.metadata.lastSignInTime ? res.user.metadata.lastSignInTime : "" ,
               creationTime: res.user.metadata.creationTime ? res.user.metadata.creationTime : "" ,
               displayName: res.user.displayName,
               subscriptionType: "standard",
               userType: "user",
               phoneNumber: res.user.phoneNumber
            }
            createUserDetails(newUser)
        }
    })
    .catch(error => {
        return error
    })
    
    
    

}