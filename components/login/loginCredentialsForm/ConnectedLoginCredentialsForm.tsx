import { signInWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { signInWithCustomEmailAndPassword } from '../../../Auth/controllers/signInWithCustomEmailAndPassword'
import { auth } from '../../../firebase'
import LoginCredentialsForm from './LoginCredentialsForm'


export default function ConnectedLoginCredentialsForm() {
  const handleSubmit = (email: string, password: string) => {
    signInWithCustomEmailAndPassword(email, password)
  }
  return (
    <LoginCredentialsForm onSubmit={handleSubmit} />
  )
}
