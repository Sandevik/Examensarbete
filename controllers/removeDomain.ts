import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { IDomainValues } from "../types";

export const removeDomain = async (domain: IDomainValues | undefined) => {
    if (domain !== undefined){
        const domainRef = doc(db, "domains", domain.id)
        await deleteDoc(domainRef);
    }
}