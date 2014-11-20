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
  runTests: function(){
    var testResults = {
      tab:                  this.get('tabid'),
      hostName:             this.get('url').get('hostname'),
      ssl:                  this.get('url').isSSL(),
      couldBeSSL:           this.get('url').get('couldBeSSL'),
      uniqueHosts:          this.get('url').getUniqueHosts(),
      uniqueHostsTotal:     this.get('url').getTotalUniqueHosts(),
      goodURL:              this.get('url').getSecureHosts(),
      badURL:               this.get('url').getInsecureHosts(),
      percentageSSL:        this.get('url').getPercentageSSL(),
      majorityTrackersSSL:  this.get('url').isMajorityTrackersSSL(),
      completeTrackersSSL:  this.get('url').isCompleteTrackersSSL(),
      requests:             this.get('url').get('requests').toJSON()
    }
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