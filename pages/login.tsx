import React from 'react'
import { signInWithGooglePopup } from '../Auth/controllers/signInWithGooglePopup'
import useAuth from '../Auth/hooks/useAuth'
import LoginCredentialsForm from '../components/login/loginCredentialsForm/LoginCredentialsForm'
import ConnectedLoginCredentialsForm from '../components/login/loginCredentialsForm/ConnectedLoginCredentialsForm'
import LoginProviderButton from '../components/login/LoginProviderButton'
import { useRouter } from 'next/router'


export default function Login() {
    const {user} = useAuth()
    const router = useRouter()
    if (user){
      router.back();
    }
  return (
    <>
        <LoginProviderButton text='Logga in med Google' image={""} onSubmit={signInWithGooglePopup}/>
        <ConnectedLoginCredentialsForm />
    </>
  )
}
