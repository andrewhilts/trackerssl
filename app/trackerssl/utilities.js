var disconnectTrackerDomains;
var disconnectTrackerDomainRequest = new XMLHttpRequest();
disconnectTrackerDomainRequest.open("GET", "app/tracker-datasets/disconnect.json", true);
disconnectTrackerDomainRequest.onreadystatechange = function(){
  if(disconnectTrackerDomainRequest.readyState == 4){
    if (disconnectTrackerDomainRequest.status == 200) {
      disconnectTrackerDomains = JSON.parse(disconnectTrackerDomainRequest.responseText);
    }
  }
};
disconnectTrackerDomainRequest.send();

var twitterHostnames = TwitterList.getList();

var isGUID = function(testString){
    var regexMatch;
    var GUIDPattern = "^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$";
    regexMatch = testString.match(GUIDPattern);   
    if(regexMatch !== null){
        return true;
    }
    return false;
}