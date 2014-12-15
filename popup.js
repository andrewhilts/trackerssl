var container = document.getElementById('container');
var report = document.getElementById('report');


 var iframe = document.createElement('iframe');
 iframe.setAttribute("id", "sandbox");
 iframe.setAttribute("height", "0");
 iframe.setAttribute("width", "0");
 iframe.style.display = "none";
 iframe.setAttribute("src", "templater.html");

iframe.onload = function(){
var message = {
 command: 'render',
 context: ""
};
iframe.contentWindow.postMessage(message, '*');
}
container.appendChild(iframe);

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
  // document.getElementsByTagName('body')[0].style.minHeight = report.offsetHeight + 200;
});

chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
var tabid = tabs[0].id;
chrome.runtime.sendMessage({
  tab: tabid,
  message: "getTrackers"
}, function(response) {
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