import sys
import json
from TwitterAPI import TwitterAPI
import oauth
import requests
import twittercredentials
import operator
import httplib
import urlparse
import string
from difflib import SequenceMatcher

def unshorten_url_to_hostname(url):
    parsed = urlparse.urlparse(url)
    if(parsed.scheme == 'http'):
      h = httplib.HTTPConnection(parsed.netloc)
    else:
      h = httplib.HTTPSConnection(parsed.netloc)
    resource = parsed.path
    if parsed.query != "":
        resource += "?" + parsed.query
    h.request('HEAD', resource )
    response = h.getresponse()
    if response.status/100 == 3 and response.getheader('Location'):
        return unshorten_url_to_hostname(response.getheader('Location')) # changed to process chains of short urls
    else:
        return parsed.hostname

def similar(a, b):
    return SequenceMatcher(None, a, b).ratio()

def calculateScore(account):
  score = 0
  if account['urlPartofDomain']:
    score+=10
  
  score+= account['popularityScore']
  
  if account['urlSimilarityToDomain'] == 1.0:
    score+=10
  return score

def getPopularityRank(accounts): 
  totalAccounts = len(accounts)
  scoreLimit = 10
  scoreBucket = scoreLimit/totalAccounts
  popularAccounts = {}
  for i in accounts:

    popularAccounts[accounts[i]['screen_name']] = accounts[i]['followers_count']
  sortedAccounts = sorted(popularAccounts.iteritems(), key=lambda (k,v): (v,k), reverse=True)

  for i in accounts:
    accounts[i]["popularityRank"] = sortedAccounts.index((accounts[i]['screen_name'], accounts[i]['followers_count']))
    accounts[i]["popularityScore"] = scoreLimit - accounts[i]["popularityRank"]*scoreBucket

  return accounts

def getRankedAccountList(accounts):
  scoredAccounts = {}
  for i in accounts:
    scoredAccounts[accounts[i]['screen_name']] = accounts[i]['score']
  return sorted(scoredAccounts.iteritems(), key=lambda (k,v): (v,k), reverse=True)

args = sys.argv

args.pop(0)

try:
    userList = args[0]
    domain = args[1]
except IndexError:
  print "please provide a comma-delimited list of users as the first argument"
  sys.exit()

api = TwitterAPI(twittercredentials.consumer_key, twittercredentials.consumer_secret, twittercredentials.access_token_key, twittercredentials.access_token_secret)

accounts = {}

r = api.request('users/lookup', {'screen_name':userList, 'count':'1'})
for item in r:
    urlPartofDomain = False
    similarity = 0

    if item['url']:
      # Strip out punctuation for main similarity and part of domain
      realhostname = unshorten_url_to_hostname(item['url'])

      similarity = similar(realhostname.translate(string.maketrans("",""), string.punctuation).lower(), domain.translate(string.maketrans("",""), string.punctuation).lower())
      if realhostname.find(domain) > -1:
        urlPartofDomain = True
      elif domain.find(realhostname) > -1:
        urlPartofDomain = True
      elif domain.find(item['screen_name'].lower()) > -1 :
        urlPartofDomain = True;

    accounts[item['screen_name']] = {
      "screen_name": item['screen_name'],
      "url": realhostname,
      "followers_count": item['followers_count'],
      "urlSimilarityToDomain": similarity,
      "urlPartofDomain": urlPartofDomain
    }

accounts = getPopularityRank(accounts)
for i in accounts:
  accounts[i]['score'] = calculateScore(accounts[i])

rankedAccountList = getRankedAccountList(accounts)

print rankedAccountList[0][0]