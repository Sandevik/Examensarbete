import { useRouter } from 'next/router';
import React, {useEffect} from 'react'
import styled from 'styled-components'
import useAuth from '../Auth/hooks/useAuth'
import ConnectedCreateAccountForm from '../components/form/createAccount/ConnectedCreateAccountForm';
import CreateAccountForm from '../components/form/createAccount/CreateAccountForm'

export default function createAccount() {
    const {user, loading: userLoading} = useAuth();
    const router = useRouter()
    useEffect(()=>{
        if (!userLoading && user){
            router.push("/");
        }
    },[user])
  return (
    <Screen>
        <ConnectedCreateAccountForm />
    </Screen>
    )
}

const Screen = styled.div`
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