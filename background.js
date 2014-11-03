var wr = chrome.webRequest;

var parseResponse = function(response){
  console.log("reponse", response);
}

var urlCount = 0;

/****
Dependency = URI.js
****/
var TrackerSSL_URI = function(uriObject){
  this.uri = uriObject
  console.log(this);
}

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

var TrackerSSL_request = Backbone.Model.extend({
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
      model: TrackerSSL_request
});

var TrackerSSL_Tab = Backbone.Model.extend({
  tabid: null,
  idAttribute: "tabid",
  initialize: function(){
    this.set('url', new TrackerSSL_request());
    console.log("new first party url loaded");
  },
  reset: function(){
    this.set('url', new TrackerSSL_request());
  },
  updateIconCounter: function(txt){
    chrome.browserAction.setBadgeText({
      text: String(txt), 
      tabId: this.get('tabid')
    });
  }
});


var TrackerSSL_TabCollection = Backbone.Collection.extend({
  model: TrackerSSL_Tab
})

var TrackerSSL_TabController = function(tabid, objectChangeInfo, tabState){
  // var tab;

  // tab = TrackerSSL_CurrentTabCollection.get(tabid);

  // if(typeof tab !== "undefined" && objectChangeInfo.status == "loading"){
  //   console.log("tab location changed");
  // }
  // else{
  //   console.log("new tab");
  //   tab = new TrackerSSL_Tab({tabid: tabid});
  //   TrackerSSL_CurrentTabCollection.add(tab)
  // }
}

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

  url = new TrackerSSL_request({
    hostname: activeURL.hostname(),
    path: activeURL.path(),
    protocol: activeURL.protocol(),
    href: activeURL.href()
  });

  // Check if this is a new page
  if(type === "main_frame"){
    // Check if we have an ongoing record for this tab
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
    // Assume tab exists already
    tab = TrackerSSL_CurrentTabCollection.get(tabid);
    if(typeof tab !== "undefined"){
      url.thirdPartyChecker(
        tab.get('url').get('hostname')
      );
      if(url.get('isThirdParty')){

        // Check for SSL support
        // console.log(url.get('protocol'));
        has_applicable_ruleset = HTTPS_Everwhere_onBeforeRequest(req);
        if(has_applicable_ruleset){
          // console.log("HTTPS Everhwhere ruleset found");
          url.set('https_ruleset', true);
          // check if ruleset redirect 200 OKs?
        }
        tab.get('url').get('requests').add(url);
        // newuristr = "https://www.eff.org/sites/all/themes/frontier/images/cc-by-logo.png";
        // return {redirectUrl: newuristr};
        // Get Unique requests
        // uniqueRequests = _.uniq(_.pluck(tab.get('url').get('requests'), 'href'));
        uniqueRequests = _.uniq(tab.get('url').get('requests').pluck('href'));
        urls_supporting_https = tab.get('url').get('requests').where({'https_ruleset': true});
        if(urls_supporting_https[0]){
          uniqueRulesetRequests = _.uniq(urls_supporting_https[0].get('hostname'));
        }
        else{
          uniqueRulesetRequests = [];
        }
        // uniqueRulesetRequests = _.uniq(tab.get('url').get('requests').where({'https_ruleset': true}));
        console.log(uniqueRulesetRequests.length, uniqueRequests.length);
      }

      // Analyze cookies

      // console.log("Request made from page", url.get('isThirdParty'), req);
      activeTab.updateIconCounter(tab.get('url').get('requests').length);


      //
    }
    else{
      // TODO FIX THIS
      throw(new Error("Request made from tab that was opened before extension initialized"));
    }
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

chrome.tabs.onUpdated.addListener(TrackerSSL_TabController);

