import { IDomainValues } from "../types";
import { query, collection, getDocs } from "firebase/firestore"
import {db} from "../firebase"

export const fetchAllDomains = async() => {
    let domains: IDomainValues[] = [];
    const q = query(collection(db, "domains"))
    let querySnapshot = await getDocs(q)
    querySnapshot.forEach(doc => {
      const {availableBy, likelyFree, pageTitle, domainNameRating, pagesCrawledFromRoot, encodedDomainUrl, externalLinks, lastCrawled, pagesToPage, domainUrl, pageAuthority, spamScore, domainAuthority} = doc.data();
      domains.push({availableBy, likelyFree, pageTitle, domainNameRating, pagesCrawledFromRoot, encodedDomainUrl, externalLinks, lastCrawled, pagesToPage, domainUrl, pageAuthority, spamScore, domainAuthority, id: doc.id})
    })
    return domains
  }