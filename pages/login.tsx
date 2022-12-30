import React from 'react'
import { signOut } from "firebase/auth"
import { auth } from '../firebase'
import { signInWithGooglePopup } from '../Auth/controllers/signInWithGooglePopup'
import useAuth from '../Auth/hooks/useAuth'
import LoginCredentialsForm from '../components/login/loginCredentialsForm/LoginCredentialsForm'
import ConnectedLoginCredentialsForm from '../components/login/loginCredentialsForm/ConnectedLoginCredentialsForm'
import LoginProviderButton from '../components/login/LoginProviderButton'


export default function Login() {
    const {user} = useAuth()
    const logOut = () => {
      signOut(auth);
    }
  return (
    <>
      {user? JSON.stringify(user) : "no uid"}
        <LoginProviderButton text='Logga in med Google' image={""} onSubmit={signInWithGooglePopup}/>
        <ConnectedLoginCredentialsForm />
      <button onClick={logOut}>LogOut</button>
    </>
  )
}
