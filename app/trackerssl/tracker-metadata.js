var disconnectTrackerDomains;
var disconnectTrackerDomainRequest;
var twitterList;
var twitterHostnames;

disconnectTrackerDomainRequest = new XMLHttpRequest();
disconnectTrackerDomainRequest.open("GET", "app/tracker-datasets/disconnect.json", true);
disconnectTrackerDomainRequest.onreadystatechange = function(){
  if(disconnectTrackerDomainRequest.readyState == 4){
    if (disconnectTrackerDomainRequest.status == 200) {
      disconnectTrackerDomains = JSON.parse(disconnectTrackerDomainRequest.responseText);
    }
  }
};

twitterList = {
  list: [],
  listFile: "app/tracker-datasets/twitterLists/defaultList.json",
  getList: function(){
    var xhr = new XMLHttpRequest();
      xhr.open("GET", chrome.extension.getURL(this.listFile), false);
      xhr.send(null);
      return this.loadList(xhr.response);
  },
  loadList: function(listData){
    return JSON.parse(listData);
  }
}

disconnectTrackerDomainRequest.send();

twitterHostnames = TwitterList.getList();