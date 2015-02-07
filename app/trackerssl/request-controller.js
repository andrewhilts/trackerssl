var TrackerSSL_RequestController = function(req){
  var tab;
  var url;
  var hostnameInCollection;
  var has_applicable_ruleset;
  var tabid = req.tabId;
  var type = req.type; 

  if(tabid == -1){
    return;
  }
  var isMainPage = function(type){
    return (type === "main_frame");
  }
  var shouldBeTested = function(type){
    console.log(tab);
    return (isMainPage(type) || (typeof tab.get('url').get('requests').findWhere({'hostname': url.get('hostname')}) =="undefined"))
  }
  var testUrlForSSLSupport = function(callback){
    // inherits url from parent scope
    if(url.get('protocol') === "https" || HTTPS_Everwhere_onBeforeRequest(req)){
      // console.log("HTTPS Everhwhere ruleset found");
      url.set('supportsSSL', true);
      callback(url);
    }
    else{
      hostnameSSLResolves(url, callback);
    }
  }
  var hostnameSSLResolves = function(url, callback){
    var SSLRequest = new XMLHttpRequest();
    var destination = "https://" + url.get('hostname');
    var testURL = url;
    SSLRequest.open("GET", destination, true);
    SSLRequest.onreadystatechange = function(){
      if(SSLRequest.readyState == 4){
        if (SSLRequest.status == 200) {
          testURL.set('supportsSSL', true);
        }
        else{
          testURL.set('supportsSSL', false);
        }
        // Asynchronous event
        callback(url);
      }
    };
    SSLRequest.send();
  }
  var getTabFromCollection = function(tabid, type){
    tab = TrackerSSL_CurrentTabCollection.get(tabid);
    
    if(typeof tab == "undefined"){
      tab = new TrackerSSL_Tab({tabid: tabid});
      TrackerSSL_CurrentTabCollection.add(tab);
      if(!isMainPage()){
        // Page loaded before extension created a record for the tab (might miss some requests due to race condition)
        chrome.tabs.get(tabid, function(tab){
          TrackerSSL_RequestController({
            url: tab.url,
            tabId: tabid,
            type: "main_frame"
          });
        })
      }
    }
    else if(isMainPage(type) && typeof tab !== "undefined"){
      // We have a record for the tab, but on a new page
      tab.reset();
    }
    return tab;
  }
  var assignUrlToCollection = function(url, type, tab){
    console.log("assigning")
    if(isMainPage(type)){
       tab.set('url', url);
    }
    else{
      console.log("yay")
      tab.get('url').get('requests').add(url);
    }
    tab.stageTests(false);
  }

  url = new TrackerSSL_Request({url: req.url});

  // Basic cookie checking
  chrome.cookies.getAll({
    url: req.url
  }, function(cookies){
    url.set('cookies', cookies);
  })

  tab = getTabFromCollection(tabid, type);
  
  if(shouldBeTested(type)){
    testUrlForSSLSupport(function(){
      console.log("callback")
      assignUrlToCollection(url, type, tab);
    });
  }
  else{
    console.log("didn't make the cut");
  }
 
}