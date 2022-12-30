import React, { useState } from 'react'
interface ILoginFormProps{
    onSubmit?: (email:string, password: string) => void;
}
interface Credentials{
  email: string;
  password: string;
}

export default function LoginCredentialsForm({onSubmit}: ILoginFormProps) {
  const [credentials, setCredentials] = useState<Credentials>({email: "", password: ""})

  const handleClick = () => {
    if (typeof onSubmit === "function"){
      onSubmit(credentials.email, credentials.password)
    }else{
      alert("Log in test")
    }
  }

  return (
    <fieldset>
      <legend>Logga in med Credentials</legend>
      <label htmlFor="email">Email</label>
      <input type="text" name='email' placeholder='example@example.com' value={credentials?.email} onChange={(e)=>setCredentials({...credentials, email: e.target.value})}/>
      <label htmlFor="password">Password</label>
      <input type="password" name='password' placeholder='**********' value={credentials?.password} onChange={(e)=>setCredentials({...credentials, password: e.target.value})}/>
      <button onClick={handleClick}>Logga in</button>
    </fieldset>
  )
}
