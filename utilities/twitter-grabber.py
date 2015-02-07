import sys
import json
import twitter
import urllib2
from urlparse import urlparse
import twitterCredentials

args = sys.argv

args.pop(0)

try:
    testlist = args[0]
except IndexError:
	print "please provide a list id as the first argument"
	sys.exit()

try:
	with open('app/tracker-datasets/twitterLists/defaultList.json', 'r') as fp:
	    json_str = fp.read()
	    twitter_accounts = json.loads(json_str)
except IOError:
	twitter_accounts = {}

api = twitter.Api(consumer_key=twitterCredentials.consumer_key,
                          consumer_secret=twitterCredentials.consumer_secret,
                          access_token_key=twitterCredentials.access_token_key,
                          access_token_secret=twitterCredentials.access_token_secret,
                          cache=None)

def getHostnameAccount(user, hostnameDict):
	try:
		req = urllib2.Request(user.url)
		res = urllib2.urlopen(req)
		url = res.geturl()
		parsed = urlparse(url)
		if str(parsed.path) == "/":
			# print "@" + user.screen_name, parsed.hostname
			hostnameDict[parsed.hostname] = "@" + user.screen_name
			return hostnameDict
		else:
			# print user.screen_name, "URL includes path; ignored:", parsed.path
			return hostnameDict
	except:
		# print "can't parse url", user.screen_name
		return hostnameDict

for listID in args:
	print "GETTING MEMBERS OF LIST: ", listID
	members = api.GetListMembers(listID, None)
	for member in members:
		twitter_accounts = getHostnameAccount(member, twitter_accounts)

print "Saving to file"
with open('app/tracker-datasets/twitterLists/defaultList.json', 'wb') as fp:
    json.dump(twitter_accounts, fp)