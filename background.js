var wr = chrome.webRequest;

var parseResponse = function(response){
  console.log("reponse", response);
}

var urlCount = 0;

/****
Dependency = URI.js
****/

// url
//   type
//     visited_url
//       associated_trackers
//       associated_keywords
//       // associated_identities
//     tracker_url
//       associated_domains
//   https_info
//     supports_ssl
//     ssl_version
//     host_certificate
//     intermediate_authority
//     certificate_authority
  

// tracker_identifier
//   ghostery_interface

// https_analyzer
//   https_everywhere_interface

// keyword_analyzer
//   ruleset

// // identity_analyzer
// //   ruleset

// cert_checker
//   ruleset

// surveillance_comparer
//   ruleset


var TrackerSSL_Request = Backbone.Model.extend({
  initialize: function(){
    this.set('requests', new TrackerSSL_RequestCollection());
  },
  thirdPartyChecker: function(firstPartyHostName){
    // console.log(this.get('hostname'), firstPartyHostName);

    // Naive; doesn't take into account subdomains
    if(this.get('hostname') !== firstPartyHostName){
      this.set('isThirdParty', true);
    }
    else{
      this.set('isThirdParty', false);
    }
  }
});

var TrackerSSL_RequestCollection = Backbone.Collection.extend({
      model: TrackerSSL_Request,
      comparator: function( collection ){
        return( collection.get( 'httpsing' ) );
      }
});

var TrackerSSL_Tab = Backbone.Model.extend({
  tabid: null,
  idAttribute: "tabid",
  initialize: function(){
    this.set('url', new TrackerSSL_Request());
    console.log("new first party url loaded");
  },
  reset: function(){
    this.set('url', new TrackerSSL_Request());
  },
  updateIconCounter: function(txt){
    chrome.browserAction.setBadgeText({
      text: String(txt), 
      tabId: this.get('tabid')
    });
  },
  runTests: function(){
    // Get Unique requests
        var https_laggards = 0;
        var uniqueHosts = [];
        var uniqueHosts = _.uniq(this.get('url').get('requests').pluck('hostname'));
        var urls_supporting_https = this.get('url').get('requests').where({'httpsing': true});
        var urls_not_supporting_https = this.get('url').get('requests').where({'httpsing': false});

        if(urls_supporting_https[0]){
          uniqueRulesetHosts = _.uniq(new TrackerSSL_TabCollection(urls_supporting_https).pluck('hostname'));
          uniqueNonRulesetHosts = _.uniq(new TrackerSSL_TabCollection(urls_not_supporting_https).pluck('hostname'));

          percentageSSL = Math.floor(uniqueRulesetHosts.length / uniqueHosts.length * 100);

          // uniqueRulesetRequests = _.uniq(tab.get('url').get('requests').where({'https_ruleset': true}));
          https_laggards = uniqueHosts.length - uniqueRulesetHosts.length;

          this.get('url').set('badTrackers', uniqueNonRulesetHosts);
          this.get('url').set('goodTrackers', uniqueRulesetHosts);
          this.get('url').set('uniqueHosts', uniqueHosts);
          this.get('url').set('percentageSSL', percentageSSL);
          this.get('url').set('majorityTrackersSSL', (percentageSSL >= 50));
          this.get('url').set('completeTrackersSSL', (percentageSSL === 100));
          this.get('url').set('uniqueHostsTotal', uniqueHosts.length);

          this.updateIconCounter(percentageSSL +  "%");
          this.sendMessageToPopup();
        }
        else{
          uniqueRulesetHosts = [];
        }
  },
  sendMessageToPopup: function(){
    chrome.runtime.sendMessage({
        'tab': this.get('tabid'),
        'hostName': this.get('url').get('hostname'),
        'ssl': (this.get('url').get('protocol') === "https"),
        'couldBeSSL': this.get('url').get('couldBeSSL'),
        'goodURL': this.get('url').get('goodTrackers'),
        'badURL': this.get('url').get('badTrackers'),
        'percentageSSL': this.get('url').get('percentageSSL'),
        'majorityTrackersSSL': this.get('url').get('majorityTrackersSSL'),
        'completeTrackersSSL': this.get('url').get('completeTrackersSSL'),
        'uniqueHosts': this.get('url').get('uniqueHosts'),
        'uniqueHostsTotal': this.get('url').get('uniqueHostsTotal')
      }, function(response) {
        console.log(response);
       });
  },
  hostnameSSLResolves: function(url){
    var SSLRequest = new XMLHttpRequest();
    var destination = "https://" + url.get('hostname');
    var that = this;
    var testURL = url;
    console.log(destination);
    SSLRequest.open("GET", destination, true);
    SSLRequest.onreadystatechange = function(){
      if(SSLRequest.readyState == 4){
        if (SSLRequest.status == 200) {
          testURL.set('httpsing', true);
        }
        else{
          testURL.set('httpsing', false);
        }
        that.get('url').get('requests').add(url);
        that.runTests();
      }
    };
    SSLRequest.send();
  }
});

var TrackerSSL_TabCollection = Backbone.Collection.extend({
  model: TrackerSSL_Tab
});

var TrackerSSL_RequestController = function(req){
  var tab;
  var has_applicable_ruleset;
  var tabid = req.tabId;
  var type = req.type;
  var activeURL = new URI(req.url)
  var activeTab = TrackerSSL_CurrentTabCollection.get(tabid);
  var url;


  // Normalise hosts such as "www.example.com."
  // From EFF's HTTPS Everywhere
  var canonical_host = activeURL.hostname();
  if (canonical_host.charAt(canonical_host.length - 1) == ".") {
    while (canonical_host.charAt(canonical_host.length - 1) == ".")
      canonical_host = canonical_host.slice(0,-1);
    activeURL.hostname(canonical_host);
  }

  url = new TrackerSSL_Request({
    hostname: activeURL.hostname(),
    path: activeURL.path(),
    protocol: activeURL.protocol(),
    href: activeURL.href()
  });

  // Check if this is a new page
  if(type === "main_frame"){
    // Check if we have an ongoing record for this tab
    if(url.get('protocol') == "http"){
      main_page_has_applicable_ruleset = HTTPS_Everwhere_onBeforeRequest(req);
      console.log(main_page_has_applicable_ruleset);
      if(main_page_has_applicable_ruleset){
        url.set("couldBeSSL", true);
      }
    }
    tab = TrackerSSL_CurrentTabCollection.get(tabid);
    if(typeof tab !== "undefined"){
      // we have a record, but we're on a new page, so let's refresh
      tab.reset();
    }
    else{
      // create a new record
      tab = new TrackerSSL_Tab({tabid: tabid})
      TrackerSSL_CurrentTabCollection.add(tab)
    }
    // add this request as the current URL for the tab
    tab.set('url', url);
    console.log("new page loaded at: " + url.get('hostname'));
  } 
  else{
    // check if tabid exists in current records 
    tab = TrackerSSL_CurrentTabCollection.get(tabid);
    if(typeof tab !== "undefined"){
      url.thirdPartyChecker(
        tab.get('url').get('hostname')
      );
      if(url.get('isThirdParty')){

        // Check for SSL support
        // console.log(url.get('protocol'));
        has_applicable_ruleset = HTTPS_Everwhere_onBeforeRequest(req);
        if(has_applicable_ruleset || url.get('protocol') === "https"){
          // console.log("HTTPS Everhwhere ruleset found");
          url.set('httpsing', true);
          // check if ruleset redirect 200 OKs?
          tab.get('url').get('requests').add(url);
          tab.runTests();
        }
        else{
          // Do one last test
          tab.hostnameSSLResolves(url);
          // Special actions for insecure 3rd party transfers?  
        }

      // Analyze cookies

      // console.log("Request made from page", url.get('isThirdParty'), req);

    }
    else{
      // TODO FIX THIS
      throw(new Error("Request made from tab that was opened before extension initialized"));
    }
  }
}
};

var tabMessageController = function(message, sender, sendResponse) {
  var activeTab = TrackerSSL_CurrentTabCollection.get(message.tab);
  if(activeTab){
    activeTab.sendMessageToPopup();
  }
}

// TODO load historical collection of url-tracker pairs from localstorage at init
// var TrackerSSL_HistoryCollection;

var TrackerSSL_CurrentTabCollection = new TrackerSSL_TabCollection();

chrome.webRequest.onBeforeRequest.addListener(
  TrackerSSL_RequestController,
  {
    urls: ['http://*/*', 'https://*/*']
  }
  , ["blocking"]
);

chrome.runtime.onMessage.addListener(tabMessageController);

// chrome.tabs.onUpdated.addListener(TrackerSSL_TabController);

