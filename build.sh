#!/bin/bash

bower install
# Precompile popup template, requires npm install -g handlebars
handlebars app/popup/popup.handlebars -f app/popup/popup.template.js

python utilities/disconnect_parser.py
python utilities/twitter-grabber.py
