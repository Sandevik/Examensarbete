import { signInWithEmailAndPassword } from "firebase/auth"
import { createUserDetails } from "../../controllers/createUserDetails"
import { fetchUserDetailsByUid } from "../../controllers/fetchUserDetailsByUid"
import { auth } from "../../firebase"
import { IUserDetails } from "../../types"


export const signInWithCustomEmailAndPassword = (email: string, password: string) =>{
    signInWithEmailAndPassword(auth, email, password).then( async (user) => {
        const dbUser = await fetchUserDetailsByUid(user.user.uid)    
        if (!dbUser){
            const newUser: IUserDetails = {name: user.user.displayName, displayName: user.user.displayName, uid: user.user.uid, photoURL: user.user.photoURL, phoneNumber: user.user.phoneNumber, lastSignInTime: user.user.metadata.lastSignInTime ? user.user.metadata.lastSignInTime : "", creationTime: user.user.metadata.creationTime ? user.user.metadata.creationTime : "", email: user.user.email} 
            createUserDetails(newUser)
        }
    })
}