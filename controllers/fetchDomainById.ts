import { IDomainValues } from "../types"
import { getDoc, doc } from "firebase/firestore"
import {db} from "../firebase"

export const fetchDomainById = async (id: string) => {
    const docRef = doc(db, "domains", id);
    const docSnapShot = await getDoc(docRef)
    const docData = docSnapShot.data();
    const {availableBy, likelyFree, pageTitle, domainNameRating, pagesCrawledFromRoot, encodedDomainUrl, externalLinks, lastCrawled, pagesToPage, domainUrl, pageAuthority, spamScore, domainAuthority} = docData
    const domain: IDomainValues = {availableBy, likelyFree, pageTitle, domainNameRating, pagesCrawledFromRoot, encodedDomainUrl, externalLinks, lastCrawled, pagesToPage, domainUrl, pageAuthority, spamScore, domainAuthority}
    return domain
}