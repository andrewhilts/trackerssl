#!/bin/bash

bower install
# Precompile popup template, requires npm install -g handlebars
handlebars app/popup/popup.handlebars -f app/popup/popup.template.js

python utilities/disconnect_parser.py
python utilities/twitter-grabber.py

echo "HTTPS Everywhere Ruleset Grabber"
echo "Creating tmp directory."
mkdir "tmp"
cd tmp
echo "Scraping HTTPS Everywhere webpage for first link to an extension build."
urlPath="$(curl https://www.eff.org/Https-everywhere | egrep -o '/files/https-everywhere-chrome-.*?.crx' | head -n 1)"
urlPrefix="https://www.eff.org"
url=$urlPrefix$urlPath
echo "Downloading build from $url"
wget $url -O latest.crx
ls
mkdir "source"
cd source
echo "Unpacking HTTPS Everywhere Extension"
unzip -qq ../latest.crx
cd ../../
echo "Copying up-to-date ruleset to app/rules/"
cp tmp/source/rules/default.rulesets app/rules/default.rulesets
echo "Cleaning up."
rm -rf tmp
echo "Done HTTPS Everywhere ruleset update."