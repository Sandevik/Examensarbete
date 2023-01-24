import React from 'react'
import {AiOutlineMenu, AiOutlineClose} from "react-icons/ai"
import styled from 'styled-components';
interface IMenuButtonProps{
    onClick: () => void
    menuState: boolean;
}

export default function MenuButton({onClick, menuState}: IMenuButtonProps) {
  return (
    <Button onClick={onClick}>{!menuState ? <AiOutlineMenu /> : <AiOutlineClose />}</Button>
  )
}

const Button = styled.button`
    border:none;
    background-color: transparent;
    font-size: 23px;
    color:white;
`;