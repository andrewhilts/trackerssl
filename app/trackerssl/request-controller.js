var TrackerSSL_RequestController = function(req){
  var tab;
  var url;
  var hostnameInCollection;
  var has_applicable_ruleset;
  var tabid = req.tabId;
  var type = req.type; 
  var activeTab = TrackerSSL_CurrentTabCollection.get(tabid);

  url = new TrackerSSL_Request({url: req.url});

  // Basic cookie checking
  chrome.cookies.getAll({
    url: req.url
  }, function(cookies){
    url.set('cookies', cookies);
  })

  // Check if this is a new page
  if(type === "main_frame"){
    // Check if we have an ongoing record for this tab
    if(url.get('protocol') == "http"){
      
      main_page_has_applicable_ruleset = HTTPS_Everwhere_onBeforeRequest(req);
      
      if(main_page_has_applicable_ruleset){
        url.set("couldBeSSL", true);
      }
    }

    tab = TrackerSSL_CurrentTabCollection.get(tabid);
    
    if(typeof tab !== "undefined"){
      // we have a record, but we're on a new page, so let's refresh
      tab.reset();
    }
    else{
      // create a new record
      tab = new TrackerSSL_Tab({tabid: tabid});
      TrackerSSL_CurrentTabCollection.add(tab);
    }
    console.log("page loaded", url);
    // add this request as the current URL for the tab
    tab.set('url', url);
  } 
  else{
    // check if tabid exists in current records 
    tab = TrackerSSL_CurrentTabCollection.get(tabid);
    if(typeof tab !== "undefined"){
      hostnameInCollection = (typeof tab.get('url').get('requests').findWhere({'hostname': url.get('hostname')}) !=="undefined");
      // Only test if hostname hasn't already been tested
      if(!hostnameInCollection){
        url.thirdPartyChecker(
          tab.get('url').get('domain')
        );
        if(url.get('isThirdParty')){
          // Check for SSL support
          has_applicable_ruleset = HTTPS_Everwhere_onBeforeRequest(req);

          if(has_applicable_ruleset || url.get('protocol') === "https"){
            // console.log("HTTPS Everhwhere ruleset found");
            url.set('supportsSSL', true);
            // check if ruleset redirect 200 OKs?
            tab.get('url').get('requests').add(url);
            tab.stageTests(false);
          }
          else{
            // Do one last test
            tab.hostnameSSLResolves(url);
          }

          // Analyze cookies
          console.log(url);
        }
        else{
          tab.stageTests(false);
        }
      }
    }
    else{
      // TODO FIX THIS
      console.log("Request made from tab that was opened before extension initialized");
    }
  }
}