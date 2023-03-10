import { IDomainValues, IUserDetails } from "../types"
import { getDoc, doc } from "firebase/firestore"
import {db} from "../firebase"
import { fetchUserDetailsByUid } from "./fetchUserDetailsByUid";


export const fetchDomainById = async (id: string, uid: string): Promise<IDomainValues | undefined> => {
    // Hämta referenser till domänen
    const docRef = doc(db, "domains", id);
    const docSnapShot = await getDoc(docRef)
    const docData = docSnapShot.data();

    // Kolla om användaren är admin eller premium => return null på alla värden som inte ingår i standard subscriptionType
    if (docData && uid){
        const {availableBy, likelyFree, pageTitle, domainNameRating, pagesCrawledFromRoot, encodedDomainUrl, externalLinks, lastCrawled, pagesToPage, domainUrl, pageAuthority, spamScore, domainAuthority, onPreview, hidden} = docData
        if (uid){
            const user = await fetchUserDetailsByUid(uid);
            if (user?.subscriptionType == "premium" || user?.userType == "admin" || docData.preview === true){
                return {availableBy, likelyFree, pageTitle, domainNameRating, pagesCrawledFromRoot, encodedDomainUrl, externalLinks, lastCrawled, pagesToPage, domainUrl, pageAuthority, spamScore, domainAuthority, id: docData.id, onPreview: onPreview ? onPreview : false, hidden: hidden ? hidden : false}
            }else{
                return {availableBy, likelyFree: null, pageTitle: null, domainNameRating: null, pagesCrawledFromRoot: null, encodedDomainUrl, externalLinks: null, lastCrawled: null, pagesToPage: null, domainUrl, pageAuthority: null, spamScore: null, domainAuthority: null, id: docData.id, onPreview: onPreview ? onPreview : false, hidden: hidden ? hidden : false}
            }
        }
    }else if (docData && !uid || docData?.onPreview === true){
        const {availableBy, likelyFree, pageTitle, domainNameRating, pagesCrawledFromRoot, encodedDomainUrl, externalLinks, lastCrawled, pagesToPage, domainUrl, pageAuthority, spamScore, domainAuthority, onPreview, hidden} = docData
        return {availableBy, likelyFree: null, pageTitle: null, domainNameRating: null, pagesCrawledFromRoot: null, encodedDomainUrl, externalLinks: null, lastCrawled: null, pagesToPage: null, domainUrl, pageAuthority: null, spamScore: null, domainAuthority: null, id: docData.id, onPreview: onPreview ? onPreview : false, hidden: hidden ? hidden : false}
    }else{
        return undefined
    }
}