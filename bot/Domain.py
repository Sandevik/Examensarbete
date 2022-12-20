import idna
import re
REGEXPATTERN = "(\d{0,4}-?[A-Za-zåäöÅÄÖ]{3,}\.(se|nu))|(\d{0,4}-?[A-Za-zåäöÅÄÖ]{3,}\d{0,3}\.(se|nu))"

class Domain:
    def __init__(self, encodedDomainUrl, availableBy, domainNameRating = None, dR = None, externalLinks = None):
        self.encodedDomainUrl = encodedDomainUrl
        self.availableBy = availableBy
        self.domainUrl = idna.decode(encodedDomainUrl)
        self.domainNameRating = domainNameRating
        self.dR = dR
        self.externalLinks = externalLinks
        if self.domainNameRating is None and not re.compile(REGEXPATTERN, re.IGNORECASE).match(self.domainUrl):
           self.domainNameRating = "bad"
        elif self.domainNameRating is not None:
            self.domainNameRating = self.domainNameRating
        else:
            self.domainNameRating = "ok"

    def getDomain(self):
        return self.domainUrl
    
    def ToString(self):
        return "url: "+ self.domainUrl + ", encodedUrl: " + self.encodedDomainUrl + ", domainNameRating: " + self.domainNameRating + ", avaliableBy: " + self.availableBy
           