echo "{" > output.json
while read p; do
  bash twitter-scraper.sh $p output.json
done <$1
sed '$s/,$//' output.json > output.copy; mv output.copy output.json
echo "}" >> output.json