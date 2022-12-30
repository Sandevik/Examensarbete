import React from 'react'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { auth } from '../firebase'
import { signInWithGooglePopup } from '../Auth/controllers/signInWithGooglePopup'
import useAuth from '../Auth/hooks/useAuth'

export default function Login() {
    const {user} = useAuth()
    const login = () => {
        signInWithEmailAndPassword(auth, "simon@test.com", "test123")
    }
    const logOut = () => {
      signOut(auth);
    }
  return (
    <>
      {user? JSON.stringify(user) : "no uid"}
      <button onClick={signInWithGooglePopup}>Sign in with google</button>
      <button onClick={login}>Login</button>
      <button onClick={logOut}>LogOut</button>
    </>
  )
}
