var wr = chrome.webRequest;

var TrackerSSL_Request = Backbone.Model.extend({
  initialize: function(){
    this.set('requests', new TrackerSSL_RequestCollection());
  },
  thirdPartyChecker: function(firstPartyHostName){
    // Naive; doesn't take into account subdomains
    if(this.get('hostname') !== firstPartyHostName){
      this.set('isThirdParty', true);
    }
    else{
      this.set('isThirdParty', false);
    }
  },
  isSSL: function(){
    return (this.get('protocol') === "https");
  },
  getUniqueHosts: function(){
    var requests = this.get('requests'),
    uniqueHosts;

    if(requests){
      uniqueHosts = _.uniq(requests.pluck('hostname'));
      this.set('uniqueHosts', uniqueHosts);
      return this.get('uniqueHosts');
    }
    else{
      throw(new Error("No requests made from this URL"));
    }
  },
  getTotalUniqueHosts: function(){
    var uniqueHosts = this.get('uniqueHosts');
    if(uniqueHosts){
      return uniqueHosts.length
    }
    else{
      throw(new Error("No unique hosts set"));
    }
  },
  getSecureHosts: function(){
    var requests = this.get('requests');
    if(requests){
      var urls_supporting_https = requests.where({'supportsSSL': true});
      secureHosts = _.uniq(new TrackerSSL_TabCollection(urls_supporting_https).pluck('hostname'));
      this.set('secureHosts', secureHosts);
      return this.get('secureHosts');
    }
    else{
      throw(new Error("No requests made from this URL"));
    }
  },
  getInsecureHosts: function(){
    var requests = this.get('requests');
    if(requests){
      var urls_not_supporting_https = requests.where({'supportsSSL': false});
      inSecureHosts = _.uniq(new TrackerSSL_TabCollection(urls_not_supporting_https).pluck('hostname'));
      this.set('inSecureHosts', inSecureHosts);
      return this.get('inSecureHosts');
    }
    else{
      throw(new Error("No requests made from this URL"));
    }
  },
  getPercentageSSL: function(){
    var totalUniqueHosts = this.getTotalUniqueHosts();
    var secureHosts = this.get('secureHosts');

    if(totalUniqueHosts && secureHosts){
      return Math.floor(secureHosts.length / totalUniqueHosts * 100);
    }
    else{
      throw(new Error("No hosts or secure hosts found for this URL"));
    }
  },
  isMajorityTrackersSSL: function(){
    if(this.getPercentageSSL() > 50){
      return true;
    }
    else{
      return false;
    }
  },
  isCompleteTrackersSSL: function(){
    if(this.getPercentageSSL() == 100){
      return true;
    }
    else{
      return false;
    }
  }
});

var TrackerSSL_RequestCollection = Backbone.Collection.extend({
      model: TrackerSSL_Request,
      comparator: function( collection ){
        return( collection.get( 'supportsSSL' ) );
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
  updateIconCounter: function(txt, newColor){
    chrome.browserAction.setBadgeText({
      text: String(txt), 
      tabId: this.get('tabid')
    });
    if(typeof newColor !== "undefined"){
      console.log(newColor);
      chrome.browserAction.setBadgeBackgroundColor({
        color: newColor,
        tabId: this.get('tabid')
      });
    }
  },
  runTests: function(){
    var isSSL = this.get('url').isSSL();
    var uniqueHosts = this.get('url').getUniqueHosts();
    var totalUniqueHosts = this.get('url').getTotalUniqueHosts();
    var secureHosts = this.get('url').getSecureHosts();
    var insecureHosts = this.get('url').getInsecureHosts();
    var percentageSSL = this.get('url').getPercentageSSL();
    var majorityTrackersSSL = this.get('url').isMajorityTrackersSSL();
    var completeTrackerSSL = this.get('url').isCompleteTrackersSSL();
    var testResults = {};
    var color;
    
    // update popup
    testResults.tab = this.get('tabid');
    testResults.hostName = this.get('url').get('hostname');
    testResults.ssl = isSSL;
    testResults.couldBeSSL = this.get('url').get('couldBeSSL');
    testResults.goodURL = secureHosts;
    testResults.badURL = insecureHosts;
    testResults.percentageSSL = percentageSSL;
    testResults.majorityTrackersSSL = majorityTrackersSSL;
    testResults.completeTrackersSSL = completeTrackerSSL;
    testResults.uniqueHosts = uniqueHosts;
    testResults.uniqueHostsTotal = totalUniqueHosts;

    this.updateDisplay(testResults);
  },
  sendMessageToPopup: function(message){
    chrome.runtime.sendMessage(message, function(response) {
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
          testURL.set('supportsSSL', true);
        }
        else{
          testURL.set('supportsSSL', false);
        }
        that.get('url').get('requests').add(url);
        // Asynchronous event
        that.runTests();
      }
    };
    SSLRequest.send();
  },
  updateDisplay: function(message){
    color = this.determineColor();
    this.updateIconCounter(message.percentageSSL +  "%", color);
    this.sendMessageToPopup(message);
  },
  determineColor: function(){
    var color;
    if(this.get('url').isSSL()){
      color = "#40a300";
    }
    else if(this.get('url').get('badSSL')){
      color = "#ddd30f";
    }
    else if(this.get('url').isMajorityTrackersSSL()){
      color = "#f96b09";
    }
    else{
      color = "#d0000f";
    }
    return color;
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

  // Basic cookie checking
  chrome.cookies.getAll({
    url: req.url
  }, function(cookies){
    url.set('cookies', cookies);
  })

  // Check if this is a new page
  if(type === "main_frame"){
    // Check if we have an ongoing record for this tab
    if(url.get('protocol') == "http"){
      
      main_page_has_applicable_ruleset = HTTPS_Everwhere_onBeforeRequest(req);
      
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
        has_applicable_ruleset = HTTPS_Everwhere_onBeforeRequest(req);

        if(has_applicable_ruleset || url.get('protocol') === "https"){
          // console.log("HTTPS Everhwhere ruleset found");
          url.set('supportsSSL', true);
          // check if ruleset redirect 200 OKs?
          tab.get('url').get('requests').add(url);
          tab.runTests();

        }
        else{
          // Do one last test
          tab.hostnameSSLResolves(url);
        }

      // Analyze cookies
      console.log(tab.get('cookies'));

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
    activeTab.runTests();
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

