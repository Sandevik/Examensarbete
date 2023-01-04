import React, {useEffect, useState} from 'react'
import useAuth from '../Auth/hooks/useAuth'
import { IDomainValues } from '../types'


export default function useLikes() {
    const [likesList, setLikesList] = useState<IDomainValues[]>([])

    const toggleLike = (domain: IDomainValues) => {
        likesList.includes(domain) ? setLikesList(likesList.filter(like => like.id !== domain.id)) : setLikesList([...likesList, domain])
    }

    useEffect(()=>{
        console.log(likesList)
    }, [likesList])
    
    return {likesList, toggleLike}
}
