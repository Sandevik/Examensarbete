import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import { changeUserType } from '../../controllers/changeUserType';

import { removeUser } from '../../controllers/removeUser';
import { IUserDetails } from '../../types'
import DeleteButton from '../DeleteButton';
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
    <Row>
        <p>{userDetails.email} </p>
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
        <div className="btn">
            <DeleteButton text={"Ta bort andvändare"} onClick={handleRemoveUser} />
        </div>
    </Row>
  )
}

const Row = styled.div`
    display:flex;
    flex-direction: row;
    height:5em;
    align-items:center;
    background-color: var(--blue);
    color:white;
    gap: 1em;
    padding:1em;
    margin-bottom: 1em;

    .btn{
        button{
            margin-top:0;
        }
    }
`;