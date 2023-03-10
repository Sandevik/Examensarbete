import json, requests, os, asyncio, datetime, time
import firebase_admin
from firebase_admin import firestore
from firebase_admin import credentials
from Domain import Domain

SE_DOMAINS = "https://data.internetstiftelsen.se/bardate_domains.json"
NU_DOMAINS = "https://data.internetstiftelsen.se/bardate_domains_nu.json"
BASE_MOZ_URL = "https://lsapi.seomoz.com/v2/"
MOZ_ACCESS_ID = ""
MOZ_SECRET  = ""
REGEXPATTERN = "(\d{0,2}-?[A-Za-zåäöÅÄÖ]{3,}\.(se|nu))|(\d{0,2}-?[A-Za-zåäöÅÄÖ]{3,}\d{0,3}\.(se|nu))"

# ALLA värden som hämtas, hämtas innan 2022-01-23 då jag vill ha dem i närtid och att jag då kan få ut fler url:er i närtid

file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)),"examensarbete-a4732-firebase-adminsdk-24swr-b794114203.json")
cred = credentials.Certificate(file_path)
app = firebase_admin.initialize_app(cred)
db = firestore.client()
def checkIfInFireBase(domain):
    #Kolla om domänen med domännamnet redan finns i firebase
    doc_ref = db.collection(u"domains").where(u"domainUrl", u"==", domain.getDomain()).get()
    return len(doc_ref) == 1
def sendToFireBase(domain):
    #skicka värden till firebase
    db.collection(u"domains").document(domain.getDomain()).set(domain.toDict())
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

def fetchMozValues(domain):
    #Skicka till moz och ta reda på domain ratings, external links m.m (De som är ok i domainNameRating)
    domainUrl = domain.getDomain()
    auth = (MOZ_ACCESS_ID, MOZ_SECRET)
    url = "https://lsapi.seomoz.com/v2/url_metrics"
    data = '{"targets": ["'+domainUrl+'"]}'
    try:
        res = requests.post(url, data=data, auth=auth)
        data = json.loads(res.text)["results"]

        domain.setPageTitle(data[0]["title"])
        domain.setPagesToPage(data[0]["pages_to_page"])
        domain.setDomainAuth(data[0]["domain_authority"])
        domain.setPageAuth(data[0]["page_authority"])
        domain.setSpamScore(data[0]["spam_score"])
        domain.setLastCrawled(data[0]["last_crawled"])
        domain.setExternalLinks(data[0]["external_pages_to_root_domain"])
        domain.setPagesCrawledFromRoot(data[0]["pages_crawled_from_root_domain"])
    except:
        pass

async def run():
    maxDate = datetime.datetime(2023, 1, 23)
    mozReq = 0
    for i in range(len(domains)):
        j = i+37001 # ändrade denna för att få så många unika domäner som möjligt
        dateArray = domains[j].getAvailableBy().split("-")
        date = datetime.datetime(int(dateArray[0]) , int(dateArray[1]), int(dateArray[2]))
        mozReq += 1
        if domains[j].getDomainNameRating() == "ok" and date < maxDate and mozReq <= 2500:
            print(f"{domains[j].getDomain()}")
            fetchMozValues(domains[j])
            time.sleep(2.5)
            sendToFireBase(domains[j])
        elif mozReq >= 2500:
            break
        

    
domains = []
getInitalDomains()
asyncio.run(run())



