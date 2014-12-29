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
// var curIndex = 0;
window.addEventListener('message', function(event) {
  if (event.data.html) {
    console.log(event);
    // var listy = document.getElementById("badHosts");
    // if(listy && listy.children.length > 0){
    //   for(i in listy){
    //     if(hasClass(listy[i], "active")){
    //       curIndex = i;
    //     }
    //   }
    // }
    report.innerHTML = event.data.html;
    initMenu();
    window.setTimeout(function(){
      window.clearTimeout(window.timer);
      var list = document.getElementById("badHosts");
      // window.timer = window.setTimeout(function(){
      //   highlightIdentifiers(list);
      // }, 1000);
      for(i in list.children){
        list.children[i].onmouseover = function(){
          window.clearTimeout(window.timer);
          for(j in this.parentNode.children){
            if(this.parentNode.children[j] === this){
              addClass(this, "active");
            }
            else{
              removeClass(this.parentNode.children[j], 'active');
            }
          }
        }
      //   list.onmouseout = function(){
      //     window.clearTimeout(window.timer);
      //     window.timer = window.setTimeout(function(){
      //       highlightIdentifiers(list);
      //     }, 1000);
      //   }
      }
    }, 10);
  }
  // document.getElementsByTagName('body')[0].style.minHeight = report.offsetHeight + 200;
});

var initMenu = function(){
  var trackerEl = document.getElementById('trackers');
  var identifierEl = document.getElementById('identifiers');
  var trackerBtnEl = document.getElementById('trackerBtn');
  var identifierBtnEl = document.getElementById('identifierBtn');

  trackerBtnEl.onclick = function(){
      addClass(trackerBtnEl, "active");
      removeClass(identifierBtnEl, "active");
      trackerEl.style.display = "block";
      identifierEl.style.display = "none";
  }
  identifierBtnEl.onclick = function(){
      addClass(identifierBtnEl, "active");
      removeClass(trackerBtnEl, "active");
      identifierEl.style.display = "block";
      trackerEl.style.display = "none";
  }
}

chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
var tabid = tabs[0].id;
chrome.runtime.sendMessage({
  tab: tabid,
  message: "getTrackers"
}, function(response) {
});
});

highlightIdentifiers = function(e){
  var oldIndex, newIndex;
  for(var i = 0; i < e.children.length; i++){
    if(hasClass(e.children[i], "active")){
      oldIndex = i;
    }
  }
  if(oldIndex === e.children.length-1){
    newIndex = 0;
  }
  else {
    newIndex = oldIndex+1;
  }
  removeClass(e.children[oldIndex], "active");
  addClass(e.children[newIndex], "active");
  window.timer = window.setTimeout(function(){
    // window.clearTimeout(window.timer);
    highlightIdentifiers(e);
  }, 1000);
}

var populateTrackerLists = function(tabData){
  var message = {
   command: 'render',
   context: tabData
  };
  iframe.contentWindow.postMessage(message, '*');
}

function hasClass(ele,cls) {
  return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function addClass(ele,cls) {
  if (!hasClass(ele,cls)) ele.className += " "+cls;
}

function removeClass(ele,cls) {
  if (hasClass(ele,cls)) {
    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
    ele.className=ele.className.replace(reg,' ');
  }
}