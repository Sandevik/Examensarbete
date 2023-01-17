import Link from 'next/link';
import React, { useState } from 'react'
import styled from 'styled-components';
import { signInWithGooglePopup } from '../../../Auth/controllers/signInWithGooglePopup';
import LoginProviderButton from '../LoginProviderButton';
interface ILoginFormProps{
    onSubmit?: (email:string, password: string) => void;
}
interface Credentials{
  email: string;
  password: string;
}

export default function LoginCredentialsForm({onSubmit}: ILoginFormProps) {
  const [credentials, setCredentials] = useState<Credentials>({email: "", password: ""})

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (typeof onSubmit === "function" && credentials.email && credentials.password){
      onSubmit(credentials.email, credentials.password)
    }else{
      alert("Lösenord eller email är inkorrekt")
    }
  }

  return (
    <Form>
      <div className='box'>
      <div>
      <h3>Logga in med Email</h3>
      <InputGroup>
      <label htmlFor="email">Email</label>
      <input type="text" name='email' placeholder='example@example.com' value={credentials?.email} onChange={(e)=>setCredentials({...credentials, email: e.target.value})}/>
      </InputGroup>
      <InputGroup>
      <label htmlFor="password">Lösenord</label>
      <input type="password" name='password' placeholder='**********' value={credentials?.password} onChange={(e)=>setCredentials({...credentials, password: e.target.value})}/>
      </InputGroup>
      </div>
      <LoginProviderButton text='Logga in med Google' image={"google"} onSubmit={signInWithGooglePopup}/>

      <div className='buttons'>
        <button className='loginBtn' onClick={(e)=>handleClick(e)}>Logga in</button>
        <div className="link">Inget konto? <LINK href="/create-account">Skapa ett!</LINK></div>
      </div>
      </div>
    </Form>
  )
}

const Form = styled.div`
  
  border-radius: 10px;
  background-color:rgba(255,255,255,.7);
  backdrop-filter: blur(10px);
  padding:1em;

  @media screen and (min-width: 420px){
    .box{
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    height: 20em;
    width:20em;
  }
  }
  @media screen and (max-width: 419px){
    .box{
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    height: 20em;
    width:16em;
  }
  }

  legend{
    text-align:center;
  }

  .buttons{
    display:flex;
    flex-direction:column;
    
  }

  .loginBtn{
    cursor:pointer;
    border:none;
    padding:1em;
    background-color: var(--gray);
    color: black;
    border-radius: 10px;
    transition: background-color .2s ease-in-out, color .2s;
    :hover{
      background-color: var(--green);
      color: white;
    }
  }

  .link{
    font-size: 14px;
    margin-top: 5px;
    margin-inline:auto;
  }

  h3{
    text-align:center;
  }
`;

const InputGroup = styled.div`
  @media screen and (min-width: 420px){
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2em;
    margin-top: 1em;

    input {
      height: 2em;
      border-radius: 5px;
      border: none;
      padding-inline: 10px;
    }
  }
  @media screen and (max-width: 419px){
    display:flex;
    flex-direction:column;
    margin-bottom:1em;
    input {
      margin-top:.5em;
      height: 2em;
      border-radius: 5px;
      border: none;
      padding-inline: 10px;
    }
  }
`;

const LINK = styled(Link)`
  color: var(--green);
  font-size: 14px;
`;