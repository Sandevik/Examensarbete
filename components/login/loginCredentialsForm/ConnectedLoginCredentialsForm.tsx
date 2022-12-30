import { signInWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { auth } from '../../../firebase'
import LoginCredentialsForm from './LoginCredentialsForm'


export default function ConnectedLoginCredentialsForm() {
  const handleSubmit = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
    .then(onfulfill => {}, onReject => {})
  }
  return (
    <LoginCredentialsForm onSubmit={handleSubmit} />
  )
}
