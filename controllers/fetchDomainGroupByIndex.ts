import { collection, endAt, getDocs, limit, orderBy, query, startAfter, startAt, where } from 'firebase/firestore';
import { db } from '../firebase';
import { IDomainValues } from '../types';
import { fetchUserDetailsByUid } from './fetchUserDetailsByUid';

export default async function fetchDomainGroupByIndex(lastDomain: string | undefined, uid?: string){
   const domains: IDomainValues[] = [];
   const collectionRef = collection(db, "domains")
   if(lastDomain === undefined || lastDomain === ""){
       const q = query(collectionRef, orderBy("domainUrl"), limit(10))
       const querySnapShot = await getDocs(q)       
        if (uid){
            const user = await fetchUserDetailsByUid(uid);
            if (user?.userType == "admin" || user?.subscriptionType == "premium"){
                querySnapShot.forEach( doc => {        
                  const {availableBy, likelyFree, pageTitle, domainNameRating, pagesCrawledFromRoot, encodedDomainUrl, externalLinks, lastCrawled, pagesToPage, domainUrl, pageAuthority, spamScore, domainAuthority, onPreview, hidden} = doc.data();
                  const domain: IDomainValues = {availableBy, likelyFree, pageTitle, domainNameRating, pagesCrawledFromRoot, encodedDomainUrl, externalLinks, lastCrawled, pagesToPage, domainUrl, pageAuthority, spamScore, domainAuthority, id: doc.id, onPreview: onPreview ? onPreview : false, hidden: hidden ? hidden : false}
                  domains.push(domain)
                })
            }else{
                querySnapShot.forEach(doc => {
                    const {availableBy, likelyFree, pageTitle, domainNameRating, pagesCrawledFromRoot, encodedDomainUrl, externalLinks, lastCrawled, pagesToPage, domainUrl, pageAuthority, spamScore, domainAuthority, onPreview, hidden, id} = doc.data();
                    const domain: IDomainValues = {availableBy, likelyFree: null, pageTitle: null, domainNameRating: null, pagesCrawledFromRoot: null, encodedDomainUrl, externalLinks: null, lastCrawled: null, pagesToPage: null, domainUrl, pageAuthority: null, spamScore: null, domainAuthority: null, id: doc.id, onPreview: onPreview ? onPreview : false, hidden: hidden ? hidden : false}
                    if (domain.onPreview){
                      domains.push({availableBy, likelyFree, pageTitle, domainNameRating, pagesCrawledFromRoot, encodedDomainUrl, externalLinks, lastCrawled, pagesToPage, domainUrl, pageAuthority, spamScore, domainAuthority, onPreview, hidden, id})
                    }else{
                      domains.push(domain)
                    }
                })
            }
            
        }else{
            querySnapShot.forEach(doc => {
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
        const q = query(collectionRef, orderBy("domainUrl"), limit(10), startAfter(lastDomain)) // start After id
        const querySnapShot = await getDocs(q);
        if (uid){
            const user = await fetchUserDetailsByUid(uid);
            if (user?.userType == "admin" || user?.subscriptionType == "premium"){
                querySnapShot.forEach(doc => {
                  const {availableBy, likelyFree, pageTitle, domainNameRating, pagesCrawledFromRoot, encodedDomainUrl, externalLinks, lastCrawled, pagesToPage, domainUrl, pageAuthority, spamScore, domainAuthority, onPreview, hidden} = doc.data();
                  domains.push({availableBy, likelyFree, pageTitle, domainNameRating, pagesCrawledFromRoot, encodedDomainUrl, externalLinks, lastCrawled, pagesToPage, domainUrl, pageAuthority, spamScore, domainAuthority, id: doc.id, onPreview: onPreview ? onPreview : false, hidden: hidden ? hidden : false})
                })
            }else{
                querySnapShot.forEach(doc => {
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
            querySnapShot.forEach(doc => {
                const {availableBy, likelyFree, pageTitle, domainNameRating, pagesCrawledFromRoot, encodedDomainUrl, externalLinks, lastCrawled, pagesToPage, domainUrl, pageAuthority, spamScore, domainAuthority, onPreview, hidden, id} = doc.data();
                const domain = {availableBy, likelyFree: null, pageTitle: null, domainNameRating: null, pagesCrawledFromRoot: null, encodedDomainUrl, externalLinks: null, lastCrawled: null, pagesToPage: null, domainUrl, pageAuthority: null, spamScore: null, domainAuthority: null, id: doc.id, onPreview: onPreview ? onPreview : false, hidden: hidden ? hidden : false}
                if (domain.onPreview){
                  domains.push({availableBy, likelyFree, pageTitle, domainNameRating, pagesCrawledFromRoot, encodedDomainUrl, externalLinks, lastCrawled, pagesToPage, domainUrl, pageAuthority, spamScore, domainAuthority, onPreview, hidden, id})
                }else{
                  domains.push(domain)
                }
              })
        }
      }
      
    return domains
}
