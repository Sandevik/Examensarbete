import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useAuth from "../Auth/hooks/useAuth";
import UserRow from "../components/users/UserRow";
import { fetchAllUsers } from "../controllers/fetchAllUsers";
import { IUserDetails } from "../types";

export default function accounts() {
  const { user, loading } = useAuth();
  const router = useRouter()
  !loading && user?.userType !== "admin" && router.back()
  
  const [users, setUsers] = useState<IUserDetails[]>([])
  useEffect(()=>{
    const fetchUsers = async () => {
        const data = await fetchAllUsers();
        setUsers(data)
    }
    fetchUsers()
  },[])
  
  return (
    <Block>
        {!loading && user?.userType === "admin" &&
        <div>
            <div className="amount">Antal användare: {users.length}</div>
            {users.map(user => <UserRow key={user.uid} user={user}/>)}
        </div>
        }
    </Block>
  );
}

const Block = styled.div`
  
  .amount{
    margin-block:2em;
    text-align:center;
  }
`;