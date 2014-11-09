#TrackerSSL

TrackerSSL is a Chrome extension that examines how many third party trackers on a given page support SSL. It uses the Electronic Frontier Foundation's (EFF) [HTTPS Everywhere](https://github.com/EFForg/https-everywhere/pulls) extension as one of its methods for testing SSL support.

##Regular install
This is still super-alpha, but you can download the latest version [here](https://github.com/andrewhilts/trackerssl/blob/master/trackerssl.crx?raw=true). Just open this crx file in Chrome and you should be good to go!

##Developer install
Download this repository, unzip it, navigate to the unzipped folder in Terminal, and run "bower install". You will need to have [bower](http://bower.io) on your machine to do so.

Then, in Google Chrome, navigate to [chrome://extensions](chrome://extensions), make sure "Developer Mode" is checked off, and then click "Load unpacked extension". Then select the folder you just unzipped, which should be called **trackerssl**. Make sure the extension is enabled, and you should be good to go!

TrackerSSL was originally developed at Ghostery's "Hack the Trackers" event in November 2014.