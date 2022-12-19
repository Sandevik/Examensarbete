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
    res = requests.get(SE_DOMAINS)
    res = json.loads(res.text)
    for i in range(len(res["data"])):
        try:
            convertedDomains.append(
                {
                    "url": idna.decode(res["data"][i]["name"]),
                    "encodedURL" : res["data"][i]["name"],
                    "availableBy" : res["data"][i]["release_at"]
                })
            
        except:
            convertedDomains.append(res["data"][i]["name"])
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
                "domainName": "bad"
                }
            newArray.append(obj)
        else:
            obj = { 
                "url": array[i]["url"],
                "encodedURL" : array[i]["encodedURL"],
                "availableBy" : array[i]["availableBy"],
                "domainName": "ok"
                }
            newArray.append(obj)
    return newArray
            
initalDomains = getInitalDomains()
domains = filterBadDomains(initalDomains)
print(domains)


