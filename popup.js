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
  goodHosts.innerHTML = "";
  badHosts.innerHTML = "";
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
  }
}