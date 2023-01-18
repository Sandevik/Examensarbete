import React from 'react'
import styled from 'styled-components';
interface IButtonDetails{
    text: string;
    onClick?: () => void;
}

export default function DeleteButton({text, onClick}: IButtonDetails) {
  return (
    <Btn onClick={onClick}>{text}</Btn>
  )
}

const Btn = styled.button`
  margin-top: 1.5em;
  width: 100%;
  cursor: pointer;
  border: none;
  padding: 1em;
  background-color: var(--gray);
  color: black;
  border-radius: 10px;
  transition: background-color 0.2s ease-in-out, color 0.2s;
  :hover {
    background-color: var(--red);
    color: white;
  }
`;
