import React, {useEffect, useState, useContext} from 'react'
import { IDomainValues } from '../types';
import { useLikes } from './useLikes';

export default function useCheckLike(domain: IDomainValues | undefined, loading?: boolean) {
  const {likesList} = useLikes()
  
  const [isLiked, setIsLiked] = useState<boolean>(false)
  useEffect(()=>{
    if (!loading && domain !== undefined){
      let exists = false;
      likesList.forEach(like => {
      if (like.id === domain.id){
        exists = true;
      }})
      exists ? setIsLiked(true) : setIsLiked(false)
    }
  },[likesList, loading])
  return {isLiked}
}