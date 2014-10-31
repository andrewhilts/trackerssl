var e = document.createElement('div');
e.innerHTML = "hi";
var container = document.getElementById('container');
var txt = document.getElementsByTagName('h1')[0];
container.insertBefore(e, txt);


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
   console.log(message);
});