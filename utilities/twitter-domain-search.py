import sys
import json
from TwitterAPI import TwitterAPI
import oauth
import requests
import twittercredentials

args = sys.argv

args.pop(0)

try:
    domain = args[0]
except IndexError:
  print "please provide a domain as the first argument"
  sys.exit()

api = TwitterAPI(twittercredentials.consumer_key, twittercredentials.consumer_secret, twittercredentials.access_token_key, twittercredentials.access_token_secret)

r = api.request('users/search', {'q':domain, 'count':'1'})
for item in r:
    print item['screen_name']