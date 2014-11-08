var createListItem = function(content){
  var e = document.createElement('li');
  e.innerHTML = content;
  return e;
}
var container = document.getElementById('container');
var txt = document.getElementsByTagName('h1')[0];

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var e;
    if(message.tab == tabs[0].id){
      populateTrackerLists(message);
     }
});
});

chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
var tabid = tabs[0].id;
chrome.runtime.sendMessage({
  tab: tabid,
  message: "getTrackers"
}, function(response) {
  console.log(response);
});
});

var populateTrackerLists = function(message){
  var goodHosts = document.getElementById('goodHosts');
  var badHosts = document.getElementById('badHosts');
  var percentageSSL = document.getElementById('percentageSSL');
  var totalTrackers = document.getElementById('totalTrackers');
  var holla = document.getElementById('holla');
  var shame = document.getElementById('shame');
  var notrackers = document.getElementById('notrackers');
  var tweetThanksLinkContainer = document.getElementById('tweetThanksLinkContainer');
  var tweetShameLinkContainer = document.getElementById('tweetShameLinkContainer');
  var tweetModerateShameLinkContainer = document.getElementById('tweetModerateShameLinkContainer');
  var tweetThanksLinkElement = document.getElementById('tweetThanksLink');
  var tweetShameLinkElement = document.getElementById('tweetShameLink');
  var tweetModerateShameLinkElement = document.getElementById('tweetModerateShameLink');
  var tweetThanksLink = "https://twitter.com/intent/tweet?text=Thank%20you%20" + message.hostName + "%20for%20supporting%20SSL%20and%20doing%20your%20part%20to%20fight%20mass%20surveillance!%20%23trackerSSL";
  var tweetShameLink = "https://twitter.com/intent/tweet?text=Hey%20" + message.hostName + ",%20most%20of%20your%20ad%20trackers%20support%20SSL.%20Why%20don't%20you%3F%20Do%20your%20part%20to%20fight%20mass%20surveillance.%20%23trackerSSL";
  var tweetModerateShameLink = "https://twitter.com/intent/tweet?text=Hey%20" + message.hostName + ",%20most%20of%20your%20ad%20trackers%20don't%20support%20SSL.%20Consider%20some%20that%20do!%20Do%20your%20part%20in%20fighting%20mass%20surveillance.%20%23trackerSSL";
  goodHosts.innerHTML = "";
  badHosts.innerHTML = "";

  var e1 = document.getElementById("hostnameContainer1");
  var e2 = document.getElementById("hostnameContainer2");
  var e3 = document.getElementById("hostnameContainer3");
  e1.innerHTML = message.hostName;
  e2.innerHTML = message.hostName;
  e3.innerHTML = message.hostName;

  if(message.uniqueHosts){
    for(i in message.goodURL){
      goodHosts.appendChild(createListItem(message.goodURL[i]));
    }
    for(i in message.badURL){
      badHosts.appendChild(createListItem(message.badURL[i]));
    }
    percentageSSL.innerHTML = message.percentageSSL;
    totalTrackers.innerHTML = message.uniqueHosts.length;
    if(message.ssl){
      holla.style.display = "block";
      shame.style.display = "none";
      tweetThanksLinkContainer.style.display="block";
      tweetThanksLinkElement.setAttribute("href", tweetThanksLink);
    }
    else{
      holla.style.display = "none";
      shame.style.display = "block";
      if(message.percentageSSL >= 50){
        tweetShameLinkContainer.style.display="block";
        tweetModerateShameLinkContainer.style.display="none";
        tweetThanksLinkContainer.style.display="none";
        tweetShameLinkElement.setAttribute("href", tweetShameLink);
      }
      else{
        tweetShameLinkContainer.style.display="none";
        tweetModerateShameLinkContainer.style.display="block";
        tweetThanksLinkContainer.style.display="none";
        tweetModerateShameLinkElement.setAttribute("href", tweetModerateShameLink);
      }
    }
    notrackers.style.display = "none";
  }
  else{
    if(message.ssl){
      holla.style.display = "block";
      tweetShameLinkContainer.style.display="none";
        tweetModerateShameLinkContainer.style.display="none";
        tweetThanksLinkContainer.style.display="block";
      tweetThanksLinkElement.setAttribute("href", tweetThanksLinkElement);
    }
    else{
      holla.style.display = "none";
    }
    shame.style.display = "none";
    notrackers.style.display = "block";
  }
}