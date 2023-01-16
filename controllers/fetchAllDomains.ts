import { IDomainValues } from "../types";
import { query, collection, getDocs } from "firebase/firestore"
import {db} from "../firebase"
import { fetchUserDetailsByUid } from "./fetchUserDetailsByUid";

export const fetchAllDomains = async(uid: string | undefined) => {
  //Hämta referens till alla domäner
    let domains: IDomainValues[] = [];
    const q = query(collection(db, "domains"))
    let querySnapshot = await getDocs(q)

    // Kolla om användaren är admin eller premium => return null på alla värden som inte ingår i standard subscriptionType
    if (uid){
      const user = await fetchUserDetailsByUid(uid)
      if (user?.userType == "admin" || user?.subscriptionType == "premium"){
        querySnapshot.forEach(doc => {
          const {availableBy, likelyFree, pageTitle, domainNameRating, pagesCrawledFromRoot, encodedDomainUrl, externalLinks, lastCrawled, pagesToPage, domainUrl, pageAuthority, spamScore, domainAuthority, onPreview, hidden} = doc.data();
          domains.push({availableBy, likelyFree, pageTitle, domainNameRating, pagesCrawledFromRoot, encodedDomainUrl, externalLinks, lastCrawled, pagesToPage, domainUrl, pageAuthority, spamScore, domainAuthority, id: doc.id, onPreview: onPreview ? onPreview : false, hidden: hidden ? hidden : false})
        })
      }else{
        querySnapshot.forEach(doc => {
          const {availableBy, likelyFree, pageTitle, domainNameRating, pagesCrawledFromRoot, encodedDomainUrl, externalLinks, lastCrawled, pagesToPage, domainUrl, pageAuthority, spamScore, domainAuthority, onPreview, hidden, id} = doc.data();
          const domain = {availableBy, likelyFree: null, pageTitle: null, domainNameRating: null, pagesCrawledFromRoot: null, encodedDomainUrl, externalLinks: null, lastCrawled: null, pagesToPage: null, domainUrl, pageAuthority: null, spamScore: null, domainAuthority: null, id: doc.id, onPreview: onPreview ? onPreview : false, hidden: hidden ? hidden : false}
          if (domain.onPreview){
            domains.push({availableBy, likelyFree, pageTitle, domainNameRating, pagesCrawledFromRoot, encodedDomainUrl, externalLinks, lastCrawled, pagesToPage, domainUrl, pageAuthority, spamScore, domainAuthority, onPreview, hidden, id})
          }else{
            domains.push(domain)
          }
        })
      }
    }else{
      querySnapshot.forEach(doc => {
        const {availableBy, likelyFree, pageTitle, domainNameRating, pagesCrawledFromRoot, encodedDomainUrl, externalLinks, lastCrawled, pagesToPage, domainUrl, pageAuthority, spamScore, domainAuthority, onPreview, hidden, id} = doc.data();
        const domain = {availableBy, likelyFree: null, pageTitle: null, domainNameRating: null, pagesCrawledFromRoot: null, encodedDomainUrl, externalLinks: null, lastCrawled: null, pagesToPage: null, domainUrl, pageAuthority: null, spamScore: null, domainAuthority: null, id: doc.id, onPreview: onPreview ? onPreview : false, hidden: hidden ? hidden : false}
        if (domain.onPreview){
          domains.push({availableBy, likelyFree, pageTitle, domainNameRating, pagesCrawledFromRoot, encodedDomainUrl, externalLinks, lastCrawled, pagesToPage, domainUrl, pageAuthority, spamScore, domainAuthority, onPreview, hidden, id})
        }else{
          domains.push(domain)
        }
      })
    }
    return domains
  }