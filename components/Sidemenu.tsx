import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { logOut } from "../Auth/controllers/logOut";
import useAuth from "../Auth/hooks/useAuth";
import Button from "./Button";
import Loading from "./Loading";
interface ISidemenuProps {
  menuState: boolean;
  closeMenu: () => void;
}
interface TagProps{
    menuState: boolean;
}


export default function Sidemenu({ menuState, closeMenu }: ISidemenuProps) {
    const {user, loading} = useAuth()
  return (
    <SideMenu menuState={menuState}>
      {loading ? <Loading/> : 
      <>
      <ul>
        <li><Link href="/domains" onClick={()=>closeMenu()}>Domäner</Link></li>
        <li><Link href="/liked" onClick={()=>closeMenu()}>Gillade</Link></li>
        {user?.uid ? <li><Link href="/account" onClick={()=>closeMenu()}>Mitt konto</Link></li> : <li><Link href="/login">Logga in</Link></li>}
        {user?.userType === "admin" && 
        <>
            <li><Link href="/accounts" onClick={()=>closeMenu()}>Konton</Link></li>
            <li><Link href="/preview" onClick={()=>closeMenu()}>Preview</Link></li>
        </>
        }
        
      </ul>
      {user?.uid ? <Button onClick={() => {logOut(); closeMenu()}} text={"Logga ut"}/> : <div></div>}
      </>
      }
    </SideMenu>
  );
}

const SideMenu = styled.div`
  @media screen and (max-width: 768px) {
    position: fixed;
    height: calc(100vh - 4em);
    background-color: var(--green);
    color: white;
    z-index: 10;
    width: 100vw;
    transform: translate(
      ${(p: TagProps) => (p.menuState ? "0px" : "100vw")}
    );
    opacity: ${(p: TagProps) => (p.menuState ? 1 : 0)};
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;

    display: flex;
    flex-direction:column;
    justify-content:space-between;
    padding: 1em;
   

    ul{
        display:flex;
        flex-grow:1;
        justify-content:center;
        flex-direction:column;
        align-items:center;
        gap:2em;
        list-style-type:none;
        margin:0px;
        padding:0px;

        li{
            width: 10em;
            text-align:center;
            padding:10px;
            cursor:pointer;
        }
    }
  }
  display: none;
`;
