var hostnameObj;
var hostnameObjRequest = new XMLHttpRequest();
hostnameObjRequest.open("GET", "app/tracker-datasets/disconnect.json", true);
hostnameObjRequest.onreadystatechange = function(){
  if(hostnameObjRequest.readyState == 4){
    if (hostnameObjRequest.status == 200) {
      hostnameObj = JSON.parse(hostnameObjRequest.responseText);
    }
  }
};
hostnameObjRequest.send();

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