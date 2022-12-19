def getInitalDomains():
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