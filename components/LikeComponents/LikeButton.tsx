import React from 'react'
import styled from 'styled-components';
import { useLikes } from '../../hooks/useLikes'
import { IDomainValues } from '../../types'
import LikeIcon from './LikeIcon'
interface IButtonProps{
    domain: IDomainValues;
    isLiked: boolean;
}

export default function LikeButton({domain, isLiked}: IButtonProps) {
    const {toggleLike} = useLikes()
  return (
    <Btn onClick={()=>toggleLike(domain)}><LikeIcon state={isLiked}/></Btn>
  )
}

const Btn = styled.button`
    border:none;
    background-color:transparent;
    font-size: 1em;
    cursor:pointer;
`;
