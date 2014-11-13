var createListItem = function(content){
  var e = document.createElement('li');
  e.innerHTML = content;
  return e;
}
var container = document.getElementById('container');
var txt = document.getElementsByTagName('h1')[0];
var report = document.getElementById('report');


 var iframe = document.getElementById('sandbox');
  console.log(iframe);
 var message = {
   command: 'render',
   context: {thing: 'world'}
 };
 iframe.onload = function(){
  iframe.contentWindow.postMessage(message, '*');
  }

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var e;
    if(message.tab == tabs[0].id){
      populateTrackerLists(message);
     }
});
});

window.addEventListener('message', function(event) {
  if (event.data.html) {
  console.log(event);
    report.innerHTML = event.data.html;
  }
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

window.onload = function(){
  var reportEl = document.getElementById('report');
  var faqEl = document.getElementById('faq');
  var toggleEl = document.getElementById('about');
  var toggleState = 1;
  toggleEl.onclick = function(){
    if(toggleState === 1){
      reportEl.style.display = "none";
      faqEl.style.display = "block";
      toggleState = 2;
    }
    else{
      reportEl.style.display = "block";
      faqEl.style.display = "none";
      toggleState = 1;
    }
  }
}

var populateTrackerLists = function(tabData){
  var message = {
   command: 'render',
   context: tabData
  };
  iframe.contentWindow.postMessage(message, '*');
}