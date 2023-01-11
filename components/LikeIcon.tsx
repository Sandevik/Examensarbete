import React from 'react'
import {BsSuitHeartFill, BsSuitHeart} from "react-icons/Bs"
import { IDomainValues } from '../types'

interface IButtonProps{
    state: boolean
}

export default function LikeIcon({state}: IButtonProps) {
  return (
    <>
        {state ? 
        <BsSuitHeartFill color={"#c60707"} />
        :
        <BsSuitHeart color={"#000000"}/>
        }
    </>
  )
}
