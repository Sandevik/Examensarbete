import { useContext } from "react"
import { LikeContext, LikeContextUpdate } from "../context/LikeContext"

export const useLikes = () => {
    return {likesList: useContext(LikeContext), toggleLike: useContext(LikeContextUpdate)}
}