import useAuth from "../Auth/hooks/useAuth";
import {useState, useEffect} from "react"
import { useAllDomains } from "./useAllDomains";
import { IDomainValues } from "../types";

type filterOptions = "domainName" | "availabilityDate" | "domainRating" | "externalLinks" | "pageAuthority" | undefined;


export const useDomainSort = () => {
    const {domains, loading} = useAllDomains()
    const {user} = useAuth();
    const [currentFilter, setCurrentFilter] = useState<filterOptions>()
    const [filteredList, setFilteredList] = useState<IDomainValues[] | undefined>()
    
    const updateSort = (by: filterOptions) => {
        setCurrentFilter(by);
    }

    useEffect(()=>{
        const sort = () => {            
            switch(currentFilter){
                case "domainName":
                    setFilteredList(filteredList?.sort((a, b)=> Number(a.domainUrl > b.domainUrl)))
                    break;
                case "availabilityDate":
                    setFilteredList(filteredList?.sort((a, b)=> a.availableBy.localeCompare(b.availableBy)))
                    break;
    
                default:
                    setFilteredList(domains)
                    break;
            }
            
        }
        sort()
    },[domains, currentFilter])

    return {filteredList, loading, updateSort}
}