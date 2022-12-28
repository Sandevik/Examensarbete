import { IDomainValues, IUserDetails } from "../types"
import { getDoc, doc } from "firebase/firestore"
import {db} from "../firebase"

export const fetchDomainById = async (id: string, user: IUserDetails | null): Promise<IDomainValues | undefined> => {
    const docRef = doc(db, "domains", id);
    const docSnapShot = await getDoc(docRef)
    const docData = docSnapShot.data();
    if (docData){
        
        const {availableBy, likelyFree, pageTitle, domainNameRating, pagesCrawledFromRoot, encodedDomainUrl, externalLinks, lastCrawled, pagesToPage, domainUrl, pageAuthority, spamScore, domainAuthority} = docData
        if (user?.subscriptionType == "premium" || user?.userType == "admin"){
            return {availableBy, likelyFree, pageTitle, domainNameRating, pagesCrawledFromRoot, encodedDomainUrl, externalLinks, lastCrawled, pagesToPage, domainUrl, pageAuthority, spamScore, domainAuthority}
        }
        return {availableBy, likelyFree: null, pageTitle: null, domainNameRating: null, pagesCrawledFromRoot: null, encodedDomainUrl, externalLinks: null, lastCrawled: null, pagesToPage: null, domainUrl, pageAuthority: null, spamScore: null, domainAuthority: null}
    }else{
        return undefined
    }
}