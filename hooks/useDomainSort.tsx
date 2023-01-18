import useAuth from "../Auth/hooks/useAuth";
import {useState, useEffect} from "react"
import { useAllDomains } from "./useAllDomains";
import { filterOptions, IDomainValues } from "../types";



export const useDomainSort = () => {
    const {domains, loading, incrementPageIndex} = useAllDomains()
    const [currentFilter, setCurrentFilter] = useState<filterOptions>()
    const [filteredList, setFilteredList] = useState<IDomainValues[]>([])
    
    const updateSort = (by: filterOptions) => {
        setCurrentFilter(by);
    }

    useEffect(()=>{
        const sort = () => {            
            switch(currentFilter){
                case "domainName":
                    setFilteredList(JSON.parse(JSON.stringify(filteredList?.sort((a, b)=> {
                        if (a.id !== null && b.id !== null){
                            return a.id.localeCompare(b.id)
                        }
                        return 0
                    }))))
                    break;
                case "availabilityDate":
                    //JSON Parse JSON stringify => Ändra referensen så att Ui uppdateras
                    setFilteredList(JSON.parse(JSON.stringify(filteredList?.sort((a, b)=> a.availableBy.localeCompare(b.availableBy))))) 
                    break;
                case "externalLinks":
                    setFilteredList(JSON.parse(JSON.stringify(filteredList?.sort((a, b)=> {
                        if (a.externalLinks !== null && b.externalLinks !== null){
                            return b.externalLinks - a.externalLinks
                        }
                        return 0
                    }))))
                    break;
                case "domainAuthority":
                    setFilteredList(JSON.parse(JSON.stringify(filteredList?.sort((a, b)=> {
                        if (a.domainAuthority !== null && b.domainAuthority !== null){
                            return b.domainAuthority - a.domainAuthority
                        }
                        return 0
                    }))))
                    break;
                case "pageAuthority":
                    setFilteredList(JSON.parse(JSON.stringify(filteredList?.sort((a, b)=> {
                        if (a.pageAuthority !== null && b.pageAuthority !== null){
                            return b.pageAuthority - a.pageAuthority
                        }
                        return 0
                    }))))
                    break;
    
                default:
                    setFilteredList(domains? domains : [])
                    break;
            }
            
        }
        sort()
    },[domains, currentFilter])

    return {filteredList, currentFilter, loading, updateSort, incrementPageIndex}
}