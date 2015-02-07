var containerEl = document.getElementById('container');
var reportEl = document.getElementById('report');
window.identifiersClass = "active";
window.trackersClass = "";
window.activeIndex = 0;

var requestReport = function(tabid){
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var tabid = tabs[0].id;
    chrome.runtime.sendMessage({
      tab: tabid,
      message: "getReport"
    }, function(response) {
      console.log(response);
    });
  });
}

var displayReport = function(report, data){
  var el;


  el = document.createElement( 'div' );
  el.innerHTML = report;

  el = updateReportClasses(el, data);
  reportEl.innerHTML = el.innerHTML;

  window.setTimeout(function(){
    initMenu();
    document.getElementsByTagName('body')[0].style.minHeight = reportEl.offsetHeight + "px";
    window.setTimeout(function(){
      document.getElementsByTagName('body')[0].style.minHeight = reportEl.offsetHeight + 1 + "px";
    }, 10);
  }, 10);
}

var updateReportClasses = function(el, data){
  if(el.querySelector("#badHosts")){
    el.querySelector("#badHosts").children[window.activeIndex].className = "active";
  }
  if(el.querySelector("#thirdPartyHosts")){
    el.querySelector("#thirdPartyHosts").children[window.activeIndex].className = "active";
  }
  if(data.identifiers.length === 0){
    window.identifiersClass = "";
    window.trackersClass = "active";
  }
  if(el.querySelector("#trackers")){
    el.querySelector("#trackers").className = window.trackersClass;
  }
  if(el.querySelector("#trackerBtn")){
    el.querySelector("#trackerBtn").className = window.trackersClass;
  }
  if(el.querySelector("#identifiers")){
    el.querySelector("#identifiers").className = window.identifiersClass;
  }
  if(el.querySelector("#identifierBtn")){
    el.querySelector("#identifierBtn").className = window.identifiersClass;
  }

  return el;
}

var initMenu = function() {
    var trackerEl = document.getElementById('trackers');
    var identifierEl = document.getElementById('identifiers');
    var trackerBtnEl = document.getElementById('trackerBtn');
    var identifierBtnEl = document.getElementById('identifierBtn');
    var list = document.getElementById("badHosts");
    var list2 = document.getElementById("thirdPartyHosts");

    if (trackerBtnEl) {
        trackerBtnEl.onclick = function() {
            addClass(trackerBtnEl, "active");
            removeClass(identifierBtnEl, "active");
            addClass(trackerEl, "active");
            removeClass(identifierEl, "active");
            window.identifiersClass = "";
            window.trackersClass = "active";
        }
    }
    if (identifierBtnEl) {
        identifierBtnEl.onclick = function() {
            addClass(identifierBtnEl, "active");
            removeClass(trackerBtnEl, "active");
            addClass(identifierEl, "active");
            removeClass(trackerEl, "active");
            window.identifiersClass = "active";
            window.trackersClass = "";
        }
    }

    if (list) {
        for (i in list.children) {
            setMouseOver(list.children[i]);
        }
    }
    if (list2) {
        for (i in list2.children) {
            setMouseOver(list2.children[i]);
        }
    }
}

var setMouseOver = function(e) {
    e.onmouseover = function() {
        window.clearTimeout(window.timer);
        for (j in this.parentNode.children) {
            if (this.parentNode.children[j] === this) {
                addClass(this, "active");
                window.activeIndex = j;
            } else {
                removeClass(this.parentNode.children[j], 'active');
            }
        }
    }
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

requestReport();

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    if(message.data.tab == tabs[0].id){
      if(typeof message.report == "undefined"){
        requestReport(tabs[0].id)
      }
      else{
        displayReport(message.report, message.data);
      }
    }
  });
});
