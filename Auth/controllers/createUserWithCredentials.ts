import { createUserWithEmailAndPassword } from "firebase/auth"
import { createUserDetails } from "../../controllers/createUserDetails"
import { auth } from "../../firebase"
import { IUserDetails } from "../../types"

export const createUserWithCredentials = async (name: string, email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password).then( user => {
        const newUser: IUserDetails = {uid: user.user.uid, displayName: user.user.displayName, photoURL: user.user.photoURL, email: user.user.email, lastSignInTime: user.user.metadata.lastSignInTime ? user.user.metadata.lastSignInTime : "" , creationTime: user.user.metadata.creationTime ? user.user.metadata.creationTime : "", name, phoneNumber: user.user.phoneNumber, subscriptionType: "standard", userType: "user"}
        createUserDetails(newUser);
    }, error => console.log(error)
    )
}