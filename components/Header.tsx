import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { logOut } from "../Auth/controllers/logOut";
import useAuth from "../Auth/hooks/useAuth";

export default function Header() {
  const {user} = useAuth();
  return (
    <HeaderWrapper>
      <Link href="/">Logo</Link>
      <nav>
        <ul>
          <li><Link href="/domains">Domäner</Link></li>
          <li><Link href="/liked">Gillade</Link></li>
          {user?.userType === "admin" ? 
            <>
              <li>Konton</li>
              <li>Preview</li>
            </>
            :
            ""
          }
          <li className="konto">
            {user? <div className="konto-btn">Mitt Konto</div> : <Link href="/login">Logga in</Link>}
            {user? <button className="login" onClick={logOut}>Logga ut</button> : ""}
          </li>
        </ul>
      </nav>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  height: 4em;
  display: flex;
  align-items: center;
  position:sticky;
  top:0;
  justify-content:space-between;
  padding-inline: 2em;
  background-color: transparent;
  max-width:1440px;
  margin-inline:auto;
  background-color:white;
  

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
