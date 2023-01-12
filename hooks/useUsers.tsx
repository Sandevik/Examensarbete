import React, {useState, useEffect} from 'react'
import { IUserDetails } from '../types'

export default function useUsers() {
    const [users, setUsers] = useState<IUserDetails[]>([])
  useEffect(()=>{
    const fetchUsers = async () => {
        
    }
  },[])
  return (
    
  )
}
