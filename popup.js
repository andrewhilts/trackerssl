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
      var goodHosts = document.getElementById('goodHosts');
      var badHosts = document.getElementById('badHosts');
      goodHosts.innerHTML = "";
      badHosts.innerHTML = "";
        for(i in message.goodURL){
          goodHosts.appendChild(createListItem(message.goodURL[i]));
        }
        for(i in message.badURL){
          badHosts.appendChild(createListItem(message.badURL[i]));
        }
     }
});
});