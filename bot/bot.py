import requests
import json
import re
import idna
from Domain import Domain
SE_DOMAINS = "https://data.internetstiftelsen.se/bardate_domains.json"
NU_DOMAINS = "https://data.internetstiftelsen.se/bardate_domains_nu.json"
REGEXPATTERN = "(\d{0,4}-?[A-Za-zåäöÅÄÖ]{3,}\.(se|nu))|(\d{0,4}-?[A-Za-zåäöÅÄÖ]{3,}\d{0,3}\.(se|nu))"

def getInitalDomains():
    # Hämta Domäner och skapa en dictionary av dem, returna array med dictionary.
    resSE = requests.get(SE_DOMAINS)
    resSE = json.loads(resSE.text)
    resNU = requests.get(NU_DOMAINS)
    resNU = json.loads(resNU.text)
    res = resSE["data"] + resNU["data"]
    
    # Skapa instanser av domänklassen och lägga till den i en lista
    for i in range(len(res)):
        domain = Domain(res[i]["name"], res[i]["release_at"])
        domains.append(domain)
    


def checkIfInFireBase(obj):
    #Kolla om obj med domännamnet redan finns i firebase
    pass
def fetchMozValues():
    #Skicka till moz och ta reda på domain ratings, external links m.m (De som är ok i domainNameRating)
    pass
def sendToFireBase():
    #skicka värden till firebase
    pass


domains = []
getInitalDomains()
print(domains[2].ToString())




