import React, { useContext, useState } from 'react'
import { IDomainValues } from '../types';

interface LikeContextProps{
    children: React.ReactNode;
}

export const LikeContext = React.createContext<IDomainValues[]>([])
export const LikeContextUpdate = React.createContext<(domain: IDomainValues)=>void>(()=>{})

export default function LikeContextProvider({children}: LikeContextProps) {
    const [likesList, setLikesList] = useState<IDomainValues[]>([])

    const toggleLike = (domain: IDomainValues) => {
        let exists: boolean = false
        likesList.forEach(like => {
            if (like.id === domain.id){
                exists = true;
            }
        })
        !exists ? setLikesList([...likesList, domain]) : setLikesList(likesList.filter(like => like.id !== domain.id))
    }

  return (
    <LikeContext.Provider value={likesList}>
        <LikeContextUpdate.Provider value={(domain: IDomainValues)=>toggleLike(domain)}>
            {children}
        </LikeContextUpdate.Provider>
    </LikeContext.Provider>
  )
}
