import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { IDomainValues } from "../types";

export const changeDomainObject = async (domainId: string | undefined, newDomainObject: IDomainValues | undefined) => {
    if (domainId && newDomainObject){
        const domainRef = doc(db, "domains", domainId)
        await setDoc(domainRef, newDomainObject)
    }
}