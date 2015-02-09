export http_proxy=socks5://127.0.0.1:9050 https_proxy=socks5://127.0.0.1:9050

domain=$1
output=$2
domainWithoutTld="$(echo $domain | sed -e 's/\.[a-z]*$//')"
userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.30 (KHTML, like Gecko) Chrome/12.0.742.112 Safari/534.30"
accountString="!"

homepageScrape ()
{
  twitterAccount1="$(curl -m 20 -A "$userAgent" 'http://'$domain | egrep -o 'twitter.com/([^\.]*?)\"' | sed 's/\"$//' | head -n 1 | ( read h; echo ${h:13} ))"
  return $t
}
googleScrape ()
{ 
  twitterAccount2="$(curl -m 20 -A "$userAgent" 'https://www.google.ca/search?q=%22'$domainWithoutTld'%22%20%22'$domain'%22%20twitter%20-%22Welcome%20to%20Twitter%22%20-%22Login%20on%20Twitter%22%20site%3Atwitter.com%20-inurl%3A%2Flists%2F%20-inurl%3A%3Flang%20-inurl%3A%2Fstatus%2F' | egrep -o 'https://twitter.com/([^\.]*?)\"' | sed 's/\"$//' | head -n 1 | ( read h; echo ${h:20} ))"
}
twitterSearchDomain ()
{
  twitterAccount3="$(python utilities/twitter-domain-search.py $domain)"
}
twitterSearchDomainNoTld ()
{
  twitterAccount4="$(python utilities/twitter-domain-search.py $domainWithoutTld)"
}
twitterGetMostPopularAccount ()
{
  mostPopularAccount="$(python utilities/twitter-get-users.py $accountString $domain)"
}

echo ""
echo "----------------------------"
echo "Finding Twitter Account for $domain"
homepageScrape
googleScrape

unset http_proxy
unset https_proxy

twitterSearchDomain
twitterSearchDomainNoTld

if [ -z "$twitterAccount1" ]
  then
    echo ""
  else
    accountString="$accountString,$twitterAccount1"
fi
if [ -z "$twitterAccount2" ]
  then
    echo ""
  else
    accountString="$accountString,$twitterAccount2"
fi
if [ -z "$twitterAccount3" ]
  then
    echo ""
  else
    accountString="$accountString,$twitterAccount3"
fi
if [ -z "$twitterAccount4" ]
  then
    echo ""
  else
    accountString="$accountString,$twitterAccount4"
fi
accountString=${accountString:2}

echo "Comparing the following accounts: $accountString."

twitterGetMostPopularAccount
echo ""
echo "/////"
echo "Best match Twitter account for $domain is $mostPopularAccount"
echo "////"
echo ""
echo "\"$domain\": \"$mostPopularAccount\"," >> $output