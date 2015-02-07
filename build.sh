#!/bin/bash

bower install
# Precompile popup template, requires npm install -g handlebars
handlebars popup.handlebars -f app/popup.template.js

python disconnect_parser.py
python twitter-grabber.py
