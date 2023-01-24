import React from 'react'
import useCheckLike from '../hooks/useCheckLike'
import { IDomainValues } from '../types';
import LikeButton from './LikeComponents/LikeButton'
interface LikeProps{
    domain: IDomainValues;
}

export default function Like({domain}: LikeProps) {
    const {isLiked} = useCheckLike(domain);
    
  return (
    <div><LikeButton isLiked={isLiked} domain={domain}/> {domain.domainUrl}</div>
  )
}
