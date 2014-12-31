#TrackerSSL

[Download TrackerSSL](https://github.com/andrewhilts/trackerssl/blob/master/trackerssl.crx?raw=true) (Works best with ad-blocking extensions disabled)

###Installing Third Party Add-Ons

TrackerSSL is still under development and hasn't yet been subitted to the Google Chrome store. Please follow these instructions from [Google](https://support.google.com/chrome_webstore/answer/2664769?p=crx_warning&rd=1) to successfully install the extension:

We recommend you only add extensions from other websites that you trust. In Chrome, you can follow these steps to add the extension:

1. Download the extension file from the website and save it to your computer.
1. Click the Chrome menu icon Chrome menu on the browser toolbar.
1. Select Tools > Extensions.
1. Locate the extension file on your computer and drag the file onto the Extensions page.
1. Review the list of permissions in the dialog that appears. If you would like to proceed, click Install.

The NSA and other surveillance agencies monitor network traffic. By scanning the content of this traffic, they learn your habits, your interests, your political views, and more. As the Snowden revelations indicate, this monitoring is done on a mass level, affecting whole populations.

As reported by the [Washington Post](http://www.washingtonpost.com/blogs/the-switch/wp/2013/12/11/news-sites-could-protect-your-privacy-with-encryption-heres-why-they-probably-wont/), news websites are particularly important for this sort of monitoring. By looking at what news articles one reads, analysis can reveal what current events and political views someone might hold.

There's a simple way news and all other websites can make this sort of mass monitoring less feasible. They can implement SSL by default. This will encrypt the traffic between you and the website your visiting, and hide the url and the title of each page you hit.

But news websites aren't implementing SSL. The "problem" for them is they rely on dozens of ad trackers for revenue. In order to implement SSL securely, all resources loaded on a page must also be served via SSL, including third party trackers. News websites claim that because these trackers don't support SSL, neither can they.

**That's where TrackerSSL comes in**. Our Google Chrome extension monitors the third party connections loaded when you visit a page and checks whether or not they support SSL. We assign a score for a given page, based on how many trackers support SSL. We determine SSL support by running each tracker URL through the EFF's [HTTPS Everywhere](https://github.com/EFForg/https-everywhere/pulls engine. We identify known trackers using Disconnect's [list]((https://services.disconnect.me/disconnect.json)).

The idea for the score is to find out which websites could easily implement SSL (since most of their trackers support it), and which still have a long way to go (cases where most trackers do not support SSL). Privacy-conscious end users can use our extension to name and shame websites with a high score, Tweeting to the websites that they have no excuse not to turn on SSL given most of their ad trackers support it. Our hope is that this advocacy can make a small impact and encourage several news websites to turn on SSL and thus stop enabling mass surveillance of innocent people.

##TL; DR

TrackerSSL is a Chrome extension that examines how many third party trackers on a given page support HTTPS. It uses the Electronic Frontier Foundation's (EFF) [HTTPS Everywhere](https://github.com/EFForg/https-everywhere/pulls) extension as one of its methods for testing SSL support. If that test fails, TrackerSSL then issues an XMLHTTPRequest to that hostname using SSL and checks if the server responds without error. TrackerSSL uses Disconnect's [list of trackers ](https://services.disconnect.me/disconnect.json) to identify companies from domains

##Regular Install
This is still alpha, but you can download the latest version [here](https://github.com/andrewhilts/trackerssl/blob/master/trackerssl.crx?raw=true). Just open this crx file in Chrome and you should be good to go!

##Developer install
Download this repository, unzip it, navigate to the unzipped folder in Terminal, and run "bower install". You will need to have [bower](http://bower.io) on your machine to do so.

Then, in Google Chrome, navigate to [chrome://extensions](chrome://extensions), make sure "Developer Mode" is checked off, and then click "Load unpacked extension". Then select the folder you just unzipped, which should be called **trackerssl**. Make sure the extension is enabled, and you should be good to go!

TrackerSSL was originally developed at Ghostery's "Hack the Trackers" event in November 2014.