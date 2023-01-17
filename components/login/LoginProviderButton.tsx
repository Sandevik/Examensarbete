import React from 'react'
import {FcGoogle} from "react-icons/fc"
import styled from 'styled-components';
interface IButtonProps{
    image?: "google" | "twitter";
    text: string;
    onSubmit: () => void;
}

export default function LoginProviderButton({image, text, onSubmit}: IButtonProps) {
  

  return (
    <Button onClick={onSubmit}>{image === "google" ? <FcGoogle /> : ""}{text}</Button>
  )
}

const Button = styled.button`
  border:none;
  padding:1em;
  display:flex;
  justify-content:space-evenly;
  align-items:center;
  cursor:pointer;
  background-color:white;
  border-radius:10px;
  transition: background-color .15s ease-in-out;

  svg{
    width: 20px;
    height: 20px;
  }

  :hover{
    background-color: var(--gray);
  }

`;