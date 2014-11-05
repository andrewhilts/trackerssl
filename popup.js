var e = document.createElement('ul');
e.id = "hosts";
console.log(e);
var createListItem = function(content){
  var e = document.createElement('li');
  e.innerHTML = content;
  return e;
}
var container = document.getElementById('container');
var txt = document.getElementsByTagName('h1')[0];
container.insertBefore(e, txt);

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var e;
    if(message.tab == tabs[0].id){
      var hosts = document.getElementById('hosts');
      hosts.innerHTML = "";
      console.log(message.url.requests);
      message.url.get('requests').each(function(request){
        console.log(request);
        hosts.appendChild(request.get('hostname'));
      });
      }
});
});