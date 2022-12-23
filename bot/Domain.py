import idna
import re
REGEXPATTERN = "(\d{0,2}-?[A-Za-zåäöÅÄÖ]{3,}\.(se|nu))|(\d{0,2}-?[A-Za-zåäöÅÄÖ]{3,}\d{0,3}\.(se|nu))"

class Domain:
    def __init__(self, encodedDomainUrl, availableBy, domainNameRating = None, dR = None, externalLinks = None):
        self.encodedDomainUrl = encodedDomainUrl
        self.availableBy = availableBy
        self.domainUrl = idna.decode(encodedDomainUrl)
        self.domainNameRating = domainNameRating
        self.dR = dR
        self.pageAuth = None
        self.pagesCrawledFromRoot = None
        self.pageTitle = None
        self.lastCrawled = None
        self.liklyFree = None
        self.spamScore = None
        self.pagesToPage = None
        self.externalLinks = externalLinks
        if self.domainNameRating is None and not re.compile(REGEXPATTERN, re.IGNORECASE).match(self.domainUrl):
           self.domainNameRating = "bad"
        elif self.domainNameRating is not None:
            self.domainNameRating = self.domainNameRating
        else:
            self.domainNameRating = "ok"

    def getDomain(self):
        return self.domainUrl
    def getEncoded(self):
        return self.encodedDomainUrl
    def getAvailableBy(self):
        return self.availableBy
    def getDomainNameRating(self):
        return self.domainNameRating
    def getDR(self):
        return self.dR
    def getExternalLinks(self):
        return self.externalLinks
    def setLastCrawled(self, value):
        self.lastCrawled = value
    def setPageTitle(self, value):
        self.pageTitle = value
        self.liklyFree = "park" in value.lower() or "host" in value.lower() or "sale" in value.lower() or "domän" in value.lower() 
    def setPagesToPage(self, value):
        self.pagesToPage = value
    def setDomainAuth(self, value):
        self.dR = value
    def setSpamScore(self, value):
        self.spamScore = value
    def setPageAuth(self, value):
        self.pageAuth = value
    def setExternalLinks(self, value):
        self.externalLinks = value
    def setPagesCrawledFromRoot(self, value):
        self.pagesCrawledFromRoot = value
    

    def toDict(self):
        ref = {
            u"encodedDomainUrl": self.encodedDomainUrl, 
            u"domainUrl": self.domainUrl, 
            u"availableBy": self.availableBy, 
            u"domainNameRating": self.domainNameRating, 
            u"domainAuthority" : self.dR, 
            u"externalLinks" : self.externalLinks,
            u"pageTitle" : self.pageTitle, 
            u"lastCrawled" : self.lastCrawled, 
            u"pagesToPage": self.pagesToPage, 
            u"spamScore": self.spamScore, 
            u"pageAuthority" : self.pageAuth,
            u"likelyFree" : self.liklyFree,
            u"pagesCrawledFromRoot" : self.pagesCrawledFromRoot
        }
        return ref