import useLikes from "../hooks/useLikes";
import { IDomainValues } from "../types";

export const addLike = (domain: IDomainValues) => {
   if (domain){
        useLikes({action:"add", domain})
   }
} 