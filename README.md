#TrackerSSL
This Chrome extension monitors a web page, and lets you know how many of a page's third party dependencies support HTTPS. TrackerSSL makes it easy to send the site a Tweet, asking them to secure their readers.

[Download TrackerSSL from the Google Chrome Store](chrome.google.com/webstore/detail/tracker-ssl/hgoabgkpjcbliklekfgepfdlmcnkjnao) (Works best if you uninstall other ad blocking extensions and then re-install them afterwards, so TrackerSSL can do its magic first.)

##About
Check out [TrackerSSL highlights insecure websites and their ad trackers](https://citizenlab.org/2015/01/trackerssl/)

##Developer install
Download this repository, unzip it, navigate to the unzipped folder in Terminal, and run "bower install". You will need to have [bower](http://bower.io) on your machine to do so.

Then, in Google Chrome, navigate to [chrome://extensions](chrome://extensions), make sure "Developer Mode" is checked off, and then click "Load unpacked extension". Then select the folder you just unzipped, which should be called **trackerssl**. Make sure the extension is enabled, and you should be good to go!