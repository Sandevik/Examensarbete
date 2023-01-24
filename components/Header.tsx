import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { logOut } from "../Auth/controllers/logOut";
import useAuth from "../Auth/hooks/useAuth";
import { useLikes } from "../hooks/useLikes";
import {BsSuitHeart, BsSuitHeartFill} from "react-icons/Bs"
import MenuButton from "./MenuButton";
interface IHeaderProps{
  toggleMenu: () => void;
  menuState: boolean;
}

export default function Header({toggleMenu, menuState}: IHeaderProps) {
  const {user, loading} = useAuth();
  const {likesList} = useLikes()
  return (
    <HeaderWrapper>
      <Block>
      <Link href="/">DomainSnapper</Link>
      <nav>
        {!loading && <ul>
          <li><Link href="/domains">Domäner</Link></li>
          <li ><Link href="/liked" className="liked"> <div>{likesList.length}</div> {likesList.length ? <BsSuitHeartFill className="heart"/> : <BsSuitHeart className="heart"/>} </Link></li>
          {user?.userType === "admin" ? 
            <>
              <Link href="/accounts">Konton</Link>
            </>
            :
            ""
          }
          <li className="konto">
            {user? <Link href="/account" className="konto-btn">Mitt Konto</Link> : <Link href="/login">Logga in</Link>}
            {user? <button className="login" onClick={logOut}>Logga ut</button> : ""}
          </li>
        </ul>}
      </nav>
      <div className="menuBtn"><MenuButton onClick={()=>toggleMenu()} menuState={menuState}/></div>
      </Block>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  height: 4em;
  position:sticky;
  top:0;
  justify-content:space-between;
  background-color: var(--green);
  z-index: 100;

`;

const Block = styled.div`
  display: flex;
  align-items: center;
  justify-content:space-between;
  padding-inline: 2em;
  background-color: transparent;
  max-width:1440px;
  margin-inline:auto;
  height:100%;
  color:white;

  nav {
    ul{
      list-style-type: none;
      display:flex;
      gap:2em;
      li{
        cursor:pointer;
      }
    }
    
  }
  .menuBtn{
      display:none;
  }

  @media screen and (max-width: 768px){
    nav{
      display:none;
    }
    .menuBtn{
      display: flex;
      align-items:center;
      justify-content:center;
    }
  }

  .liked{
    font-size: 18px;
    display:flex;
    align-items:center;
    justify-content:center;
    gap:5px;
  
  }

  li:has(.liked){
    color: white;
    :hover svg{
      
      color: var(--green)
    }
  }
  
  .konto{
    .login{
      position:absolute;
      pointer-events:none;
      opacity:0;
      transform: translateY(-5px);
      transition: all .2s ease-in-out
    }
    :hover .login{
      opacity:1;
      pointer-events:all;
      transform:translateY(0px);
    }

    
  }

  .konto-btn:hover{
    color:red;
  }

`;