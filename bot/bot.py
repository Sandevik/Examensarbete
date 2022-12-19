import requests
import json
import re
import idna
SE_DOMAINS = "https://data.internetstiftelsen.se/bardate_domains.json"
NU_DOMAINS = "https://data.internetstiftelsen.se/bardate_domains_nu.json"
REGEXPATTERN = "(\d{0,4}-?[A-Za-zåäöÅÄÖ]{3,}\.(se|nu))|(\d{0,4}-?[A-Za-zåäöÅÄÖ]{3,}\d{0,3}\.(se|nu))"

def getInitalDomains():
    # Hämta Domäner och skapa en dictionary av dem, returna array med dictionary.
    convertedDomains = []
    resSE = requests.get(SE_DOMAINS)
    resSE = json.loads(resSE.text)
    resNU = requests.get(NU_DOMAINS)
    resNU = json.loads(resNU.text)
    res = resSE["data"] + resNU["data"]
    for i in range(len(res)):
        try:
           convertedDomains.append(
               {
                   "url": idna.decode(res[i]["name"]),
                   "encodedURL" : res[i]["name"],
                   "availableBy" : res[i]["release_at"]
                })       
        except:
            convertedDomains.append(res[i]["name"])
    return convertedDomains
def filterBadDomains(array):
    # Ranka domäners namn genom regexmatchning
    newArray = []
    for i in range(len(array)):
        if not re.compile(REGEXPATTERN, re.IGNORECASE).match(array[i]["url"]):
            obj = { 
                "url": array[i]["url"],
                "encodedURL" : array[i]["encodedURL"],
                "availableBy" : array[i]["availableBy"],
                "domainNameRating": "bad"
                }
            newArray.append(obj)
        else:
            obj = { 
                "url": array[i]["url"],
                "encodedURL" : array[i]["encodedURL"],
                "availableBy" : array[i]["availableBy"],
                "domainNameRating": "ok"
                }
            newArray.append(obj)
    return newArray

def checkIfInFireBase(obj):
    #Kolla om obj med domännamnet redan finns i firebase
    pass
def fetchMozValues():
    #Skicka till moz och ta reda på domain ratings, external links m.m (De som är ok i domainNameRating)
    pass
def sendToFireBase():
    #skicka värden till firebase
    pass



initalDomains = getInitalDomains()
domains = filterBadDomains(initalDomains)
print(domains)




