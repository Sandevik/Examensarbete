import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebase"
import { IDomainValues } from "../types"


export const fetchPreviewedDomains = async () => {
    const domains: IDomainValues[] = []
    const collectionRef = collection(db, "domains")
    const q = query(collectionRef, where("onPreview", "==", true))
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach(doc => domains.push({...doc.data()} as IDomainValues))

   return domains
}