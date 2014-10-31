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

var TrackerSSL_CurrentTabCollection = new TrackerSSL_TabCollection();

var TrackerSSL_TabController = function(tabid, objectChangeInfo, tabState){
  var tab;

  tab = TrackerSSL_CurrentTabCollection.get(tabid);

  if(typeof tab !== "undefined"){
    console.log("tab location changed");
    // reset tab state for this new URL
    tab.reset();
  }
  else{
    console.log("new tab");
    tab = new TrackerSSL_Tab({tabid: tabid});
    TrackerSSL_CurrentTabCollection.add(tab)
  }
}

var TrackerSSL_RequestController = function(req){
  var tabid = req.tabId;
  var type = req.type;
  var activeURL = new URI(req.url)
  var activeTab = TrackerSSL_CurrentTabCollection.get(tabid);
  var url;

  url = new TrackerSSL_request({
    hostname: activeURL.hostname(),
    path: activeURL.path(),
    protocol: activeURL.protocol()
  });

  // The following assumes the tab window.location is always the first http request made when the tab fires an update event
  // That assumption appears to be wrong (hashchanges fire updates)
  if(activeTab){
    // console.log(activeTab.get('url'));
    if(typeof activeTab.get('url').get('hostname') == "undefined"){
      //No URL assigned to tab since it was opened or it fired an update event
      activeTab.set('url', url);
      console.log(activeTab.get('url').get('hostname'));
      console.log("New Page Loaded")
    }
    else{
      // Assign all subsequet requests to this tab's primary url
      // console.log(activeTab.get('url').get('requests'));
      activeTab.get('url').get('requests').add(url);
      console.log("Request made from page");
      activeTab.updateIconCounter(activeTab.get('url').get('requests').length);
    }
  }
  // console.log(tabid);

  //get a set of currently-

  // if(tabid >= 0){
  //   chrome.tabs.sendMessage(tabid, url, function(){
  //     // console.log("response callback");
  //   });
  //   TrackerSSL_ChangeIcon("icon", "23");
  // }
}

chrome.webRequest.onBeforeRequest.addListener(
  TrackerSSL_RequestController,
  {
    urls: ['http://*/*', 'https://*/*']
  }
);

chrome.tabs.onUpdated.addListener(TrackerSSL_TabController);

