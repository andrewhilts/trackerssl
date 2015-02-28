#TrackerSSL
![TrackerSSL Icon](https://openeffect.ca/wp-content/uploads/2015/01/TRACKERSSL-1-180x230.png)

This Chrome extension monitors a web page, and lets you know how many of a page's third party dependencies support HTTPS. TrackerSSL makes it easy to send the site a Tweet, asking them to secure their readers.

[Download TrackerSSL from the Google Chrome Store](https://chrome.google.com/webstore/detail/tracker-ssl/hgoabgkpjcbliklekfgepfdlmcnkjnao) (Works best if you uninstall other ad blocking extensions and then re-install them afterwards, so TrackerSSL can do its magic first.)

##About
Check out our [project page](https://openeffect.ca/trackerssl/) and [technical report](https://citizenlab.org/2015/01/trackerssl/).

##Developer guide
You should be familiar with command line, JavaScript, and the [Handlebars](http://handlebarsjs.com/) templating system.

### System Requirements
1. Install [node.js](http://nodejs.org/) & npm -- (Linux users: [try using the PPA method](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server))
2. Install [bower](http://bower.io)
3. Install [Handlebars](http://handlebarsjs.com/): `npm install -g handlebars`

### Installation
Clone this repository, unzip it, navigate to the unzipped folder in Terminal, and run `bash build.sh`. This build script will then run `bower install`, to download and install all 3rd party JavaScript libraries used by the app. Another notable task it does is compile the Handlebars template for the extension's popup area. It also grabs the latest HTTPS everywhere ruleset.

**Windows Users**: The build script will only work for people with a bash terminal, and some unix binaries installed. You should just run `bower install` from the project root to get things going.

**Important**: Each time you edit app/popup/popup.handlebars you should run either `bash build.sh` or (from the project root directory) `handlebars app/popup/popup.handlebars -f app/popup/popup.template.js`

Then, in Google Chrome, navigate to [chrome://extensions](chrome://extensions), make sure "Developer Mode" is checked off, and then click "Load unpacked extension". Then select the project folder, which should be called **trackerssl**. Make sure the extension is enabled, and you should be good to go!

### Contributing changes
You can contribute to TrackerSSL in numerous ways -- not only with code improvements per se: usability issues, user experience suggestions, and any other bugs can all be added as feature requests or issues over on [this page](https://github.com/andrewhilts/trackerssl/issues).

For code changes, please don't hesitate to create and [submit a pull request](https://github.com/andrewhilts/trackerssl/pulls) with any fixes you might have. 

Contact: andrew@openeffect.ca

Happy hacking!
