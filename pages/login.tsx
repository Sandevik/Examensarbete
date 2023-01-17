import React from 'react'
import { signInWithGooglePopup } from '../Auth/controllers/signInWithGooglePopup'
import useAuth from '../Auth/hooks/useAuth'
import LoginCredentialsForm from '../components/login/loginCredentialsForm/LoginCredentialsForm'
import ConnectedLoginCredentialsForm from '../components/login/loginCredentialsForm/ConnectedLoginCredentialsForm'
import LoginProviderButton from '../components/login/LoginProviderButton'
import { useRouter } from 'next/router'
import styled from 'styled-components'


export default function Login() {
    const {user} = useAuth()
    const router = useRouter()
    if (user){
      router.back();
    }
  return (
    <LoginScreen>
        <ConnectedLoginCredentialsForm />
    </LoginScreen>
  )
}

const LoginScreen = styled.div`
  height: calc(100vh - 4em);
  display:grid;
  place-items:center;
  background-color:#99ffe7;
  background-image:
  radial-gradient(at 40% 65%, hsla(209,43%,85%,1) 0px, transparent 50%),
  radial-gradient(at 1% 9%, hsla(177,97%,49%,1) 0px, transparent 50%),
  radial-gradient(at 28% 35%, hsla(169,100%,34%,0.88) 0px, transparent 50%),
  radial-gradient(at 49% 0%, hsla(150,90%,75%,1) 0px, transparent 50%);
`;