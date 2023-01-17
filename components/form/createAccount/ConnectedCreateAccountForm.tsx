import React from 'react'
import { createUserWithCredentials } from '../../../Auth/controllers/createUserWithCredentials'
import CreateAccountForm from './CreateAccountForm'


export default function ConnectedCreateAccountForm() {
  const onSubmit = (name: string, email: string, password: string) => {
    createUserWithCredentials(name, email, password)
  }
  
    return (
    <CreateAccountForm onSubmit={onSubmit}/>
  )
}
