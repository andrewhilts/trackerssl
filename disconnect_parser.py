import json, requests

url = "https://services.disconnect.me/disconnect.json"

print "starting download"
resp = requests.get(url=url)

data = json.loads(resp.text)

hostnameDict = {}

print "parsing data"
#iterate over categories
for i in data['categories']:
	#iterate over companies
	for j in data['categories'][i]:
		#iterate over company names
		for company in j.keys():
			for l in j[company].keys():
				hostnames = j[company][l]
				for hostname in hostnames:
					hostnameDict[hostname] = company

print "Saving to file"
with open('disconnect.json', 'wb') as fp:
    json.dump(hostnameDict, fp)