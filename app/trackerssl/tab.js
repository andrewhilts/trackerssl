var TrackerSSL_Tab = Backbone.Model.extend({
  tabid: null,
  idAttribute: "tabid",
  initialize: function(){
    console.log("new first party url loaded");
  },
  reset: function(){
    this.unset('url');
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
  stageTests: function(sendReport){
    var that = this;

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      var activeTabId = tabs[0].id;
      if(activeTabId == that.get('tabid')){
        // Only run tests for active Tab
        that.runTests(sendReport);
      }
    });
  },
  runTests: function(sendReport){
    var url = this.get('url');
    var testResults = {
      tab:                  this.get('tabid'),
      domain:               url.get('domain'),
      hostName:             url.get('hostname'),
      twitter:              url.get('twitterHandle'),
      ssl:                  url.isSSL(),
      couldBeSSL:           url.get('couldBeSSL'),
      uniqueHosts:          url.getUniqueHosts(),
      uniqueHostsTotal:     url.getTotalUniqueHosts(),
      goodURL:              url.getSecureHosts(),
      badURL:               url.getInsecureHosts(),
      brokenSSL:            url.hasBrokenHTTPS(),
      identifiers:          url.getIdentifiers(),
      percentageSSL:        url.getPercentageSSL(),
      majorityTrackersSSL:  url.isMajorityTrackersSSL(),
      completeTrackersSSL:  url.isCompleteTrackersSSL(),
      requests:             url.get('requests').toJSON()
    }
    this.updateDisplay(testResults, sendReport);
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
        that.stageTests(false);
      }
    };
    SSLRequest.send();
  },
  updateDisplay: function(testResults, sendReport){
    var message = {};
    
    // Check for send report flag so we don't needlessly compile templates on inactive tabs or closed popovers
    if(sendReport){
      console.log("!! Sending Report");
      message.report = Handlebars.templates.popup(testResults);
    }
    message.data = testResults;
    color = this.determineColor();
    this.updateIconCounter(message.data.percentageSSL +  "%", color);
    this.sendMessageToPopup(message);
  },
  determineColor: function(){
    var color;
    if(this.get('url').isSSL() && !this.get('url').hasBrokenHTTPS()){
      color = "#40a300";
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