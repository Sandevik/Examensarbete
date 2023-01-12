import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase"


export const signInWithCustomEmailAndPassword = (email: string, password: string) =>{
    signInWithEmailAndPassword(auth, email, password)
}