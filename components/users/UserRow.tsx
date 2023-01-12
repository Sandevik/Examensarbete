import React, {useEffect, useState} from 'react'
import { changeUserType } from '../../controllers/changeUserType';

import { removeUser } from '../../controllers/removeUser';
import { IUserDetails } from '../../types'
interface IUserRowProps{
    user: IUserDetails;
}

export default function UserRow({user}: IUserRowProps) {
    const [userDetails, setUserDetails] = useState<IUserDetails>(user)

    const handleUserTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === "admin"){
            setUserDetails({...userDetails, userType: "admin"})
        }else{
            setUserDetails({...userDetails, userType: "user"})
        }
        
    }

    const handleRemoveUser = () => {
        const answer = prompt("Skriv DELETE för att ta bort konto")
        if (answer === "DELETE"){
            removeUser(user)
        }
    }

    const handleChangeUserTypeClick = () => {
        changeUserType(user, userDetails.userType)
    }


  return (
    <div>
        <p>Email: {userDetails.email} </p>
        User type: 
        <select name="userType" onChange={(e)=>handleUserTypeChange(e)}>
            {userDetails.userType === "admin" ? 
                <>
                <option value="admin">admin</option>
                <option value="user">user</option>
                </>
                :
                <>
                <option value="user" selected>user</option>
                <option value="admin">admin</option>
                </>
            }
        </select>
        {user != userDetails && <button onClick={handleChangeUserTypeClick}>Ändra</button>}
        <br />
        <button onClick={handleRemoveUser}>Remove user</button>
    </div>
  )
}
