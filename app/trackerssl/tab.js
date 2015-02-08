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
    var currentPage = this.get('url');
    var pageThirdParties = currentPage.get('requests');
    var testResults = {
      tab:                  this.get('tabid'),
      domain:               currentPage.get('domain'),
      hostName:             currentPage.get('hostname'),
      twitter:              currentPage.get('twitterHandle'),
      ssl:                  currentPage.isSSL(),
      couldBeSSL:           currentPage.get('supportsSSL'),
      brokenSSL:            currentPage.hasBrokenHTTPS(),
      uniqueHosts:          pageThirdParties.getUniqueHosts(),
      uniqueHostsTotal:     pageThirdParties.getTotalUniqueHosts(),
      goodURL:              pageThirdParties.getSecureHosts(),
      badURL:               pageThirdParties.getInsecureHosts(),
      identifiers:          pageThirdParties.getIdentifiers(),
      percentageSSL:        pageThirdParties.getPercentageSSL(),
      majorityTrackersSSL:  pageThirdParties.isMajorityTrackersSSL(),
      completeTrackersSSL:  pageThirdParties.isCompleteTrackersSSL(),
      requests:             pageThirdParties.toJSON()
    }
    this.updateDisplay(testResults, sendReport);
  },
  sendMessageToPopup: function(message){
    chrome.runtime.sendMessage(message, function(response) {
        console.log(response);
       });
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