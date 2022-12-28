import React from 'react'
import {signInWithEmailAndPassword} from "firebase/auth"
import { auth } from '../firebase'

export default function Login() {
    const login = () => {
        signInWithEmailAndPassword(auth, "simon@test.com", "test123")
    }
  return (
    <button onClick={login}>Login</button>
  )
}
